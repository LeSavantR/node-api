#!/usr/bin/sh

docker run -d -p 3306:3306 -p 33060:33060 --mount source=mysqlVol,target=/var/lib/mysql --rm -e MYSQL_ROOT_PASSWORD=secret --name mysql mysql:8.0-debian

# docker run -d -p 8080:8978 -v /var/cloudbeaver/workspace:/opt/cloudbeaver/workspace --rm --name dbeaver dbeaver/cloudbeaver:23.2.0
