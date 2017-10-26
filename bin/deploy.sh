#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
COMPOSER_CMD=$(which composer)
YARN_CMD=$(which yarn)

printf "Start Composer install : \n"
$COMPOSER_CMD install
printf "Start Migrations execute: \n"
$DIR/console doctrine:migration:migrate

printf "Start Assets install: \n"
$DIR/console assets:install
