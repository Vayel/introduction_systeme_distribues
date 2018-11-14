#!/bin/bash

CRASH=1
MASTER_HOST=localhost
MASTER_PORT=18861

python slave_crash.py $MASTER_HOST $MASTER_PORT $CRASH &
python slave_crash.py $MASTER_HOST $MASTER_PORT $CRASH &
python slave_crash.py $MASTER_HOST $MASTER_PORT $CRASH &
wait
