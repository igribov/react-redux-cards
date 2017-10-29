#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
YARN_CMD=$(which yarn)

$DIR/console server:start

cd $DIR/../frontend
printf "Start dev server: \n"
$YARN_CMD start
