cd ~/lern-react
npm run build:prod

rm -rf ~/../var/www/production_project/html
mv ~/lern-react/build ~/../var/www/production_project/html
