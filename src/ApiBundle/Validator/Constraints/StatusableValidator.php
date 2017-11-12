<?php

namespace ApiBundle\Validator\Constraints;

use ApiBundle\Exception\UnexpectedTypeException;
use ApiBundle\Validator\Constraints\Statusable as StatusableConstraint;
use ApiBundle\Interfaces\Statusable;
use Doctrine\ORM\EntityManager;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\HttpFoundation\Request;
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

        if (!$entityOldData) {
            return;
        }

        $oldStatus = $entityOldData['status'];
        $newStatus = $entity->getStatus();

        // status doesn't changed do nothing
        if ($oldStatus === $newStatus) {
            return;
        }

        $transition = $this->getAvailableTransition($oldStatus, $newStatus);

        $entity->setStatus($oldStatus); // turn back old status for workflow use and change it by apply

        if (!$this->workflow->can($entity, $transition)) {
            $this->context
                ->buildViolation($constraint->statusInvalid)
                ->setParameter('%from_status%', $entityOldData['status'])
                ->setParameter('%to_status%', $newStatus)
                ->atPath('status')
                ->addViolation();
        } else {
            $this->workflow->apply($entity, $transition);
        }
    }

    /**
     * @param $fromStatus
     * @param $toStatus
     * @return string|null
     */
    protected function getAvailableTransition($fromStatus, $toStatus)
    {
        $transitions = $this->workflow->getDefinition()->getTransitions();

        $transition = array_values(array_filter(array_map(function (Transition $trans) use ($fromStatus, $toStatus) {
            return in_array($fromStatus, $trans->getFroms()) && in_array($toStatus, $trans->getTos()) ?
                $trans->getName() :
                null;
        }, $transitions)));

        return $transition[0] ?? null;
    }
}
