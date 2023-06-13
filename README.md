#Projet 

[Spécifications P5.pdf](https://github.com/SarahBerri/Kanap/files/10086813/Specifications.P5.pdf)

----

KANAP: Cinquième projet du cursus "DEVELOPPEMENT WEB" chez Openclassrooms : Construisez un site e-commerce en JavaScript.

*How to run the project ?*

This is the front end and back end server for Project 5 of the Web Developer path.

### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

---- 

**SENARIO**

Vous êtes en poste dans une agence de développement web depuis quelques semaines maintenant. Après avoir réalisé avec succès l’intégration de quelques sites web (HTML/CSS), on vous confie une nouvelle mission.

Votre client est Kanap, une marque de canapés qui vend ses produits depuis sa boutique exclusivement. Aujourd’hui, celle-ci souhaiterait avoir une plateforme de e-commerce en plus de sa boutique physique pour vendre ses produits sur Internet.

Dans le cadre de cette mission, vous travaillez avec une équipe constituée de :

Corinne, le CTO de l’agence ;
Frank, le développeur front-end qui s’est chargé d’intégrer la maquette statique du site ;
Bilal, le développeur back-end qui implémente l’API à laquelle est connecté le front-end.
Corinne vous envoie un e-mail pour vous briefer sur la mission :

De : Corinne
À : Vous
Objet : Site e-commerce Kanap 

Hello !

Comme on en a discuté hier, voici les informations pour que tu puisses démarrer l’implémentation du site de Kanap de manière dynamique. 

Voici les différentes tâches que tu vas devoir mener à bien :

Unifier les travaux déjà réalisés par l’équipe en intégrant dynamiquement les éléments de l’API dans les différentes pages web avec JavaScript. Le code du front-end et de l’API est disponible sur ce repo.
Mettre en place un plan de test d’acceptation à partir de ce template que nous avons pour habitude d’utiliser.
Pour plus de précisions, voici les spécifications techniques et fonctionnelles du projet. Tu pourras y trouver tous les détails de celui-ci, les attentes pour chaque page du site web et les détails de l’API. 

N'hésite pas à venir me voir si tu as la moindre question, ma porte est toujours ouverte.

Bonne journée,

Corinne

Un peu plus tard, Frank vous envoie un e-mail pour vous apporter quelques précisions complémentaires sur son travail :

De : Frank
À : Vous
Objet Maquettes statiques du site de Kanap 

Salut,

Visiblement c’est le moment pour toi de rejoindre le projet ! Je viens donc te donner quelques informations sur la partie que j’ai pu réaliser, pour t’aider lors de ton développement.

4 pages ont été mises en place : page d’accueil, page Produit, page Panier et la page Confirmation. Sur l’ensemble des pages, toutes les parties statiques sont en place, elles sont donc prêtes à recevoir le contenu dynamique.

Aussi, sur chaque page, un exemple de la partie dynamique est systématiquement donné ; de cette façon, tu n’as pas à t’occuper de la mise en place de la structure HTML ni du style CSS, tout est déjà fait. Tu n’as plus qu’à t’occuper d’intégrer ces éléments dynamiquement grâce à JS et l’API.

Enfin, dans le code HTML j’ai intégré des “id” dans différentes balises, cela devrait t’aider à intégrer les éléments dynamiques. Avec tout ça, normalement tu n’auras pas besoin de toucher au code HTML/CSS.

Bon développement !

Frank

Ça y est, vous avez toutes les informations pour démarrer votre projet. Bon courage !

----

**COMPÉTANCES ET LIVRABLES**


## Compétances demandées et évaluées 

* Créer un plan de test pour une application

* Valider des données issues de sources externes

* Interagir avec un web service avec JavaScript

* Gérer des événements JavaScript

---- 

## Les livrables 

* Un fichier ZIP contenant le code fonctionnel du site web.

* Un document PDF du plan de test.

---- 

DEUXIEME PASSAGE SOUTENANCE : 

Compétences évaluées

1. Créer un plan de test pour une application

Validé

Commentaires : Plan de tests préalablement validé, bonnes explications sur la méthode employée.

2. Valider des données issues de sources externes

Validé

Commentaires : Tout a été amélioré. Sarah a souhaité ajouter un ou deux messages popup supplémentaires placés de façon judicieuse dans l'application pour améliorer l'expérience utilisateur.

3. Interagir avec un web service avec JavaScript

Validé

Commentaires : Les explications du fonctionnement de fetch et des promesses sont nettement améliorées. Même si c'est encore "frais", Sarah a bien mieux su expliquer le mécanisme.

4. Gérer des événements JavaScript

Validé 

Commentaires : Les probèmes révélés lors de la première version ont été corrigés. Sarah a clairement expliqué les corrections apportées. Le site fonctionne maintenant totalement correctement et de façon sécurisée pour la partie front.

Livrable

Points forts : Le découpage en fonction est toujours présent, cette bonne pratique a été parfaitement intégrée par Sarah. Le code est bien documenté (fourni). La méthode getElementById() a été bien plus utilisée.

Axes d'amélioration : 

- mélange français / anglais et caractères accentués dans les noms des fonctions, il vaut mieux utiliser l'anglais et pas d'accent.
- nom de certaines variables pas explicites, attention à ce qu'il le soit plus
- les expressions régulières sont encore dupliquées mais Sarah a refactorisé son code. Voir à utiliser une fonction qui regrouperait les tests avec les infos à vérifier et les modèles à appliquer passés en arguments.

Soutenance

Remarques : Bien meilleure soutenance de Sarah. Elle a été mieux "structurée", Sarah était plus claire dans ses explications, on sentait mieux la compréhension des mécanismes dans son propos. 

Je "salue" de façon globale les améliorations portées par Sarah sur cette deuxième version du projet.
