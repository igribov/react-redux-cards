<?php

namespace UserBundle\Manager;

use UserBundle\Entity\User;
use UserBundle\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class UserManager
{
    /** @var  EntityManagerInterface */
    protected $entityManager;

    /** @var UserRepository  */
    protected $repository;

    /**
     * UserManager constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(User::class);
    }

    /**
     * @return User[]
     */
    public function getAll()
    {
        return $this->repository->findAll();
    }

    /**
     * @param User $user
     * @return User
     */
    public function save(User $user)
    {
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }

    /**
     * @param User $user
     */
    public function delete(User $user)
    {
        $this->entityManager->remove($user);
        $this->entityManager->flush();
    }
}