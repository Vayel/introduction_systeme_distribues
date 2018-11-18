from threading import Lock
import time

import rpyc

from shared import *


def prepare_distributed(ingredients):
    """Retourne un service RPC appelé par les esclaves pour demander du travail
    et notifier des résultats.
    """

    # We add ids to tasks as we may have the same fruit multiple times.
    # It will make it easier to debug.
    tasks_to_do = [(i, *ingredient) for i, ingredient in enumerate(ingredients)]
    tasks_being_done = []

    # On crée un verrou commun pour tous les threads attribués
    # aux clients.
    lock = Lock()

    start_time = None

    class MasterService(rpyc.Service):
        def exposed_receive_result(self, task, result):
            log_master(f"{result} reçu(e)", task[0], out=False)

            with lock:
                tasks_being_done.remove(task)
                # Le résultat n'est pas très important dans notre exemple, mais
                # en pratique il faudrait bien entendu le stocker.

            if not tasks_to_do and not tasks_being_done:
                end_time = time.time()
                print("\nLa salade est prête ! Bonne dégustation !")
                print(f"Temps de préparation : {end_time - start_time:.1f}s.")

        def exposed_give_task(self):
            nonlocal start_time
            if start_time is None:
                start_time = time.time()

            try:
                with lock:
                    task = tasks_to_do.pop()
            except IndexError:
                # Il n'y a plus de tâche en attente, on avertit l'esclave.
                task = None
            else:
                with lock:
                    tasks_being_done.append(task)
                id_, fruit, _ = task
                log_master(f"1 {fruit} envoyé(e) à la préparation", id_, out=True)
            return task
    return MasterService


if __name__ == "__main__":
    import sys
    from rpyc.utils.server import ThreadedServer

    INGREDIENTS = [
        ("pomme", 3),
        ("pomme", 3),
        ("pomme", 3),
        ("fraise", 1),
        ("fraise", 1),
        ("banane", 2),
        ("banane", 2),
        ("mangue", 4),
        ("orange", 4),
        ("orange", 4),
        ("kiwi", 3),
        ("kiwi", 3),
        ("kiwi", 3),
    ]
    service = prepare_distributed(INGREDIENTS)

    port = int(sys.argv[1])
    server = ThreadedServer(service, port=port)
    print(f"Le maître est accessible à {server.host}:{server.port}.", end="\n\n")
    server.start()
