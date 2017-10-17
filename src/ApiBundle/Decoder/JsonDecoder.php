<?php

namespace ApiBundle\Decoder;

use FOS\RestBundle\Decoder\DecoderInterface;

class JsonDecoder implements DecoderInterface
{
    /**
     * {@inheritdoc}
     */
    public function decode($data)
    {
        // Remove UTF8 BOM
        $bom = pack('H*', 'EFBBBF');
        $data = preg_replace("/^$bom/", '', $data);

        return @json_decode($data, true);
    }
}
