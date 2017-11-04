<?php

namespace UserBundle\TokenGenerator;

interface TokenGeneratorInterface
{
    /**
     * @return string
     */
    public function generate();
}