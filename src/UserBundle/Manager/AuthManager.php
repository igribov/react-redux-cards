<?php

namespace UserBundle\Manager;

use UserBundle\Entity\User;
use UserBundle\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class AuthManager
{
    /** @var  UserManager */
    protected $userManager;

    /**
     * AuthManager constructor.
     * @param UserManager $userManager
     */
    public function __construct(UserManager $userManager)
    {
        $this->userManager = $userManager;
    }

}