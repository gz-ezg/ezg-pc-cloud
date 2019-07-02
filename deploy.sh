#!/usr/bin/env sh

set -e
 echo $1
git add -A
git commit -m "$1"
git push origin master
echo '正在构建'
curl -X POST "build.yrl.fun/job/front_cloud_zgcfo_front/build?token=yjg" --user admin:build.123
echo '部署成功'

