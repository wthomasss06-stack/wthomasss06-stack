# Mise en place — README de profil GitHub

Pas de GitHub Action, pas de token, pas de script à faire tourner. Trois pièces :

1. **`dark_mode.svg` / `light_mode.svg`** — ta carte perso (bio, contact, stack en icônes). Statique : tu la modifies à la main quand ton infos change (rare).
2. **Le badge stats** dans `README.md` — image hébergée par `github-readme-stats.vercel.app`, générée à la volée à chaque chargement de ton profil. Toujours à jour tout seul, aucune maintenance.
3. **La courbe de contribution** dans `README.md` — image hébergée par `github-readme-activity-graph.vercel.app`, même principe que le badge stats : générée à la volée, zéro maintenance.

## Emplacement obligatoire

Dépôt qui doit s'appeler **exactement** :
```
wthomasss06-stack/wthomasss06-stack
```
(tu l'as déjà)

## Mise en ligne

```bash
git add .
git commit -m "Nouveau README"
git push
```

C'est tout. Pas de secret à configurer.

## Limite à connaître

Le badge stats et la courbe de contribution utilisent tous les deux l'instance publique et gratuite de leurs services respectifs — ils ne comptent que ton activité sur les **dépôts publics** (pas les repos privés clients type Nexura). Si un jour tu veux inclure le privé, ça demande un token + une instance perso — dis-le-moi si tu veux qu'on mette ça en place plus tard, mais pour l'instant j'ai gardé zéro-config comme demandé.

## Personnaliser la carte

Tout le texte (bio, contact, tarifs, stack) est dans `dark_mode.svg` / `light_mode.svg`, en clair dans des balises `<text>`/`<tspan>` — cherche/remplace directement dedans.
