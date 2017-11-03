<?php
namespace UserBundle\Controller;

use UserBundle\Entity\User;
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
     * @return object|UserManager
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
}