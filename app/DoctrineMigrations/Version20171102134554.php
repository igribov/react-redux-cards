<?php

namespace Application\Migrations;

use ApiBundle\Entity\Card;
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
class Version20171102134554 extends AbstractMigration implements ContainerAwareInterface
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
        $userTable->addColumn('username', 'string', ['length' => 100, 'default' => null, 'notnull' => false]);
        $userTable->addColumn('name', 'string', ['length' => 100, 'default' => null, 'notnull' => false]);
        $userTable->addColumn('password_hash', 'string', ['length' => 60, 'default' => null, 'notnull' => false]);
        $userTable->addColumn('roles', 'integer', ['default' => '0', 'notnull' => true, 'unsigned' => true]);
        $userTable->addUniqueIndex(['email']);

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

        $cardTable = $schema->createTable('card');
        $cardTable->addColumn('id', 'integer', ['autoincrement' => true]);
        $cardTable->setPrimaryKey(['id']);
        $cardTable->addColumn('user_id', 'integer', ['notnull' => true]);
        $cardTable->addIndex(['user_id']);
        $cardTable->addColumn('title', 'string', ['length' => 255, 'notnull' => true]);
        $cardTable->addColumn('description', 'text', ['notnull' => true]);
        $cardTable->addColumn('status', 'string', ['length' => 10, 'notnull' => true, 'default' => 'backlog']);
        $cardTable->addForeignKeyConstraint($schema->getTable('user'), ['user_id'], ['id'], ['onUpdate' => 'CASCADE', 'onDelete' => 'CASCADE']);
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
        //$user->setUsername('igribov');
        //$user->setName('Gribov Ilya');
        $user->setPasswordHash('$2y$12$H2scXyPDJ0/.xUEKwMG2Q.6Cctdp2z9dfeQRRadmRJ7bb.9rzoqhm'); // pass
        $user->setRoles([User::ROLE_ADMIN]);

        $token = new Token();
        $token->setUser($user);
        $token->setAccessToken('accesstoken123456789123456789012');
        $token->setRefreshToken('refresh1token1123456789123456789');
        $token->setExpiresAt(new \DateTime('+1 month'));

        $em->persist($user);
        $em->persist($token);
        $em->flush();

        $card = new Card();
        $card->setTitle('My new card');
        $card->setDescription('My new card description');
        $card->setUser($em->getRepository(User::class)->find($id = 1));
        $em->persist($card);
        $em->flush();
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $schema->dropTable('user');
        $schema->dropTable('token');
        $schema->dropTable('card');
    }
}
