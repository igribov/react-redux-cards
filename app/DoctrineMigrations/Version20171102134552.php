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
        $this->clearSchema($schema);
    }

    /**
     * @param $schema
     */
    private function clearSchema(Schema $schema)
    {
        if($schema->hasTable('user')) {
            $schema->dropTable('user');
        }

        if($schema->hasTable('token')) {
            $schema->dropTable('token');
        }

        if($schema->hasTable('cards')) {
            $schema->dropTable('cards');
        }
    }

    public function down(Schema $schema)
    {
    }
}
