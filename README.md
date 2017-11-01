cards react simple application
=============

A Symfony project created on October 9, 2017, 7:23 am.
1) Composer required for deploy
2) NodeJS and NPM required for frontend build


Deploy:
 - git clone https://gitlab.com/gribov/cards.git
 - cd cards
 - ./bin/deploy.sh
 - OR composer install & ./bin/console assets:install
 
Deploy to heroku:
  - heroku buildpacks:add heroku/nodejs
  - heroku buildpacks:add heroku/php
  - heroku config:set NPM_CONFIG_PRODUCTION=false
  - heroku addons:create cleardb:ignite
 
Fronted rebuild : ./bin/fronted_build
