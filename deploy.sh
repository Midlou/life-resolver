composer install --no-interaction --prefer-dist --optimize-autoloader;

php artisan config:cache;
php artisan route:cache;
php artisan migrate;
php artisan view:cache;

npm install
npm run production
