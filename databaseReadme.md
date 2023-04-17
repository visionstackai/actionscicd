Sample dvd rental database
https://www.postgresqltutorial.com/postgresql-getting-started/postgresql-sample-database/

postgres database install
https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql-macos/

This will install psql, pg_dump and a whole bunch of other client utilities without installing Postgres.
brew install libpq
echo 'export PATH="/opt/homebrew/opt/libpq/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
export LDFLAGS="-L/opt/homebrew/opt/libpq/lib"
export CPPFLAGS="-I/opt/homebrew/opt/libpq/include"


Connect to database
psql -h localhost -p 5432 -U postgres
\l to list all databases
\c pricing
CREATE TABLE IF NOT EXISTS sku (sku INT, retailprice INT);
INSERT INTO sku (sku,retailprice) values (1234567, 5000.0);


Install yugabyte voyager
https://docs.yugabyte.com/preview/migrate/install-yb-voyager/#install-yb-voyager
brew tap yugabyte/yugabytedb
brew install yb-voyager
yb-voyager version

https://docs.yugabyte.com/preview/migrate/migrate-steps/
postgresql migration steps

Create a database user and provide the user with READ access to all the resources which need to be migrated. Run the following commands in a psql session:
CREATE USER ybvoyager PASSWORD 'test123';
Switch to the database that you want to migrate.
\c <database_name>

SELECT 'GRANT USAGE ON SCHEMA ' || schema_name || ' TO ybvoyager;' FROM information_schema.schemata; \gexec



Connect to yugabytedb via shell
curl -sSL https://downloads.yugabyte.com/get_clients.sh | bash


./ysqlsh "host=us-west1.9ce72152-f021-4784-8e57-6e7b36e01cea.gcp.ybdb.io \
user=admin \
dbname=yugabyte \
sslmode=verify-full \
sslrootcert=/Users/krithianika/Documents/GitHub/postgresql/yugabyte-simple-node-app/root.crt"


Yugabyte migrate
https://docs.yugabyte.com/preview/migrate/

CREATE DATABASE target_dvd_rental

\c target_dvd_rental

CREATE USER ybvoyager PASSWORD 'yKriani12!@';
GRANT yb_superuser TO ybvoyager;

Deleting the ybvoyager user

After migration, all the migrated objects (tables, views, and so on) are owned by the ybvoyager user. You should transfer the ownership of the objects to some other user (for example, yugabyte) and then delete the ybvoyager user. Example steps to delete the user are:

REASSIGN OWNED BY ybvoyager TO yugabyte;
DROP OWNED BY ybvoyager;
DROP USER ybvoyager;

yb-voyager export schema --export-dir /Users/krithianika/Documents/GitHub/postgresql/export_dir \
--source-db-type postgresql \
--source-db-host localhost \
--source-db-user postgres \
--source-db-password test123 \
--source-db-name dvdrental \
--source-db-schema public \
--start-clean

yb-voyager analyze-schema --export-dir $EXPORT_DIR --output-format txt

With our schema exported successfully, it’s time to export our data.
yb-voyager export data --export-dir $EXPORT_DIR \
       --source-db-type postgresql \
       --source-db-host localhost \
       --source-db-user postgres \
       --source-db-password test123 \
       --source-db-name dvdrental \
       --source-db-schema public

We’re halfway there. Now we can import the schema and data to our YugabyteDB Managed instance. You’ll need to make note of your connection details in the cloud console and download the credentials.

Start by importing the schema from our export directory.

yb-voyager import schema --export-dir $EXPORT_DIR \
       --target-db-host us-west1.9ce72152-f021-4784-8e57-6e7b36e01cea.gcp.ybdb.io  \
       --target-db-user admin \
       --target-db-password 'yKriani12!@' \
       --target-db-name target_dvd_rental \
       --target-db-schema public

YugabyteDB Voyager has successfully taken the schema, which we’ve exported to the export directory on our machine and created the same tables in YugabyteDB Managed.

Next, import the data from our export directory.

yb-voyager import data --export-dir $EXPORT_DIR \
       --target-db-host us-west1.9ce72152-f021-4784-8e57-6e7b36e01cea.gcp.ybdb.io \
       --target-db-user admin \
       --target-db-password 'yKriani12!@' \
       --target-db-name target_dvd_rental \
       --target-db-schema public

As you can see in the output, YugabyteDB Voyager handles this data import with parallelism, making quick work of it.

To wrap things up, import indexes and triggers.


yb-voyager import schema --export-dir $EXPORT_DIR \
       --target-db-host us-west1.9ce72152-f021-4784-8e57-6e7b36e01cea.gcp.ybdb.io \
       --target-db-user admin \
       --target-db-password 'yKriani12!@' \
       --target-db-name target_dvd_rental \
       --target-db-schema public \
       --post-import-data

https://www.yugabyte.com/blog/migrate-node-js-postgresql-yugabytedb-voyager/