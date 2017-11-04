<?php

namespace UserBundle\TokenGenerator;

class SecureTokenGenerator implements TokenGeneratorInterface
{
    public function generate()
    {
        return bin2hex(random_bytes(32));
    }
}
