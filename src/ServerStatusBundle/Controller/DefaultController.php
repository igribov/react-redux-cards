<?php

namespace ServerStatusBundle\Controller;

use ServerStatusBundle\Entity\ServerStatus;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @return \ServerStatusBundle\Repository\ServerStatusRepository
     */
    protected function getRepository()
    {
        return $this->container->get('server.status.repository');
    }

    /**
     * @Route("/")
     */
    public function indexAction(Request $request)
    {
        $status = $this->getRepository()->getStatus();

        $form = $this->createFormBuilder($status)
            ->add('statusId', ChoiceType::class, ['choices' => ServerStatus::STATUSES])
            ->add('save', SubmitType::class, array('label' => 'Change Status'))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $status = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($status);
            $em->flush();
        }

        return $this->render('ServerStatusBundle:Default:index.html.twig', [
            'form' => $form->createView(),
            'currentStatus' => $status->getStatusName(),
        ]);

    }
}
