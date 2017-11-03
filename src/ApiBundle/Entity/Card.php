<?php

namespace ApiBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;
use ApiBundle\Interfaces\Statusable;
use UserBundle\Entity\User;

/**
 * Card
 *
 * @ORM\Table(name="card")
 * @ORM\Entity(repositoryClass="ApiBundle\Repository\CardRepository")
 */
class Card implements Statusable
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     * @Assert\NotBlank(groups={"card_create", "card_update"})
     * @Assert\Length(max=255, groups={"card_create", "card_update"})
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255)
     * @Assert\NotBlank(groups={"card_create", "card_update"})
     * @Assert\Length(max=255, groups={"card_create", "card_update"})
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=16)
     * @Assert\Length(max=16)
     */
    private $status;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="UserBundle\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     *
     * @Assert\NotBlank()
     */
    protected $user;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Card
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Card
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set status
     *
     * @param string $status
     *
     * @return Card
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set user
     *
     * @param User $user
     *
     * @return Card
     */
    public function setUser(User $user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @-param ExecutionContextInterface $context
     * @-param $payload
     *
     * @-Assert\Callback(groups={
     *     "card_create", "card_update",
     * })
     */
    /*public function validate(ExecutionContextInterface $context, $payload)
    {
        dump($context->getViolations());die;
        if ($this->getContext()->getRenders()->count() != $this->renderParameters->count()) {
            $context->buildViolation('Invalid render parameters')
                ->atPath('renderParameters')
                ->addViolation();
        }
    }*/
}

