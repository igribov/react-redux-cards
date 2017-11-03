<?php
namespace UserBundle\Controller;

use FOS\RestBundle\Request\ParamFetcher;
use UserBundle\Entity\Token;
use UserBundle\Entity\User;
use UserBundle\Manager\AuthManager;
use UserBundle\Manager\UserManager;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Extra;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * @Rest\RouteResource("Auth")
 */
class AuthController extends FOSRestController
{
    /**
     * @return object|AuthManager
     */
    protected function getManager()
    {
        return $manager = $this->get('auth.manager');
    }

    /**
     *
     * @Rest\Post("/login")
     * @Rest\View(serializerGroups={"user_registration"})
     */
    public function loginAction()
    {
        die('');
        return ['test'];
    }

    /**
     * Get profile
     *
     * @Rest\Get("/profile")
     * @Rest\View(serializerGroups={"user_detail"})
     * @Extra\Security("has_role(constant('UserBundle\\Entity\\User::ROLE_RESTRICTED'))")
     */
    public function profileAction()
    {
        return $this->getUser();
    }

    /**
     * Refresh token
     *
     * @-ApiDoc(
     *  section="User",
     *  requirements={
     *      {
     *          "name"="refresh_token",
     *          "dataType"="string"
     *      }
     *  },
     *  output={
     *      "class"="AuthBundle\Entity\Token",
     *      "groups"={"token_detail"}
     * },
     *  statusCodes={
     *      200="Success"
     *  })
     *
     * @Rest\Post("/token")
     * @Rest\RequestParam(name="refresh_token", strict=true, nullable=false, allowBlank=false, description="Refresh token")
     * @Rest\View(serializerGroups={"token_detail"})
     * @Extra\Security("has_role(constant('UserBundle\\Entity\\User::ROLE_RESTRICTED'))")
     *
     * @param ParamFetcher $paramFetcher
     * @return Token
     */
    public function tokenAction(ParamFetcher $paramFetcher)
    {
        $user = $this->getUser();
        $token = $this->getManager()->updateToken($user, $paramFetcher->get('refresh_token'));

        return $token;
    }
}