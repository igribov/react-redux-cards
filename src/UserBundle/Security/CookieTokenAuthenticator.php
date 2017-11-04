<?php

namespace UserBundle\Security;

use AuthBundle\Entity\Token;
use AuthBundle\Repository\TokenRepository;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class CookieTokenAuthenticator extends AbstractGuardAuthenticator
{
    /** @var RouterInterface */
    protected $router;

    /** @var TokenRepository */
    protected $repository;

    /** @var array */
    protected $parameters;

    public function __construct(RouterInterface $router, TokenRepository $repository, array $parameters)
    {
        $this->router = $router;
        $this->repository = $repository;

        $optionsResolver = new OptionsResolver();
        $optionsResolver->setRequired([
            'login_route',
            'cookie_name',
        ]);
        $optionsResolver->setAllowedTypes('login_route', ['string']);
        $optionsResolver->setAllowedTypes('cookie_name', ['string']);

        $this->parameters = $optionsResolver->resolve($parameters);
    }

    /**
     * @inheritDoc
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        return new RedirectResponse(
            $this->router->generate(
                $this->parameters['login_route'],
                [],
                RouterInterface::ABSOLUTE_URL
            )
        );
    }

    /**
     * @inheritDoc
     */
    public function getCredentials(Request $request)
    {
        return $request->cookies->get($this->parameters['cookie_name']);
    }

    /**
     * @inheritDoc
     */
    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        return $userProvider->loadUserByUsername($credentials);
    }

    /**
     * @inheritDoc
     */
    public function checkCredentials($credentials, UserInterface $user)
    {
        $token = null;

        if ($credentials) {
            /** @var Token $token */
            $token = $this->repository->findOneBy([
                'accessToken' => $credentials,
            ]);
        }

        if (!$token || $token->isExpired()) {
            throw new AuthenticationException('Access token is invalid');
        }

        return true;
    }

    /**
     * @inheritDoc
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new RedirectResponse(
            $this->router->generate(
                $this->parameters['login_route'],
                [],
                RouterInterface::ABSOLUTE_URL
            )
        );
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
