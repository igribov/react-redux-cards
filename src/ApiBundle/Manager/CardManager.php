<?php

namespace ApiBundle\Manager;

use ApiBundle\Entity\Card;
use ApiBundle\Repository\CardRepository;
use Doctrine\ORM\EntityManagerInterface;

class CardManager
{
    /** @var  EntityManagerInterface */
    protected $entityManager;

    /** @var CardRepository  */
    protected $repository;

    /**
     * CardManager constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(Card::class);
    }

    /**
     * @return Card[]
     */
    public function getAll()
    {
        return $this->repository->findAll();
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
}