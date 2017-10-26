#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
YARN_CMD=$(which yarn)

cd $DIR/../src/FrontBundle/FrontSrc
printf "Start Frontend build: \n"
$YARN_CMD install

printf "Start Webpack build: \n"
$YARN_CMD build-resources

cd $DIR/../
printf "Start Assets install: \n"
$DIR/console assets:install
