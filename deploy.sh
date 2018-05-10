env="test8000"
if [ -n "$1" ]; then env=$1; fi
npm run build
scp ./dist/*.* root@39.106.53.245:/usr/share/nginx/angular5-web/
scp -r ./dist/assets/imgs root@39.106.53.245:/usr/share/nginx/angular5-web/dist/assets/imgs
scp -r ./lib root@39.106.53.245:/usr/share/nginx/angular5-web/
