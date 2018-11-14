# Introduction aux systèmes distribués

Code source pour [Introduction aux systèmes distribués](https://zestedesavoir.com/contenus/2238/introduction-aux-systemes-distribues/)
sur Zeste de Savoir.

## Installation

Le code nécessite **Python 3.6+**.

```bash
python -V
```

```bash
git clone https://github.com/Vayel/introduction_systeme_distribues
cd introduction_systeme_distribues
pip install --user rpyc
```

## Reproduire les exemples

Ci-dessous sont listées les commandes à exécuter pour reproduire les exemples
fournis dans le tutoriel.

### Une implémentation en Python 

```bash
python master.py 18861
```

```bash
./run_slaves.sh
```

### Alerte générale ! Une panne ! 

#### Observation d’une panne

```bash
python master_crash.py 18861
```

```bash
./run_slaves_crash_all.sh
# Ou :
# ./run_slaves_crash.sh
```

#### Un code robuste aux pannes

```bash
python master_timeout.py 18861
```

```bash
./run_slaves_crash.sh
```
