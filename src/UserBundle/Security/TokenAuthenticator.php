<?php

namespace UserBundle\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use UserBundle\Entity\Token;
use UserBundle\Repository\TokenRepository;

class TokenAuthenticator extends AbstractGuardAuthenticator
{
    /** @var TokenRepository */
    protected $repository;

    public function __construct(TokenRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @inheritDoc
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        return new Response(null, 401);
    }

    /**
     * @inheritDoc
     */
    public function getCredentials(Request $request)
    {
        $tokenHeader = $request->headers->get('Authorization');

        if (!preg_match('~^Bearer\s(\w{32})$~', $tokenHeader, $accessToken)) {
            return null;
        }

        $refreshToken = $request->get('refresh_token');

        return [
            'accessToken' => $accessToken[1],
            'refreshToken' => $refreshToken,
        ];
    }

    /**
     * @inheritDoc
     */
    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        return $userProvider->loadUserByUsername($credentials['accessToken']);
    }

    /**
     * @inheritDoc
     */
    public function checkCredentials($credentials, UserInterface $user)
    {
        /** @var Token $token */
        $token = $this->repository->findOneBy([
            'accessToken' => $credentials['accessToken'],
        ]);

        if (!$token || $token->isExpired()) {
            throw new AuthenticationException('Access token is invalid');
        }

        $refreshToken = $credentials['refreshToken'];
        if ($refreshToken && $token->getRefreshToken() != $refreshToken) {
            throw new AuthenticationException('Refresh token is invalid');
        }

        return true;
    }

    /**
     * @inheritDoc
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new Response(null, 403);
    }

    /**
     * @inheritDoc
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return null;
    }

    /**
     * @inheritDoc
     */
    public function supportsRememberMe()
    {
        return false;
    }
}
