<?php
namespace UserBundle\Controller;

use UserBundle\Entity\User;
use UserBundle\Manager\UserManager;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Swagger\Annotations as SWG;
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
     * @Get("/auth/login")
     * @Rest\View(serializerGroups={"user_registration"})
     */
    public function getAction()
    {
        die('');
        return ['test'];
    }
}