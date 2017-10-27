<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171009082831 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->abortIf(!in_array($this->connection->getDatabasePlatform()->getName(), ['mysql', 'sqlite']), 'Migration can only be executed safely on \'mysql\' or \'sqlite\'.');

        switch($this->connection->getDatabasePlatform()->getName()) {
            case 'mysql':
                $this->addSql("CREATE TABLE card (id INTEGER NOT NULL AUTO_INCREMENT, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, status VARCHAR(16) NOT NULL, PRIMARY KEY(id))");
                break;
            default: // sqlite
                $this->addSql("CREATE TABLE card (id INTEGER NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, status VARCHAR(16) NOT NULL, PRIMARY KEY(id))");
        }

        $this->addSql("INSERT INTO card (id, title, description, status) VALUES (1, 'My new card', 'My new card desc', 'todo')");
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $this->abortIf(!in_array($this->connection->getDatabasePlatform()->getName(), ['mysql', 'sqlite']), 'Migration can only be executed safely on \'mysql\' or \'sqlite\'.');
        $this->addSql('DROP TABLE card');
    }
}
