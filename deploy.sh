env="test8000"
if [ -n "$1" ]; then env=$1; fi
npm run build
scp -r ./dist/\/^(?!video)\/ root@39.106.53.245:/usr/share/nginx/angular5-web/
scp -r ./lib/\/^(?!video)\/ root@39.106.53.245:/usr/share/nginx/angular5-web/

