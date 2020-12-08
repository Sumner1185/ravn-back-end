#! /bin/bash

brew install postgresql
brew services stop postgresql
brew postgresql-upgrade-database
brew services start postgresql
createdb
psql -f create-user.sql
psql -d postgres -U me -f configure-db.sql
