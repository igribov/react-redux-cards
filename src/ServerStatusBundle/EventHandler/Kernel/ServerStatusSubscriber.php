<?php

namespace ServerStatusBundle\EventHandler\Kernel;

use ServerStatusBundle\Entity\ServerStatus;
use ServerStatusBundle\Repository\ServerStatusRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;
use Symfony\Component\HttpKernel\KernelEvents;

class ServerStatusSubscriber implements EventSubscriberInterface
{
    const CONTROLLER = 'ServerStatusBundle\Controller\DefaultController::indexAction';

    /**
     * @var ServerStatusRepository
     */
    protected $statusRepository;

    /**
     * ServerStatusSubscriber constructor.
     * @param ServerStatusRepository $statusRepository
     */
    public function __construct(ServerStatusRepository $statusRepository)
    {
        $this->statusRepository = $statusRepository;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => [
                ['onKernelRequest', 31], // After router
            ],
        ];
    }

    /**
     * @param GetResponseEvent $event
     */
    public function onKernelRequest(GetResponseEvent $event)
    {
        $request = $event->getRequest();

        if ($request->attributes->get('_controller') === self::CONTROLLER) {
            return;
        }

        switch ($this->statusRepository->getStatus()->getStatusId()) {
            case ServerStatus::STATUS_OFFLINE:
                throw new ServiceUnavailableHttpException();
                break;
            case ServerStatus::STATUS_SLOW:
                sleep(5);
                break;
        }
    }
}
