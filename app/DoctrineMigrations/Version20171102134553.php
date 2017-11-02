<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171102134553 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $platform = $this->connection->getDatabasePlatform()->getName();
        $this->abortIf(!in_array($platform, ['mysql', 'sqlite']), 'Migration can only be executed safely on \'mysql\' or \'sqlite\'.');

        $this->addSql("CREATE TABLE user (id INTEGER NOT NULL " . ( $platform === 'mysql' ? 'AUTO_INCREMENT' : '' ). ", email VARCHAR(255) NOT NULL COLLATE BINARY, username VARCHAR(100) NOT NULL, name VARCHAR(255) NOT NULL, password_hash VARCHAR(60) DEFAULT NULL, roles INTEGER UNSIGNED DEFAULT 0 NOT NULL, PRIMARY KEY(id))");
        $this->addSql("CREATE UNIQUE INDEX UNIQ_8D93D649AA08CB10 ON user (username)");
        $this->addSql("CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)");

        $this->addSql("CREATE TABLE token (id INTEGER NOT NULL " . ( $platform === 'mysql' ? 'AUTO_INCREMENT' : '' ). ", user_id INTEGER NOT NULL, access_token VARCHAR(32) NOT NULL, refresh_token VARCHAR(32) NOT NULL, expires_at DATETIME NOT NULL, PRIMARY KEY(id))");
        $this->addSql("CREATE UNIQUE INDEX UNIQ_5F37A13BB6A2DD68 ON token (access_token)");
        $this->addSql("CREATE UNIQUE INDEX UNIQ_5F37A13BC74F2195 ON token (refresh_token)");
        $this->addSql("CREATE INDEX IDX_5F37A13BA76ED395 ON token (user_id)");

        $this->addSql("INSERT INTO user (id, email, username, name, password_hash, roles ) 
                        VALUES (1, 'igribov@email.ru', 'igribov', 'Ilya Gribov', 'sdgdsgdfg4refer', 4)");
        $this->addSql("INSERT INTO token (id, user_id, access_token, refresh_token, expires_at) 
                        VALUES (1, 1, 'access_token_232', 'refr_token_232', '2017-10-10 12:00:00')");
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $platform = $this->connection->getDatabasePlatform()->getName();
        $this->abortIf(!in_array($platform, ['mysql', 'sqlite']), 'Migration can only be executed safely on \'mysql\' or \'sqlite\'.');

        $this->addSql("DROP table user");
        $this->addSql("DROP table token");
    }
}
