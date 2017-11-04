<?php

namespace UserBundle\TokenGenerator;

class RandomTokenGenerator implements TokenGeneratorInterface
{
    public function generate()
    {
        $result = unpack('h*', random_bytes(16));
        return current($result);
    }
}