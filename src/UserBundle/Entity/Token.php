<?php

namespace UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Token
 *
 * @ORM\Table(name="token")
 * @ORM\Entity(repositoryClass="UserBundle\Repository\TokenRepository")
 */
class Token
{
    /**
     * Lifetime in seconds of the access token
     */
    const EXPIRES_IN = 2592000; // 30 days

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
     * @ORM\Column(name="access_token", type="string", length=32, unique=true)
     *
     * @Assert\NotBlank()
     * @Assert\Length(min=1, max=255)
     */
    protected $accessToken;

    /**
     * @var string
     *
     * @ORM\Column(name="refresh_token", type="string", length=32, unique=true)
     *
     * @Assert\NotBlank()
     * @Assert\Length(min=1, max=255)
     */
    protected $refreshToken;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="expires_at", type="datetime")
     */
    protected $expiresAt;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="UserBundle\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     *
     * @Assert\NotBlank()
     */
    protected $user;

    public function __construct()
    {
        $expiresAt = new \DateTime();
        $expiresAt->add(new \DateInterval('PT' . self::EXPIRES_IN . 'S'));
        $this->setExpiresAt($expiresAt);
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set accessToken
     *
     * @param string $accessToken
     *
     * @return Token
     */
    public function setAccessToken($accessToken)
    {
        $this->accessToken = $accessToken;

        return $this;
    }

    /**
     * Get accessToken
     *
     * @return string
     */
    public function getAccessToken()
    {
        return $this->accessToken;
    }

    /**
     * Set refreshToken
     *
     * @param string $refreshToken
     *
     * @return Token
     */
    public function setRefreshToken($refreshToken)
    {
        $this->refreshToken = $refreshToken;

        return $this;
    }

    /**
     * Get refreshToken
     *
     * @return string
     */
    public function getRefreshToken()
    {
        return $this->refreshToken;
    }

    /**
     * Set expiresAt
     *
     * @param \DateTime $expiresAt
     *
     * @return Token
     */
    public function setExpiresAt(\DateTime $expiresAt)
    {
        $this->expiresAt = $expiresAt;

        return $this;
    }

    /**
     * Get expiresAt
     *
     * @return \DateTime
     */
    public function getExpiresAt()
    {
        return $this->expiresAt;
    }

    /**
     * Set user
     *
     * @param User $user
     *
     * @return Token
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
     * Check whether token is expired or not
     *
     * @return bool
     */
    public function isExpired()
    {
        $now = new \DateTime();

        return $this->expiresAt < $now;
    }

    /**
     * Get lifetime in seconds of the access token
     *
     * @return int
     */
    public function getExpiresIn()
    {
        $now = new \DateTime();

        return $this->expiresAt->getTimestamp() - $now->getTimestamp();
    }
}

