import datetime as dt
import os


def log(msg, agent, task):
    now = dt.datetime.now().strftime("%M:%S.%f")
    print(f"[{now}][{agent}][T-{task:02d}] {msg}")


def log_master(msg, task):
    log(msg, "MAITRE", task)


def log_slave(msg, task):
    log(msg, f"S-{os.getpid()}", task)
