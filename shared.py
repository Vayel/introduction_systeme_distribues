import datetime as dt
from random import shuffle
import os


IN_LABEL = "IN"
OUT_LABEL = "OUT"
WORKING_LABEL = "WORKING"
ERROR_LABEL = "ERROR"


# Une liste d'ingrédients. Chaque ingrédient est un couple
# (nom, temps de préparation en secondes). Les temps inscrits ici ne
# sont pas réalistes.
INGREDIENTS = [
    ("pomme", 3),
    ("pomme", 3),
    ("poire", 2),
    ("poire", 2),
    ("banane", 2),
    ("banane", 2),
    ("cerise", 1),
    ("cerise", 1),
    ("pêche", 3),
    ("pêche", 3),
    ("pastèque", 4),
]
shuffle(INGREDIENTS)


def log(agent, msg, task, label):
    now = dt.datetime.now().timestamp()
    print(f"[{now}][{agent}][T-{task:02d}][{label}] {msg}")


def log_master(*args, **kwargs):
    log("MAITRE", *args, **kwargs)


def log_slave(*args, **kwargs):
    log(f"E-{os.getpid()}", *args, **kwargs)


def run_master(service_factory):
    import sys
    from rpyc.utils.server import ThreadedServer
    
    service = service_factory(INGREDIENTS)

    port = int(sys.argv[1])
    server = ThreadedServer(service, port=port)
    print(f"Le maître est accessible à {server.host}:{server.port}.", end="\n\n")
    server.start()
