<?php

namespace UserBundle\Manager;

use UserBundle\Entity\Token;
use UserBundle\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use UserBundle\TokenGenerator\TokenGeneratorInterface;
use Doctrine\ORM\EntityManagerInterface;

class AuthManager
{
    /** @var  EntityManagerInterface */
    protected $em;

    /** @var  UserManager */
    protected $userManager;

    /** @var  UserPasswordEncoderInterface */
    protected $passwordEncoder;

    /** @var  TokenGeneratorInterface */
    protected $tokenGenerator;

    /**
     * AuthManager constructor.
     * @param UserManager $userManager
     */
    public function __construct(
        EntityManagerInterface $entityManager,
        UserManager $userManager,
        UserPasswordEncoderInterface $passwordEncoder,
        TokenGeneratorInterface $tokenGenerator
    ) {
        $this->em = $entityManager;
        $this->userManager = $userManager;
        $this->passwordEncoder = $passwordEncoder;
        $this->tokenGenerator = $tokenGenerator;
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
        // todo add accesstoken generator
        $token->setAccessToken($this->tokenGenerator->generate());
        $token->setRefreshToken($this->tokenGenerator->generate());
        $token->setUser($user);
        $this->em->persist($token);
        $this->em->flush();

        return $token;
    }

    public function isEmailExists($email)
    {
        return $this->em->getRepository(User::class)->findOneBy(['email' => $email]);
    }

    /**
     * User signup
     *
     * @param User $user
     * @param string|null $referrer
     *
     * @return Token
     */
    public function signup(User $user, $referrer = null)
    {
        $user->setPasswordHash($this->passwordEncoder->encodePassword($user, $user->getPasswordPlain()));
        $this->userManager->save($user);

        return $this->createAccessToken($user);
    }
}