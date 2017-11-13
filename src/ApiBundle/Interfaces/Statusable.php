<?php

namespace ApiBundle\Interfaces;

use Symfony\Component\Workflow\MarkingStore\MarkingStoreInterface;

interface Statusable //extends MarkingStoreInterface
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