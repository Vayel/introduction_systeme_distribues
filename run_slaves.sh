#!/bin/bash

MASTER_HOST=localhost
MASTER_PORT=18861

python slave.py $MASTER_HOST $MASTER_PORT &
python slave.py $MASTER_HOST $MASTER_PORT &
python slave.py $MASTER_HOST $MASTER_PORT &
wait
