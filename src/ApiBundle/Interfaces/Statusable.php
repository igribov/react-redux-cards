<?php

namespace ApiBundle\Interfaces;

interface Statusable
{
    /**
     * @param $status
     * @return mixed
     */
    public function setStatus($status);

    /**
     * @return mixed
     */
    public function getStatus();
}