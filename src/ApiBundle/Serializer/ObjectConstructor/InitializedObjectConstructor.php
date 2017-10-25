<?php

namespace ApiBundle\Serializer\ObjectConstructor;

use ApiBundle\Exception\EntityNotFoundException;
use JMS\Serializer\Construction\ObjectConstructorInterface;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\Metadata\ClassMetadata;
use JMS\Serializer\VisitorInterface;
use Symfony\Bridge\Doctrine\RegistryInterface;

class InitializedObjectConstructor implements ObjectConstructorInterface
{
    /** @var ObjectConstructorInterface */
    protected $fallbackConstructor;

    /** @var RegistryInterface */
    protected $doctrine;

    /**  */
    public function __construct(ObjectConstructorInterface $fallbackConstructor, RegistryInterface $doctrine)
    {
        $this->fallbackConstructor = $fallbackConstructor;
        $this->doctrine = $doctrine;
    }

    /**
     * {@inheritdoc}
     */
    public function construct(VisitorInterface $visitor, ClassMetadata $metadata, $data, array $type, DeserializationContext $context)
    {
        $className = $metadata->name;
        $em = $this->doctrine->getManagerForClass($className);

        if (null === $em) {
            throw new \RuntimeException(sprintf('Entity manager for class "%s" is not found.', $className));
        }

        $repository = $em->getRepository($className);

        if (
            $context->getDepth() === 1 &&
            $context->attributes->containsKey('propertyValue') &&
            ($propertyValue = $context->attributes->get('propertyValue')->get())
        ) {
            if (
                $context->attributes->containsKey('propertyName') &&
                $propertyName = $context->attributes->get('propertyName')->get()
            ) {
                $criteria[$propertyName] = $propertyValue;
                $entity = $repository->findOneBy($criteria);
            } else {
                $entity = $repository->find($propertyValue);
            }

            if (null === $entity) {
                throw new EntityNotFoundException(
                    sprintf('Entity "%s" with %s "%s" is not found.', $className, isset($propertyName) ? $propertyName : 'id', $propertyValue)
                );
            }

//             $em->initializeObject($entity);

            return $entity;
        }

        $doctrineMetadata = $em->getClassMetadata($className);
        $idProperty = current($doctrineMetadata->getIdentifier());

        if (
            $context->getDepth() > 1 &&
            is_array($data) &&
            array_key_exists($idProperty, $data) &&
            ($id = $data[$idProperty])
        ) {
            $entity = $em->find($className, $id);
            if (null === $entity) {
                throw new EntityNotFoundException(sprintf('Entity "%s" with id "%s" is not found.', $className, $id));
            }

//             $em->initializeObject($entity);

            return $entity;
        }

        return $this->fallbackConstructor->construct($visitor, $metadata, $data, $type, $context);
    }
}
