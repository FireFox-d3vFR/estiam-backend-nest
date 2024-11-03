# Projet Backend FullStack avec Nest.js

@FireFox-d3vFR (Jonathan <b>MAQUENHEM</b>), @Vincentfrg (Vincent <b>FERRAG</b>)

---

## Description du projet

Ce projet est une <b>API REST</b> construite avec <b>Nest.js</b>, qui s'appuie sur <b>PostgreSQL</b> pour la gestion des données et l'ORM <b>Drizzle</b> pour gérer le schéma de la base de donnéees. Il est conçu pour être facilement déployé et testé grâce à <b>Docker</b> et <b>Docker Compose</b>. Cette API permet de gérer des utilisateurs et des données associées via des endpoints sécurisés et documentés avec <b>Swagger</b>.

## Fonctionnalités principales

- Création et gestion des utilisateurs, incluant les rôles et les profils associés.
- Connexion sécurisée à une base de données PostgreSQL avec Drizzle pour la gestion des migrations et du schéma.
- Documentation des endpoints avec Swagger, facilitant l'interaction et la validation des données envoyées à l'API.

## Debrief Technique
### Problèmes rencontrés et solutions

<b>Configuration Docker :</b>

- Problème : Assurer que PostgreSQL démarre et se connecte sans erreurs dans le conteneur.
- Solution : Création d'un fichier `docker-compose.yml` avec les bonnes variables d'environnement, vérification de la connectivité entre les services.

<b>ORM Drizzle et migration :</b>

- Problème : Configurer Drizzle pour gérer les migrations de manière cohérente avec le schéma attendu.
- Solution : Utilisation de Drizzle Studio pour visualiser les tables et application des migrations avec `npx drizzle-kit migrate`.

<b>Documentation Swagger :</b>

- Problème : Définir les spécifications de chaque endpoint pour fournir une documentation complète.
- Solution : Utilisation de Swagger pour décrire chaque endpoint avec les types de données, les status HTTP et la sécurité requise.

### Informations techniques complémentaires

La structure de l'API suit un découpage en modules pour chaque fonctionnalité, afin d'assurer la clarté et la maintenabilité du code.

## Installation et mise en place de l'environnement de développement

Pour exécuter ce projet, suivez les étapes ci-dessous :

1. Cloner le dépôt :

```
git clone <URL_DU_DEPOT>
cd estiam-backend-nest
```

2. Configurer les variables d'environnement :
- Copier le fichier `.env.example` en `.env` :

```
cp .env.example .env
```
- Modifier les valeurs pour `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` et `DB_NAME`.

3. Démarrer Docker et PostgreSQL :
- Assurez-vous que Docker Desktop est lancé, puis exécutez :

```
docker-compose up -d
```

Cette commande démarre le conteneur PostgreSQL.

4. Exécuter les migrations :

```
npx drizzle-kit migrate
```

Cette commande synchronise la base de données avec le schéma défini par Drizzle.

5. Construire et démarrer l'application :
- Pour construire l'application :

```
npm run build
```

- Pour la lancer en mode production :
```
npm run start
```

6. Accéder à la documentation Swagger :

[ A COMPLETER ]

