<?php

namespace UserBundle\Manager;

use UserBundle\Entity\Token;
use UserBundle\Entity\User;
use UserBundle\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class AuthManager
{
    /** @var  EntityManagerInterface */
    protected $em;

    /** @var  UserManager */
    protected $userManager;

    /**
     * AuthManager constructor.
     * @param UserManager $userManager
     */
    public function __construct(EntityManagerInterface $entityManager, UserManager $userManager)
    {
        $this->em = $entityManager;
        $this->userManager = $userManager;
    }

    /**
     * @param User $user
     * @param $refreshToken
     * @return Token
     */
    public function updateToken(User $user, $refreshToken)
    {
        $tokenRepository = $this->em->getRepository(Token::class);
        $token = $tokenRepository->findOneBy([
            'refreshToken' => $refreshToken,
        ]);

        $this->em->remove($token);
        $this->em->flush();

        return $this->createAccessToken($user);
    }

    /**
     * Create access token for user
     *
     * @param User $user
     * @return Token
     */
    public function createAccessToken(User $user)
    {
        $token = new Token();
        $token->setAccessToken('new_access_token_123456789012345');
        $token->setRefreshToken('new_refresh_token_12345678901234');
        $token->setUser($user);
        $this->em->persist($token);
        $this->em->flush();

        return $token;
    }
}