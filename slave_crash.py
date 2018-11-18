import os
import random
import sys
import time

import rpyc

from shared import *

CRASH_PROB = 0.6


def create_connection():
    master_addr = sys.argv[1]
    master_port = int(sys.argv[2])
    return rpyc.connect(master_addr, master_port)


def prepare_fruit(id_, fruit, t):
    log_slave(f"1 {fruit} en préparation ({t}s)", id_, WORKING_LABEL)
    time.sleep(t)
    return f"1 {fruit} préparée"


def send_result(conn, task, result):
    conn.root.receive_result(task, result)


def ask_task(conn):
    return conn.root.give_task()


def may_crash():
    try:
        return bool(sys.argv[3])
    except IndexError:
        return False


def run(conn):
    # `task` est un couple `(fruit, temps de préparation)`.
    task = ask_task(conn)
    may_crash_ = may_crash()

    while task:
        id_, fruit, t = task
        log_slave(f"1 {fruit} à préparer reçue", id_, IN_LABEL)
        prepared_fruit = prepare_fruit(id_, fruit, t)

        if may_crash_ and random.random() < CRASH_PROB:
            log_slave(f"alerte, une panne ! 1 {fruit} en préparation", id_, ERROR_LABEL)
            break

        log_slave(f"1 {fruit} prête envoyée", id_, OUT_LABEL)
        send_result(conn, task, prepared_fruit)
        task = ask_task(conn)


if __name__ == "__main__":
    run(create_connection())
