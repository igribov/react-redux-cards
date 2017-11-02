<?php

namespace UserBundle\Security;

use UserBundle\Entity\User;
use UserBundle\Entity\Token;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class TokenUserProvider implements UserProviderInterface
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
    public function loadUserByUsername($token)
    {
        $qb = $this->repository->createQueryBuilder('u');
        $qb->select('u')
            ->leftJoin(Token::class, 't', 'WITH', 'u.id=t.user')
            ->where('t.accessToken = :accessToken')
            ->setParameter('accessToken', $token)
            ->setMaxResults(1)
        ;

        $user = $qb->getQuery()->getOneOrNullResult();

        if (!$user) {
            throw new UsernameNotFoundException(sprintf('User with token "%s" does not exist.', $token));
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
