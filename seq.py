import time


def prepare_seq(ingredients):
    for fruit, t in ingredients:
        print(f"1 {fruit} en préparation ({t}s)...")
        time.sleep(t)
    print("\nLa salade est prête ! Bonne dégustation !")


if __name__ == "__main__":
    # Une liste d'ingrédients. Chaque ingrédient est un couple
    # (nom, temps de préparation en secondes). Les temps inscrits ici ne
    # sont pas réalistes.
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
    start_time = time.time()
    prepare_seq(INGREDIENTS)
    end_time = time.time()
    print(f"Temps de préparation: {end_time - start_time:.1f}s")
