<?php

namespace ApiBundle\Serializer\ParamConverter;

use ApiBundle\Exception\EntityNotFoundException;
use FOS\RestBundle\Request\RequestBodyParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Request\ParamConverter\ParamConverterInterface;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MergingRequestBodyParamConverter implements ParamConverterInterface
{
    /** @var RequestBodyParamConverter */
    protected $fosRestParamConverter;

    public function __construct(
        RequestBodyParamConverter $fosRestParamConverter,
        RegistryInterface $doctrine
    ) {
        $this->fosRestParamConverter = $fosRestParamConverter;
    }

    /**
     * @inheritdoc
     */
    public function apply(Request $request, ParamConverter $configuration)
    {
        $options = $configuration->getOptions();
        $converterOptions = $this->getConverterOptions($options);

        $propertyValue = $request->{$converterOptions['requestPropertyContainer']}->get($converterOptions['requestProperty']);
        $propertyName = $converterOptions['entityProperty'];
        $deserializationContext = $options['deserializationContext'] ?? [];

        $deserializationContext = array_merge($deserializationContext, [
            'propertyValue' => $propertyValue,
            'propertyName' => $propertyName,
        ]);
        $configuration->setOptions(array_merge($configuration->getOptions(), ['deserializationContext' => $deserializationContext]));

        try {
            return $this->fosRestParamConverter->apply($request, $configuration);
        } catch (EntityNotFoundException $e) {
            throw new BadRequestHttpException($e->getMessage(), $e);
        }
    }

    /**
     * @inheritdoc
     */
    public function supports(ParamConverter $configuration)
    {
        return $this->fosRestParamConverter->supports($configuration);
    }

    /**
     * @param array $options
     * @return array
     */
    protected function getConverterOptions(array $options)
    {
        $resolver = new OptionsResolver();
        $resolver->setDefaults([
            'requestProperty' => 'id',
            'entityProperty' => null, //identity property if null
            'requestPropertyContainer' => 'attributes',
        ]);

        $resolver->setAllowedTypes('requestProperty', 'string');
        $resolver->setAllowedTypes('entityProperty', ['string', 'null']);
        $resolver->setAllowedValues('requestPropertyContainer', ['attributes', 'request', 'query']);

        return $resolver->resolve($options['converter'] ?? []);
    }
}
