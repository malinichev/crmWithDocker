mkdir ~/../var/www/production_project
mkdir ~/../var/www/production_project/html

cd ~/crmWithDocker
echo "DB_NAME=site_with_admin
DB_USER=postgres
DB_PASSWORD=
DB_HOST=postgres
DB_PORT=5432
URL=87.228.26.154

JWT_ACCESS_SECRET=JWT ACCESS SECRET WORD MALINI4
JWT_REFRESH_SECRET=JWT REFRESH SECRET WORD MALINI4

SMTP_HOST=smtp.yandex.ru
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=" > .env

cd ~/crmWithDocker/admin
npm i --legacy-peer-deps
