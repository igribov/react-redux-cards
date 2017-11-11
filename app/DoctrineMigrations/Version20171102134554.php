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
        // todo add driver validation MySql only

        $this->addSql('CREATE TABLE card (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, status VARCHAR(20) NOT NULL, INDEX IDX_161498D3A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE token (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, access_token VARCHAR(32) NOT NULL, refresh_token VARCHAR(32) NOT NULL, expires_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_5F37A13BB6A2DD68 (access_token), UNIQUE INDEX UNIQ_5F37A13BC74F2195 (refresh_token), INDEX IDX_5F37A13BA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(100) NOT NULL, name VARCHAR(255) DEFAULT NULL, password_hash VARCHAR(60) DEFAULT NULL, email VARCHAR(255) NOT NULL, roles INT UNSIGNED DEFAULT 0 NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE card ADD CONSTRAINT FK_161498D3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE token ADD CONSTRAINT FK_5F37A13BA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
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
