#!/usr/bin/env sh

set -e
git add -A
git commit -m "$1"
git push origin master 
curl -X POST "build.yrl.fun/job/front_cloud_zgcfo_front/build?token=yjg" --user admin:build.123
echo '部署成功'
echo '正在构建'
npm run build
rm -rf yjg
mkdir yjg
cd ./dist
tar -czf dist.tar.gz *
mv dist.tar.gz  ../yjg/dist.tar.gz
echo '部署成功'
