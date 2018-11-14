import os
import sys
import time

import rpyc

SLAVE_ID = os.getpid()


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
    print(f"[{SLAVE_ID}]: 1 {fruit} (id={id_}) en préparation ({t}s)...")
    time.sleep(t)
    return f"1 {fruit} préparé(e)"


def send_result(conn, task, result):
    conn.root.receive_result(task, result)


def ask_task(conn):
    return conn.root.give_task()


def run(conn):
    # `task` est un couple `(fruit, temps de préparation)`.
    task = ask_task(conn)

    while task:
        id_, fruit, t = task

        print(f"[{SLAVE_ID}] < 1 {fruit} (id={id_}) à préparer.")
        prepared_fruit = prepare_fruit(id_, fruit, t)

        print(f"[{SLAVE_ID}] > 1 {fruit} (id={id_}) prêt(e).")
        send_result(conn, task, prepared_fruit)

        task = ask_task(conn)


if __name__ == "__main__":
    run(create_connection())
