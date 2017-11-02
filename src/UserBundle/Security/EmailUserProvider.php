<?php

namespace AuthBundle\Security;

use AuthBundle\Entity\User;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class EmailUserProvider implements UserProviderInterface
{
    /** @var EntityRepository */
    protected $repository;

    public function __construct(EntityRepository $repository)
    {
        if (!$this->supportsClass($repository->getClassName())) {
            throw new \InvalidArgumentException(sprintf('The repository should be for class "%s"', User::class));
        }

        $this->repository = $repository;
    }

    /**
     * @inheritDoc
     */
    public function loadUserByUsername($email)
    {
        $user = $this->repository->findBy([
            'email' => $email,
        ]);

        $user = current($user);

        if (!$user) {
            throw new UsernameNotFoundException(sprintf('User with email "%s" does not exist.', $email));
        }

        return $user;
    }

    /**
     * @inheritDoc
     */
    public function refreshUser(UserInterface $user)
    {
        // Refresh is not required for stateless authentication
        return $user;
    }

    /**
     * @inheritDoc
     */
    public function supportsClass($class)
    {
        return User::class === $class;
    }
}
