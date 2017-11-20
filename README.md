cards react simple application with service worker and Indexed DB
==============================

A Symfony project created on October 9, 2017, 7:23 am.
1) Composer required for deploy
2) NodeJS and NPM required for frontend build

Deploy on localhost:
 - git clone https://gitlab.com/gribov/cards.git
 - cd cards
 - composer install
 - bin/console server:start
 - cd frontend && npm install
 - npm run dev
 - then go to http://localhost:9000
 - API was on https://localhost:8000
 - You can change server status https://localhost:8000/server/

If you want develop only frontend:
- git clone https://gitlab.com/gribov/cards.git
- npm run dev_heroku (use API: https://cards-staging.herokuapp.com/api/)

You can change server status:
- https://cards-staging.herokuapp.com/server/ or https://localhost:8000/server/
