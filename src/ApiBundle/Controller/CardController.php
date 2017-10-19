<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Card;
use ApiBundle\Manager\CardManager;
use ApiBundle\Repository\CardRepository;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Swagger\Annotations as SWG;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * @Rest\RouteResource("Card")
 */
class CardController extends FOSRestController
{
    /**
     * @return CardManager
     */
    protected function getManager()
    {
        return $this->get('card.manager');
    }

    /**
     * @SWG\Tag(name="cards")
     * @SWG\Response(
     *     response=200,
     *     description="Returns list of card model",
     *     @SWG\Schema(
     *         type="array",
     *         @Model(type=Card::class, groups={"card_list"})
     *     )
     * )
     *
     * @Get("/card/")
     * @Rest\View(serializerGroups={"card_list"})
     */
    public function cgetAction()
    {
        return $this->getManager()->getAll();
    }

    /**
     * @Get("/card/{id}", requirements={"id" = "\d+"})
     * @Rest\View(serializerGroups={"card_detail"})
     * @ParamConverter("card")
     */
    public function getAction(Card $card)
    {
        return $card;
    }

    /**
     *
     * @-ApiDoc(
     *  description="Create new card",
     *  section="Card",
     *  input={
     *      "class"="ApiBundle\Entity\Card",
     *      "groups"={"card_create"}
     *  },
     *  output={
     *      "class"="ApiBundle\Entity\Card",
     *      "groups"={"card_detail"}
     *  }
     * )
     * @Post("/card")
     * @Rest\View(statusCode=201, serializerGroups={"card_detail"})
     * @ParamConverter(
     *     "card",
     *     converter="merging",
     *     options={
     *          "validator"={
     *              "groups"={"card_create"},
     *          },
     *          "deserializationContext"={
     *              "groups"={"card_create"}
     *          }
     *     }
     * )
     *
     * @param Card $card
     * @param ConstraintViolationListInterface $validationErrors
     * @return Card|View
     */
    public function createAction(Card $card, ConstraintViolationListInterface $validationErrors)
    {
        if ($validationErrors->count()) {
            return View::create($validationErrors, Response::HTTP_BAD_REQUEST);
        }

        return $this->getManager()->save($card);
    }
}
