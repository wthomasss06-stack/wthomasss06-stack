# Mise en place — README de profil GitHub auto-actualisé

Ce système reprend le principe du repo `ajxdevx` fourni en référence : un `README.md` qui n'affiche qu'une image (`dark_mode.svg` / `light_mode.svg`, bascule automatique selon le thème du visiteur), et un script (`today.py`) qui va chercher tes vraies stats GitHub via l'API et les réinjecte dans ces SVG — exécuté automatiquement par une GitHub Action.

## ⚠️ Emplacement obligatoire

Ces fichiers doivent aller dans ton dépôt **spécial de profil**, qui doit s'appeler **exactement** :

```
wthomasss06-stack/wthomasss06-stack
```

(Tu l'as déjà — c'est celui qui contenait l'ancien `README.md`.) C'est le seul nom de repo que GitHub accepte pour l'afficher en haut de ton profil.

## 1. Créer le token d'accès

GitHub → Settings → Developer settings → **Personal access tokens → Fine-grained tokens** → Generate new token.

- **Repository access** : All repositories
- **Account permissions** : Followers (read), Starring (read)
- **Repository permissions** : Commit statuses (read), Contents (read), Issues (read), Metadata (read), Pull requests (read)

Copie le token généré (il ne sera plus jamais affiché).

## 2. Ajouter les secrets sur le repo

Sur `wthomasss06-stack/wthomasss06-stack` → Settings → Secrets and variables → Actions → New repository secret :

| Nom | Valeur |
|---|---|
| `ACCESS_TOKEN` | le token créé à l'étape 1 |
| `USER_NAME` | `wthomasss06-stack` |

## 3. Pousser les fichiers

Structure à respecter (tout est déjà prêt dans ce zip) :

```
wthomasss06-stack/
├── .github/workflows/build.yaml
├── cache/requirements.txt
├── dark_mode.svg
├── light_mode.svg
├── today.py
└── README.md
```

```bash
git add .
git commit -m "Nouveau README dynamique"
git push
```

## 4. Ce qui se passe ensuite

Le workflow tourne automatiquement : à chaque push sur `main`, tous les jours à 4h UTC, et manuellement via l'onglet **Actions → README build → Run workflow**.

À chaque exécution, `today.py` va chercher : nombre de dépôts, dépôts contribués, étoiles, abonnés, commits, lignes de code ajoutées/supprimées — et l'ancienneté du compte GitHub (calculée depuis sa vraie date de création, pas une date en dur). Il met à jour les deux SVG et commit automatiquement.

## État actuel des données dans les SVG livrés

| Champ | Valeur | Source |
|---|---|---|
| Dépôts, Abonnés, Ancienneté du compte | Réels | Récupérés en direct via l'API GitHub publique au moment de la génération |
| Étoiles | 0 (réel) | Idem |
| Commits, Lignes de code, Dépôts contribués | Valeurs de départ (`—`) | Nécessitent le token — se rempliront au premier passage de l'Action |

## Personnalisation

- Bio, stack, liens : en dur dans `dark_mode.svg` / `light_mode.svg` (recherche le texte à modifier directement, ce sont juste des balises `<text>`/`<tspan>`)
- Ne touche pas aux `id="..."` sur les tspans (`age_data`, `repo_data`, `star_data`, `commit_data`, `follower_data`, `contrib_data`, `loc_data`, `loc_add`, `loc_del`, et leurs `_dots`) — c'est par ces ID que `today.py` sait où écrire
