#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
COMPOSER_CMD=$(which composer)
YARN_CMD=$(which yarn)
WEBPACK_CMD=$(which webpack)

printf "Start Composer install : \n"
$COMPOSER_CMD install
printf "Start Migrations execute: \n"
$DIR/console doctrine:migration:migrate
cd $DIR/../src/FrontBundle/FrontSrc
printf "Start Frontend build: \n"
$YARN_CMD install
printf "Start Webpack build: \n"
$WEBPACK_CMD -p
