<?php

namespace ApiBundle\Manager;

use ApiBundle\Entity\Card;
use ApiBundle\Repository\CardRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CardManager
{
    /** @var  EntityManagerInterface */
    protected $entityManager;

    /** @var CardRepository  */
    protected $repository;

    /** @var ValidatorInterface  */
    protected $validator;

    /**
     * CardManager constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(Card::class);
        $this->validator = $validator;
    }

    /**
     * @param null $orderBy
     * @param null $limit
     * @param null $offset
     * @param array $criteria
     * @return array
     */
    public function getAll($orderBy = null, $limit = null, $offset = null, array $criteria = [])
    {
        // todo fix order by
        return $this->repository->findBy($criteria, null, $limit, $offset);
    }

    /**
     * @param Card $card
     * @return Card
     */
    public function save(Card $card)
    {
        $this->entityManager->persist($card);
        $this->entityManager->flush();

        return $card;
    }

    /**
     * @param Card $card
     * @return \Symfony\Component\Validator\ConstraintViolationListInterface
     */
    public function validate(Card $card)
    {
        return $this->validator->validate($card);
    }

    /**
     * @param Card $card
     */
    public function delete(Card $card)
    {
        $this->entityManager->remove($card);
        $this->entityManager->flush();
    }
}