<?php

namespace ApiBundle\Validator\Constraints;

use ApiBundle\Exception\UnexpectedTypeException;
use ApiBundle\Validator\Constraints\Statusable as StatusableConstraint;
use ApiBundle\Interfaces\Statusable;
use Doctrine\ORM\EntityManager;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Workflow\Transition;
use Symfony\Component\Workflow\Workflow;

class StatusableValidator extends ConstraintValidator
{
    /** @var RegistryInterface */
    protected $doctrine;

    /** @var Workflow */
    protected $workflow;

    /**
     * StatusableValidator constructor.
     * @param RegistryInterface $doctrine
     * @param Workflow $workflow
     */
    public function __construct(RegistryInterface $doctrine, Workflow $workflow)
    {
        $this->doctrine = $doctrine;
        $this->workflow = $workflow;
    }

    /**
     * {@inheritdoc}
     */
    public function validate($entity, Constraint $constraint)
    {
        if (!$entity instanceof Statusable) {
            throw new UnexpectedTypeException($entity, Statusable::class);
        }

        if (!$constraint instanceof StatusableConstraint) {
            throw new UnexpectedTypeException($constraint, StatusableConstraint::class);
        }

        $this->validateStatusable($entity, $constraint);

    }

    /**
     * @param Statusable $entity
     */
    protected function validateStatusable(Statusable $entity, StatusableConstraint $constraint)
    {
        $em = $this->doctrine->getManagerForClass(get_class($entity));
        $entityOldData = $em->getUnitOfWork()->getOriginalEntityData($entity);

        $availableTransition = $this->getAvailableTransition($entityOldData['status'], $entity->getStatus());

        if (
            !$availableTransition
            //|| !$this->workflow->can($entity, $availableTransition[0])
        ) {
            $this->context
                ->buildViolation($constraint->statusInvalid)
                ->setParameter('%from_status%', $entityOldData['status'])
                ->setParameter('%to_status%', $entity->getStatus())
                ->atPath('status')
                ->addViolation();
        }
    }

    /**
     * @param $fromStatus
     * @param $toStatus
     * @return array
     */
    protected function getAvailableTransition($fromStatus, $toStatus)
    {
        $transitions = $this->workflow->getDefinition()->getTransitions();

        return array_map(function (Transition $transition) {
                return $transition->getName();
            },
            array_filter($transitions, function (Transition $transition) use ($fromStatus, $toStatus) {
                return in_array($fromStatus, $transition->getFroms()) && in_array($toStatus, $transition->getTos());
            })
        );
    }
}
