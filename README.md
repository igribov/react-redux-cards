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
Add two remote links from heroku git repos

  - heroku buildpacks:add heroku/nodejs --app cards-production
  - heroku buildpacks:add heroku/php --app cards-production
  - heroku config:set NPM_CONFIG_PRODUCTION=false --app cards-production
  - heroku addons:create cleardb:ignite --app cards-production
  - heroku config:set HEROKU_URL=$(heroku info -s | grep web_url | cut -d= -f2) --app cards-production
  
  - heroku buildpacks:add heroku/nodejs --app cards-staging
  - heroku buildpacks:add heroku/php --app cards-staging
  - heroku config:set NPM_CONFIG_PRODUCTION=false --app cards-staging
  - heroku addons:create cleardb:ignite --app cards-staging
  - heroku config:set HEROKU_URL=$(heroku info -s | grep web_url | cut -d= -f2) --app cards-staging
 
Fronted rebuild : ./bin/fronted_build
