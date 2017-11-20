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

Fork database:
  - heroku addons:create cleardb:ignite --fork=`heroku config:get CLEARDB_DATABASE_URL --app cards-production` --app cards-staging
