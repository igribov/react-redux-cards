<?php

namespace ServerStatusBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/status")
     */
    public function indexAction()
    {
        return $this->render('ServerStatusBundle:Default:index.html.twig');
    }
}
