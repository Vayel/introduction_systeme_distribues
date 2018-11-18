from threading import Timer, Lock
import time

import rpyc

from shared import *


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
        log_master(
            f"remet la {task[1]} dans le panier à préparer",
            task[0],
            WORKING_LABEL
        )
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

    start_time = None

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

            tasks_being_done_formatted = [
                f"{task[1]} (T-{task[0]})"
                for task in tasks_being_done
            ]
            if not tasks_being_done_formatted:
                tasks_being_done_formatted = ["rien"]
            log_master(
                f"{result} reçue. En cours : {', '.join(tasks_being_done_formatted)}",
                task[0],
                IN_LABEL,
            )

            if not tasks_to_do and not tasks_being_done:
                end_time = time.time()
                print("\nLa salade est prête ! Bonne dégustation !")
                print(f"Temps de préparation : {end_time - start_time:.1f}s")

        def exposed_give_task(self):
            nonlocal start_time
            if start_time is None:
                start_time = time.time()

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
                log_master(f"1 {fruit} envoyée à la préparation", id_, OUT_LABEL)
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
    run_master(prepare_distributed)
