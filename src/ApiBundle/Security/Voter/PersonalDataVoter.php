<?php

namespace ApiBundle\Security\Voter;

use ApiBundle\Interfaces\HasOwnerInterface;
use UserBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authorization\AccessDecisionManagerInterface;

class PersonalDataVoter extends Voter
{
    const UPDATE = 'UPDATE';
    const VIEW = 'VIEW';

    const ACTIONS = [
        self::UPDATE,
        self::VIEW
    ];

    /** AccessDecisionManagerInterface */
    protected $decisionManager;

    /**
     * CardVoter constructor.
     * @param AccessDecisionManagerInterface $decisionManager
     */
    public function __construct(AccessDecisionManagerInterface $decisionManager)
    {
        $this->decisionManager = $decisionManager;
    }

    /**
     * @param string $attribute
     * @param mixed $subject
     * @return bool
     */
    protected function supports($attribute, $subject)
    {
        if (!in_array($attribute, self::ACTIONS)) {
            return false;
        }

        // only vote on Post objects inside this voter
        if (!$subject instanceof HasOwnerInterface) {
            return false;
        }

        return true;
    }

    /**
     * @param string $attribute
     * @param mixed $subject
     * @param TokenInterface $token
     * @return bool
     */
    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }

        if ($this->decisionManager->decide($token, [User::ROLE_ADMIN])) {
            return true;
        }

        /** @var HasOwnerInterface $entity */
        $entity = $subject;

        switch ($attribute) {
            case self::VIEW:
                return $this->canView($entity, $user);
            case self::UPDATE:
                return $this->canUpdate($entity, $user);
        }

        throw new \LogicException('Voter exception');
    }

    /**
     * @param HasOwnerInterface $entity
     * @param User $user
     * @return bool
     */
    private function canView(HasOwnerInterface $entity, User $user)
    {
        return $this->canUpdate($entity, $user);
    }

    /**
     * @param HasOwnerInterface $entity
     * @param User $user
     * @return bool
     */
    private function canUpdate(HasOwnerInterface $entity, User $user)
    {
        return $user === $entity->getUser();
    }

}