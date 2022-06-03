<p align="center"><a href="" target="_blank">
<img src="resources/angular/src/assets/logo.svg" width="120"/></a></p>

## About Print Test

This is an project developed to show my skills usign Laravel and Angular, the following steps are useful to make the application runs on localhost:

## Get started

First of all, make sure your postgres database is active. After this run:

- composer update
- composer install
- php artisan key:generate
- php artisan migrate --seed
- php artisan passport:install
- php artisan serve

After this the API is ready to use, but the angular app needs to synchroniza with the passport id to works with auth.

## Initializing Angular app

- cd resources/angular
- npm install

Before serve the application you need to get oauth client secket with id 2 in the php terminal returned after execute "php artisan passport:install" and put it in resources\angular\src\app\services\auth.service.ts at the login function client secret property.

- ng serve

## Usage

The first screen is an basic authentication, you can access as Bob or his manager using one of the emails 'bob@print.com' or 'manager@print.com' followed by password 'print2132'

After this you're redirected to the main page and you can start to create some categories.