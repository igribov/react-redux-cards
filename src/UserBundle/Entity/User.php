<?php

namespace UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;
use Symfony\Component\Security\Core\User\EquatableInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints as DoctrineAssert;

/**
 * User
 *
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="UserBundle\Repository\UserRepository")
 * @DoctrineAssert\UniqueEntity(
 *     "email",
 *     groups = {"user_create", "user_update", "user_signup", "user_change_email"},
 *     message="user.email.already_exists"
 * )
 */
class User implements AdvancedUserInterface, EquatableInterface
{
    /** salt */
    const USER_SALT = '_some_sercret_1024';

    const ROLE_RESTRICTED = 'ROLE_RESTRICTED';
    const ROLE_USER = 'ROLE_USER';
    const ROLE_ADMIN = 'ROLE_ADMIN';

    const ROLES = [
        self::ROLE_RESTRICTED => 1,
        self::ROLE_USER => 2,
        self::ROLE_ADMIN => 4,
    ];

    const ROLE_CHOICES = [
        self::ROLE_RESTRICTED => 'Неподтвержденный',
        self::ROLE_USER => 'Пользователь',
        self::ROLE_ADMIN => 'Администратор',
    ];

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
     * @ORM\Column(name="username", type="string", length=100)
     *
     * @Assert\NotBlank(
     *     groups = {"user_create", "user_update"}
     * )
     * @Assert\Length(
     *     min = 1,
     *     max = 100,
     *     groups = {"user_create", "user_update"}
     * )
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     *
     * @Assert\Length(
     *     min = 1,
     *     max = 255,
     *     groups = {"user_create", "user_update"}
     * )
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="password_hash", type="string", length=60, nullable=true)
     */
    private $passwordHash;

    /**
     * @var string
     *
     * @Assert\NotBlank(
     *     groups = {"user_create", "user_password_update", "user_signup"}
     * )
     * @Assert\Length(
     *     min = 8,
     *     groups = {"user_create", "user_update", "user_password_update", "user_signup"}
     * )
     */
    protected $passwordPlain;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255, unique=true)
     *
     * @Assert\NotBlank(
     *     groups = {"user_create", "user_update", "user_signup", "user_change_email"},
     *     message="user.email.not_blank"
     * )
     * @Assert\Email(
     *     groups = {"user_create", "user_update", "user_signup", "user_change_email"},
     *     message="user.email.invalid_email"
     * )
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="roles", type="integer", options={"unsigned":true, "default":0})
     */
    private $roles;

    /**
     * User constructor.
     */
    public function __construct()
    {
        $this->roles = self::ROLES[self::ROLE_RESTRICTED];
    }

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
     * Set login
     *
     * @param string $username
     *
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get login
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set email
     *
     * @param string $name
     *
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @inheritDoc
     */
    public function getRoles()
    {
        $roles = [];

        foreach(static::ROLES as $roleName => $roleValue)
        {
            if ($roleValue & $this->roles) {
                $roles[] = $roleName;
            }
        }

        return $roles;
    }

    /**
     * @param array $roles
     * @return User
     */
    public function setRoles(array $roles)
    {
        $this->roles = 0;

        foreach($roles as $role) {
            $this->roles |= static::ROLES[$role] ?? 0;
        }

        return $this;
    }

    /*
     * @inheritDoc
     */
    public function getPassword()
    {
        return $this->passwordHash;
    }

    /**
     * @return string
     */
    public function getPasswordHash()
    {
        return $this->passwordHash;
    }

    /**
     * @param string $passwordHash
     * @return User
     */
    public function setPasswordHash(string $passwordHash)
    {
        $this->passwordHash = $passwordHash;

        return $this;
    }

    /**
     * @return string
     */
    public function getPasswordPlain()
    {
        return $this->passwordPlain;
    }

    /**
     * @param string $password
     * @return $this
     */
    public function setPasswordplain(string $password)
    {
        $this->passwordPlain = $password;

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function eraseCredentials()
    {
        // Just do nothing
    }

    /**
     * @inheritDoc
     */
    public function isAccountNonExpired()
    {
        return true;
    }

    /**
     * @inheritDoc
     */
    public function isAccountNonLocked()
    {
        return true;
    }

    /**
     * @inheritDoc
     */
    public function isCredentialsNonExpired()
    {
        return true;
    }

    /**
     * @inheritDoc
     */
    public function isEnabled()
    {
        //@todo: Add return isActive here
        return true;
    }

    public function getSalt()
    {
        return self::USER_SALT;
        // TODO: Implement getSalt() method.
    }

    /**
     * @inheritdoc
     */
    public function isEqualTo(UserInterface $user)
    {
        if (!$user instanceof User) {
            return false;
        }

        if ($this->getId() !== $user->getId()) {
            return false;
        }

        if ($this->getName() !== $user->getName()) {
            return false;
        }

        if ($this->getEmail() !== $user->getEmail()) {
            return false;
        }

        if ($this->getPasswordHash() !== $user->getPasswordHash()) {
            return false;
        }

        if ($this->getRoles() !== $user->getRoles()) {
            return false;
        }

        return true;
    }

    /**
     * @inheritdoc
     */
    public function preSerialize()
    {
    }
}

