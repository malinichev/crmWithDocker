cd ~/crmWithDocker/admin
npm run build:prod

rm -rf ~/../var/www/production_project/html
mv ~/crmWithDocker/admin/build ~/../var/www/production_project/html

