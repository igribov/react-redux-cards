<?php

namespace ApiBundle\EventHandler;

use ApiBundle\Interfaces\Statusable;
use Doctrine\ORM\Event\LifecycleEventArgs;

/**
 * Class GuidListener
 * @package AuthBundle\EventHandler
 */
class StatusableListener
{
    const DEFAULT_STATUS = 'backlog';

    /**
     * @param LifecycleEventArgs $event
     */
    public function prePersist(LifecycleEventArgs $event)
    {
        $entity = $event->getEntity();
        if(!$entity instanceof Statusable || $entity->getStatus()) {
            return;
        }

        $entity->setStatus(self::DEFAULT_STATUS);
    }
}