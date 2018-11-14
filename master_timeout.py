from threading import Timer, Lock
import time

import rpyc


def pending_to_free(task, pending_list, free_list, lock):
    """Déplace une tâche en cours d'exécution dans la pile des tâches à exécuter.
    Cette fonction est appelée quand l'esclave en charge de la tâche n'a pas donné
    signe de vie pendant un certain temps.
    """
    try:
        # En Python, les listes ne sont pas copiées quand elles sont passées en
        # paramètre, donc l'instruction ci-dessous modifie bien la liste lue par
        # le maître.
        with lock:
            pending_list.remove(task)
        print(f"[MAITRE]: déplace {task} dans la pile « à faire ».")
    except ValueError:
        # La tâche n'est déjà plus dans la liste, on ne fait rien.
        pass
    else:
        with lock:
            free_list.append(task)


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
    timeout = max((x[1] for x in ingredients)) + 2

    start_time = time.time()

    class MasterService(rpyc.Service):
        def exposed_receive_result(self, task, result):
            with lock:
                try:
                    tasks_being_done.remove(task)
                except ValueError:
                    # On rentre ici si le délai a été atteint alors que
                    # l'esclave est toujours en vie et répond en retard. Dans ce
                    # cas, sa tâche a été redistribuée donc on ne fait rien.
                    return

            print(f"[MAITRE] < {result} reçu(e) (task {task[0]}). En cours : {tasks_being_done}")

            if not tasks_to_do and not tasks_being_done:
                end_time = time.time()
                print("\nLa salade est prête ! Bonne dégustation !")
                print(f"Temps de préparation : {end_time - start_time:.1f}s.")

        def exposed_give_task(self):
            try:
                with lock:
                    task = tasks_to_do.pop()
            except IndexError:
                if not tasks_being_done:
                    # Il n'y aura plus de tâche à faire, l'esclave peut terminer.
                    task = None
                else:
                    # Il n'y a pas de tâche disponible pour le moment mais il
                    # pourra y en avoir dans le futur.
                    task = tuple()
            else:
                with lock:
                    tasks_being_done.append(task)
                id_, fruit, _ = task
                print(f"[MAITRE] > 1 {fruit} (id={id_}) envoyé(e) à la préparation.")
                # On lance un décompte en parallèle. La fonction `pending_to_free`
                # sera appelée avec les arguments `args` dans `timeout` secondes.
                # Si l'esclave a retourné le résultat d'ici là, la tâche aura déjà été
                # enlevée de la liste par `exposed_receive_result` et l'appel
                # à la fonction n'aura aucun effet.
                Timer(
                    timeout,
                    pending_to_free,
                    args=(task, tasks_being_done, tasks_to_do, lock)
                ).start()

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
