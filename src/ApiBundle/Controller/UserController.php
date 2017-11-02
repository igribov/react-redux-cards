<?php

namespace ApiBundle\Controller;

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
 * @Rest\RouteResource("User")
 */
class UserController extends FOSRestController
{
    /**
     * @return object|UserManager
     */
    protected function getManager()
    {
        return $manager = $this->get('user.manager');
    }

    /**
     * @SWG\Tag(name="users")
     * @SWG\Response(
     *     response=200,
     *     description="Returns list of user model",
     *     @SWG\Schema(
     *         type="array",
     *         @Model(type=User::class, groups={"user_list"})
     *     )
     * )
     *
     * @Get("/user/")
     * @Rest\View(serializerGroups={"user_list"})
     */
    public function cgetAction()
    {
        return $this->getManager()->getAll();
    }

    /**
     * @Get("/user/{id}", requirements={"id" = "\d+"})
     * @Rest\View(serializerGroups={"user_detail"})
     * @ParamConverter("user")
     */
    public function getAction(User $user)
    {
        return $user;
    }

    /**
     *
     * @-ApiDoc(
     *  description="Create new user",
     *  section="User",
     *  input={
     *      "class"="ApiBundle\Entity\User",
     *      "groups"={"user_create"}
     *  },
     *  output={
     *      "class"="ApiBundle\Entity\User",
     *      "groups"={"user_detail"}
     *  }
     * )
     * @Post("/user")
     * @Rest\View(statusCode=201, serializerGroups={"user_detail"})
     * @ParamConverter(
     *     "user",
     *     converter="merging",
     *     options={
     *          "validator"={
     *              "groups"={"user_create"},
     *          },
     *          "deserializationContext"={
     *              "groups"={"user_create"}
     *          }
     *     }
     * )
     *
     * @param User $user
     * @param ConstraintViolationListInterface $validationErrors
     * @return User|View
     */
    public function createAction(User $user, ConstraintViolationListInterface $validationErrors)
    {
        if ($validationErrors->count()) {
            return View::create($validationErrors, Response::HTTP_BAD_REQUEST);
        }

        return $this->getManager()->save($user);
    }

    /**
     *
     * @-ApiDoc(
     *  description="Update user",
     *  section="User",
     *  input={
     *      "class"="ApiBundle\Entity\User",
     *      "groups"={"user_update"}
     *  },
     *  output={
     *      "class"="ApiBundle\Entity\User",
     *      "groups"={"user_detail"}
     *  }
     * )
     * @Put("/user/{id}", requirements={"id" = "\d+"})
     * @Rest\View(statusCode=200, serializerGroups={"user_detail"}, serializerEnableMaxDepthChecks=true)
     * @ParamConverter(
     *     "user",
     *     converter="merging",
     *     options={
     *          "validator"={
     *              "groups"={"user_update"},
     *          },
     *          "deserializationContext"={
     *              "groups"={"user_update"}
     *          }
     *     }
     * )
     *
     * @param User $user
     * @param ConstraintViolationListInterface $validationErrors
     * @return User|View
     */
    public function updateAction(User $user, ConstraintViolationListInterface $validationErrors)
    {
        if ($validationErrors->count()) {
            return View::create($validationErrors, Response::HTTP_BAD_REQUEST);
        }

        return $this->getManager()->save($user);
    }

    /**
     * @param User $user
     * @Delete("/user/{id}", requirements={"id" = "\d+"})
     * @Rest\View(statusCode=204)
     * @ParamConverter("user")
     */
    public function deleteAction(User $user)
    {
        $this->getManager()->delete($user);
    }
}
