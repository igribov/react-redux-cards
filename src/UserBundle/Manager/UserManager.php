<?php

namespace UserBundle\Manager;

use UserBundle\Entity\Token;
use UserBundle\Entity\User;
use UserBundle\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class UserManager
{
    /** @var  EntityManagerInterface */
    protected $em;

    /** @var UserRepository  */
    protected $repository;

    /**
     * UserManager constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
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
        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }

    /**
     * @param User $user
     */
    public function delete(User $user)
    {
        $this->em->remove($user);
        $this->em->flush();
    }
}