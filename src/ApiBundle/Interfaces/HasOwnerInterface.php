<?php

namespace ApiBundle\Interfaces;

use UserBundle\Entity\User;

interface HasOwnerInterface
{
    /**
     * @param User $user
     * @return mixed
     */
    public function setUser(User $user);

    /**
     * @return User
     */
    public function getUser():User;
}