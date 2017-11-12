<?php

namespace ApiBundle\EventHandler;

use ApiBundle\Interfaces\Statusable;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\Workflow\Workflow;

/**
 * Class GuidListener
 * @package AuthBundle\EventHandler
 */
class StatusableListener
{
    /** @var Workflow  */
    protected $workflow;

    /**
     * StatusableListener constructor.
     * @param $workflow
     */
    public function __construct(Workflow $workflow)
    {
        $this->workflow = $workflow;
    }

    /**
     * @param LifecycleEventArgs $event
     */
    public function prePersist(LifecycleEventArgs $event)
    {
        $entity = $event->getEntity();
        if(!$entity instanceof Statusable || $entity->getStatus()) {
            return;
        }

        $entity->setStatus($this->workflow->getDefinition()->getInitialPlace());
    }
}