import time
from threading import Thread, Lock

N = 1000000
i = 0


def incr():
    # Cette fonction incrémente `N` fois la variable globale `i`.
    global i
    for _ in range(N):
        i += 1


def incr_with_lock(lock):
    global i
    for _ in range(N):
        # On utilise le verrou le moins longtemps possible pour ne pas bloquer
        # excessivement les autres threads. C'est pourquoi la ressource est
        # réservée dans la boucle et non pas à l'extérieur.
        with lock:
            i += 1


def run(t1, t2):
    start = time.time()
    # Les méthodes `t1.run()` et `t2.run()` sont exécutées en parallèle.
    # Elles vont chacune incrémenter `i` en parallèle.
    t1.start()
    t2.start()
    # On attend que `t1` et `t2` terminent, c'est-à-dire qu'ils aient chacun
    # incrémenté `i` `N` fois.
    t1.join()
    t2.join()
    end = time.time()
    # Comme `i` a en théorie été incrémentée `N` fois par chacun des threads,
    # on s'attend à ce qu'elle soit égale à `2N`.
    print(f"    {end - start:.2f} secondes")
    print(f"    2N - i = {2*N-i}")


if __name__ == "__main__":
    print("Un seul thread :")
    i = 0
    incr()
    print("    N - i =", N-i)

    print("\nDeux threads (sans exclusion mutuelle) :")
    i = 0
    run(Thread(target=incr), Thread(target=incr))

    print("\nDeux threads (avec exclusion mutuelle) :")
    # Nous définissons un seul verrou que nous partageons entre les threads.
    lock = Lock()
    i = 0
    run(
        Thread(target=incr_with_lock, args=(lock,)),
        Thread(target=incr_with_lock, args=(lock,)),
    )
