<?php

namespace Application\Migrations;

use ApiBundle\Entity\Card;
use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
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
        $table = $schema->createTable('card');
        $table->addColumn('id', 'integer', ['autoincrement' => true]);
        $table->setPrimaryKey(['id']);
        $table->addColumn('user_id', 'integer', ['notnull' => true]);
        $table->addIndex(['user_id']);
        $table->addColumn('title', 'string', ['length' => 255, 'notnull' => true]);
        $table->addColumn('description', 'text', ['notnull' => true]);
        $table->addColumn('status', 'string', ['length' => 10, 'notnull' => true, 'default' => 'backlog']);
        $table->addForeignKeyConstraint($schema->getTable('user'), ['user_id'], ['id'], ['onUpdate' => 'CASCADE', 'onDelete' => 'CASCADE']);
    }

    /**
     * @param Schema $schema
     */
    public function postUp(Schema $schema)
    {
        /** @var EntityManagerInterface $em */
        $em = $this->container->get('doctrine.orm.entity_manager');
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
        $schema->dropTable('card');
    }
}
