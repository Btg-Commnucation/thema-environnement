# Thema environnement

Ceci est le dépôt pour la partie Front End du site [Thema environnement]

## Disclaimer

Dans ce document, nous ne parlerons que de la partie Front End du site et non du Back End. Si vous
avez besoin d'information à props de la partie Back End, je vous invite à vous référer au document
sur le serveur interne de [BTG Communication]

## Dependencies

Pour pouvoir travailler sur le projet, vous aurez besoin de [Bun](https://bun.sh) pour pouvoir installer les 
différentes dépendances du projet. Une fois que vous aurez installé Bun, vous pourrez installer les dépendances.
Vous trouverez l'ensemble des dépendances dans le fichier `package.json` à la racine du projet.

## Installation

Afin de faire fonctionner le projet, vous aurez besoin d'installer les dépendances. Pour cela, il vous suffit 
d'utilisation la commande suivante :
Notez que pour le fonctionnement du projet en mode développement, vous aurez besoin d'un fichier `.env` à la racine
du projet. Une variable `VITE_URL_API` avec le lien vers l'API de l'administration du site est nécessaire.
```bash
bun install
```
Une fois cela effectué, vous pourrez lancer le projet en utilisant la commande suivante :

```bash
bun run dev
```
Ce qui vous permettra de voir le site sur l'adresse suivante : `http://localhost:5173`

Afin de générer les fichiers de production, vous pouvez utiliser la commande suivante :

```bash
bun run build
```

Ce qui génèrera les fichiers dans le dossier `dist` à la racine du projet.

## Structure du projet

Le projet est structuré de la manière suivante :

```bash
@/
├── components
├── lib
├── middleware
├── routes
└── store
```

## Mettre le projet en ligne

Avant de construire le projet, il vous faudra modifier la variable `API_URL` dans la partie de GitHub Actions

Afin de déployer le projet, vous aurez besoin d'un dossier `dist` à la racine du projet. Pour cela, vous pouvez
utiliser la commande suivante :

```bash
bun run build
```

Après cela, il vous suffit de mettre le projet à la racine de votre FTP puis de faire pointer le serveur vers le 
dossier de `dist`.


[Thema environnement]: (https://thema-environnement.fr)
[BTG Communication]: (https://www.btg-communication.fr)
