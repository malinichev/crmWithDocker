#!/bin/bash

# Параметры подключения к базе данных
PGHOST=${PGHOST}
PGPORT=${PGPORT}
PGUSER=${PGUSER}
PGPASSWORD=${PGPASSWORD}
PGDATABASE=${PGDATABASE}
BACKUP_FILE=${BACKUP_FILE}

if [ $BACKUP_FILE ]; then
 # Выполнить восстановление
  PGPASSWORD=$PGPASSWORD psql -c -v ON_ERROR_STOP=1 -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE -f $BACKUP_FILE
# PGPASSWORD=$PGPASSWORD pg_restore -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE -f $BACKUP_FILE
else
  echo "Restore failed"
fi


