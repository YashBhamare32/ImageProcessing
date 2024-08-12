#!/usr/bin/env bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "ImageProcessing" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS citext;
  CREATE EXTENSION IF NOT EXISTS pgcrypto;
EOSQL