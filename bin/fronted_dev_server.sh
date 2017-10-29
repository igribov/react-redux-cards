#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
YARN_CMD=$(which yarn)

cd $DIR/../frontend
printf "Start Webpack dev server: \n"
$YARN_CMD start
