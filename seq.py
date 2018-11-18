import time

from shared import INGREDIENTS


def prepare_seq(ingredients):
    for fruit, t in ingredients:
        print(f"1 {fruit} en préparation ({t}s)...")
        time.sleep(t)
    print("\nLa salade est prête ! Bonne dégustation !")


if __name__ == "__main__":
    print(INGREDIENTS)
    start_time = time.time()
    prepare_seq(INGREDIENTS)
    end_time = time.time()
    print(f"Temps de préparation: {end_time - start_time:.1f}s")
