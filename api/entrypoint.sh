#!/bin/sh

set -ex

until nc -z -v -w30 "$DATABASE_HOST" "$DATABASE_PORT"; do
  echo "Waiting for database connection..."
  sleep 5
done

node ../node_modules/typeorm/cli.js migration:run -d ormconfig.js

exec "$@"
