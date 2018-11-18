import datetime as dt
import os


def log(agent, msg, task, out=None):
    now = dt.datetime.now().timestamp()
    if out is None:
        direction = ""
    elif out:
        direction = "OUT"
    else:
        direction = "IN"
    print(f"[{now}][{agent}][T-{task:02d}][{direction}] {msg}")


def log_master(*args, **kwargs):
    log("MAITRE", *args, **kwargs)


def log_slave(*args, **kwargs):
    log(f"E-{os.getpid()}", *args, **kwargs)
