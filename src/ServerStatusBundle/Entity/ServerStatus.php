<?php
namespace ServerStatusBundle\Entity;

//use UserBundle\Entity\User;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * Status
 *
 * @ORM\Table(name="status")
 * @ORM\Entity(repositoryClass="ServerStatusBundle\Repository\ServerStatusRepository")
 */
class ServerStatus
{
    const STATUS_ONLINE = 1;
    const STATUS_OFFLINE = 0;
    const STATUS_SLOW = 2;

    const STATUSES = [
        'Online' => self::STATUS_ONLINE,
        'Offline' => self::STATUS_OFFLINE,
        'Slow' => self::STATUS_SLOW,
    ];

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="status_id", type="integer")
     * @Assert\NotBlank()
     */
    protected $statusId = 1;

    /**
     * @var User
     *
     * @-ORM\ManyToOne(targetEntity="UserBundle\Entity\User")
     * @-ORM\JoinColumn(nullable=false)
     *
     */
    //protected $user;

    /**
     * @return $this
     */
    public function setOnline()
    {
        $this->status = self::STATUS_ONLINE;

        return $this;
    }

    /**
     * @return $this
     */
    public function setOffline()
    {
        $this->status = self::STATUS_OFFLINE;

        return $this;
    }

    /**
     * @return $this
     */
    public function setSlow()
    {
        $this->status = self::STATUS_SLOW;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getStatusId()
    {
        return $this->statusId;
    }


    /**
     * @return string
     */
    public function getStatusName()
    {
        return array_flip(self::STATUSES)[$this->statusId];
    }

    /**
     * @param int $statusId
     * @return string
     */
    public function setStatusId($statusId)
    {
        $this->statusId = $statusId;

        return $this;
    }

    /**
     * @return User
     */
    /*public function getUser()
    {
        return $this->user;
    }*/

    /**
     * @param User $user
     * @return $this
     */
    /*public function setUser(User $user)
    {
        $this->user = $user;

        return $this;
    }*/
}