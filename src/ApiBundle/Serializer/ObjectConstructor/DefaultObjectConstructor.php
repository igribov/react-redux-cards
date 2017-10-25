<?php

namespace ApiBundle\Serializer\ObjectConstructor;

use JMS\Serializer\Construction\ObjectConstructorInterface;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\Metadata\ClassMetadata;
use JMS\Serializer\VisitorInterface;

class DefaultObjectConstructor implements ObjectConstructorInterface
{
    /**
     * @inheritDoc
     */
    public function construct(VisitorInterface $visitor, ClassMetadata $metadata, $data, array $type, DeserializationContext $context)
    {
        return new $metadata->name;
    }
}
