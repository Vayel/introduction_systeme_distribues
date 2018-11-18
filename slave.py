import os
import sys
import time

import rpyc

from shared import *


def create_connection():
    # sys.argv contient les arguments passés en ligne de commande
    # sys.argv[0] est le nom du script Python exécuté. L'indice
    # du premier argument est donc 1.
    # Un esclave s'exécute de cette manière : `python3 slave.py master_ip master_service_port`
    # Par exemple : `python3 slave.py 192.168.168.1 18861`
    master_addr = sys.argv[1]
    master_port = int(sys.argv[2])
    return rpyc.connect(master_addr, master_port)


def prepare_fruit(id_, fruit, t):
    log_slave(f"1 {fruit} en préparation ({t}s)...", id_)
    time.sleep(t)
    return f"1 {fruit} préparée"


def send_result(conn, task, result):
    conn.root.receive_result(task, result)


def ask_task(conn):
    return conn.root.give_task()


def run(conn):
    # `task` est un couple `(fruit, temps de préparation)`.
    task = ask_task(conn)

    while task:
        id_, fruit, t = task

        log_slave(f"1 {fruit} à préparer reçue", id_, out=False)
        prepared_fruit = prepare_fruit(id_, fruit, t)

        log_slave(f"1 {fruit} prête envoyée", id_, out=True)
        send_result(conn, task, prepared_fruit)

        task = ask_task(conn)


if __name__ == "__main__":
    run(create_connection())
