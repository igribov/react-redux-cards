<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use UserBundle\Entity\Token;
use UserBundle\Entity\User;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171102134553 extends AbstractMigration implements ContainerAwareInterface
{
    use ContainerAwareTrait;

    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $userTable = $schema->createTable('user');
        $userTable->addColumn('id', 'integer', ['autoincrement' => true]);
        $userTable->setPrimaryKey(['id']);
        $userTable->addColumn('email', 'string', ['length' => 255, 'notnull' => true]);
        $userTable->addColumn('username', 'string', ['length' => 100, 'notnull' => true]);
        $userTable->addColumn('name', 'string', ['length' => 255, 'notnull' => true]);
        $userTable->addColumn('password_hash', 'string', ['length' => 60]);
        $userTable->addColumn('roles', 'integer', ['default' => 0, 'notnull' => true]);
        $userTable->addUniqueIndex(['email', 'username']);

        $tokenTable = $schema->createTable('token');
        $tokenTable->addColumn('id', 'integer', ['autoincrement' => true]);
        $tokenTable->setPrimaryKey(['id']);
        $tokenTable->addColumn('user_id', 'integer', ['notnull' => true]);
        $tokenTable->addColumn('access_token', 'string', ['length' => 32, 'notnull' => true]);
        $tokenTable->addColumn('refresh_token', 'string', ['length' => 32, 'notnull' => true]);
        $tokenTable->addColumn('expires_at', 'datetime', ['notnull' => true]);
        $tokenTable->addUniqueIndex(['access_token', 'refresh_token']);
        $tokenTable->addIndex(['user_id']);
        $tokenTable->addForeignKeyConstraint($userTable, ['user_id'], ['id'], ['onUpdate' => 'CASCADE', 'onDelete' => 'CASCADE']);
    }

    /**
     * @param Schema $schema
     */
    public function postUp(Schema $schema)
    {
        /** @var EntityManagerInterface $em */
        $em = $this->container->get('doctrine.orm.entity_manager');
        $user = new User();
        $user->setEmail('igribov@text.ru');
        $user->setUsername('igribov');
        $user->setName('Gribov Ilya');
        $user->setPasswordHash('sdagasdfgsfdgfsd');
        $user->setRoles([User::ROLE_ADMIN]);

        $token = new Token();
        $token->setUser($user);
        $token->setAccessToken('accesstoken123456789123456789012');
        $token->setRefreshToken('refresh_token_12345678912345678922');
        $token->setExpiresAt(new \DateTime('+1 month'));

        $em->persist($user);
        $em->persist($token);
        $em->flush();
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $schema->dropTable('user');
        $schema->dropTable('token');
    }
}
