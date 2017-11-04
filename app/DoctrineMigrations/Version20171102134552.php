<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171102134552 extends AbstractMigration
{

    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $schema->dropTable('user');
        $schema->dropTable('token');
        $schema->dropTable('cards');
    }

    public function down(Schema $schema)
    {
    }
}
