/*********************************** PARTIE CART *************************************/

//On souhaite récupérer un objet, on va du coup
//....faire un array du total du cart
const cart = [];

//Récupération des items du cache (stockage)
retrieveLocalStorage();

//Affichage des produits sur la page d'acceuil
cart.forEach((item) => {
  /// Permet de faire du JS de façon asynchrone : demande de recherche de donnée
// URL de l'API appelé, on lui passe aussi la variable de récupération de l'item.id (le canapé)
  fetch(`http://localhost:3000/api/products/${item.id}`)
  // .then : récupère une promesse, qui va nous donner des données, (une réponse : ((res))
    .then((res) => res.json())
    .then((data) => {
      //Affichage et récupération des produits via la fonction "showItem" + les arguments Item et id
      showItem(item, data);
    });
});

//Récupération des items issu du LocalStorage
function retrieveLocalStorage() {
  //Loop pour itérer sur toutes les clés du localStorage et
  for (let i = 0; i < localStorage.length; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || "";
    //...on en fait un objet avec JSON.parse
    const itemArray = JSON.parse(item);
    //..on le push : retourner la nouvelle taille du tableau
    cart.push(itemArray);
  }
}

// Affichage des articles
function showArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}

/*********** AFFICHAGE DU PRODUIT ***********/
//Afficher l'objet
function showItem(item, data) {
  //On fait un article
  const article = generateArticle(item);
  //Insertion de la div de l'image
  const divOfImage = generateImageDiv(item);
  //Appender la div de l'image à l'article
  article.appendChild(divOfImage);
  // Insertion du content de la description du produit
  const cardItemContent = generateCartContent(item, data);
  article.appendChild(cardItemContent);

  //Récupération des fonctions de l'article, prix total + quantité
  showArticle(article);
  showTotalPrice();
  showTotalQuantity();
}


/******** MISE EN PLACE DE L'ARTICLE ********/
// On met en place l'article
function generateArticle(item) {
  //Utilisation de createElement pour récupérer l'élément 'article'
  const article = document.createElement("article");
  //Récupération de la class de l'élément
  article.classList.add("card__item");
  //Ajout des attributs à l'élément HTML avec dataset
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}

/******** RECUPERATION DE LA DIV DE L'IMAGE ********/
//Récupération de l'image issue de la div (code HTML)
function generateImageDiv(item) {
  //Utilisation de createElement pour récupérer l'élément 'div'
  const divImg = document.createElement("div");
  //Récupération de la class de l'élément
  divImg.classList.add("cart__item__img");

  const img = document.createElement("img");

  //Récupération des attribut altTxt et ImageUrl des produits
  img.src = item.imageUrl;
  img.alt = item.altTxt;

  divImg.appendChild(img);

  return divImg;
}

/****** CONTENT DE L'ARTICLE (PRIX, NOM DU PRODUIT, PRIX) ******/
// Récupération de la div: "cart_content"
function generateCartContent(item, data) {
  // Insertion de la div du content
  const itemContent = document.createElement("div");
  itemContent.classList.add("cart__item__content");

  // On créer les constantes pour les paramètres et de la description
  const description = generateDescription(item, data);
  const settings = generateSettingsOfProducts(item);

  //Appender les éléments description et setting
  itemContent.appendChild(description);
  itemContent.appendChild(settings);

  return itemContent;
}

/******** DESCRIPTION *******/
// Création des spécifités des canapés qui s'afficheront
function generateDescription(item, data) {
  //On lui créer sa div
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");

  // On lui insert le titre
  const h2 = document.createElement("h2");
  h2.textContent = item.name;

  // On lui insert le paragrahpe
  const p = document.createElement("p");
  p.textContent = item.color;

  // On lui insert le "paragraphe" du prix
  const paragOfPrice = document.createElement("p");
  paragOfPrice.textContent = data.price + " €";

  // On appende tout les éléments
  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(paragOfPrice);

  return description;
}

/******** PARAMETRES DE L'ARTICLE SELECTIONNE *******/
// Fonction pour appeler les paramètres de l'article (suppression, quantité)
function generateSettingsOfProducts(item) {
  //Insertion div
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  const quantitySettings = addQuantitySettings(item);
  const deleteSettings = addDeleteSettings(item);

  settings.appendChild(quantitySettings);
  settings.appendChild(deleteSettings);

  return settings;
}

/******** RECUPERATION DE LA QUANTITE *******/
// Récupération de la quantité
function addQuantitySettings(item) {
  //Récupération de la div
  const quantitySettings = document.createElement("div");
  //Ajout de sa classe
  quantitySettings.classList.add("cart__item__content__settings__quantity");

  //Ajout du p (de la quantité)
  const quantity = document.createElement("quantity");
  quantity.textContent = " Qté : ";

  // Insertion de l'élément "input"
  const input = document.createElement("input");

  //Ajout des spécifités relatives à l'input(type, name, value, min, max ...)
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;
  //Ecouter au click l'ajustement prix / quantité dans le panier
  input.addEventListener("change", () =>
    changeQuantityAndPrice(item.id, item, input.value)
  );
  //Append l'enfant au parent
  quantitySettings.appendChild(quantity);
  quantitySettings.appendChild(input);

  return quantitySettings;
}


/******** UPDATER LE PRIX ET LA QUANTITE *******/
//Quand au click on augmente ou diminue la quantité, on récupère la nouvelle valeur
function changeQuantityAndPrice(id, item, newValue) {
  const itemUpdate = cart.find(
    (product) => product.id === item.id && product.color === item.color
  );

  itemUpdate.quantity = Number(newValue);
  item.quantity = itemUpdate.quantity;
  showTotalPrice();
  showTotalQuantity();
}

/****** PARAMETRES DE SUPPRESSION DE L'ARTICLE ******/
//Suppression de l'article au click
function addDeleteSettings(item) {
  const deleteDiv = document.createElement("div");

  deleteDiv.classList.add("cart__item__content__settings__delete");

  const div = document.createElement("p");
  div.classList.add("deleteItem");
  div.textContent = "Supprimer";
  div.addEventListener("click", () => deleteItem(item));

  deleteDiv.appendChild(div);

  return deleteDiv;
}

/************* SUPPRESSION DE L'ARTICLE SELECTIONNE SUITE AU CLICK *************/ 

//Suppression de l'article selectionné du cache et de la page cart
function deleteItem(item) {
  const itemToDelete = cart.find(
    //Filtre sur deux champs différents : la couleur et l'id
    //...ils doivent correspondre à l'élément supprimer
    (product) => product.id === item.id && product.color === item.color
  );
  //Supprimer un élément avec splice (modifie le contenu d'un tableau en retirant des éléments 
  //..(et/ou en ajoutant de nouveaux éléments))
  cart.splice(cart.indexOf(itemToDelete), 1);

  //On affiche : la nouvelle quantité, prix
  showTotalPrice();
  showTotalQuantity();
  //Rappel fonction : 'L'article est supprmimé du cart'
  deleteArticleFromCart(item);
  deleteDataFromLS(item);

}

/************* AFFICHAGE TOTAL PRIX *************/

//Recalcule de la quantité au click dans le panier
// Fonction : 'On affiche le prix pour chaque produit'
function showTotalPrice() {
  let total = 0;
  // SI dans notre page cart il y a potentiellement un article 
  // => Le cart est supérieur à zéro
  if (cart.length > 0) {
     // Permet de parcourir des tableaux ou des collections 
     //...pour en manipuler tous les éléments
    cart.forEach((item) => {
      // FETCH
      // URL de l'API appelé, on lui passe aussi la variable de récupération de l'item.id (le canapé)
      fetch(`http://localhost:3000/api/products/${item.id}`) 
      // .then : récupère une promesse, qui va nous donner des données, (une réponse : ((res) )
        .then((res) => res.json())
        // On récupère les résultats de la première promesse dans une autre promesse qui permet de traiter les datas dans notre page web
        .then((data) => {
          //  Calcul du total du prix
          total += data.price * item.quantity;
          // Récupération de l'id "totalPrice", et l'afficher avec textContent
          document.getElementById('totalPrice').textContent = total;
        })
    });
  }
}

/************* RECALCUL DE LA QUANTITE *************/

//Fonction d'affichage de la quantité totale
function showTotalQuantity() {
  // On récupère la quantité
  let total = 0;
  const totalQuantity = document.getElementById("totalQuantity");
  // Permet de parcourir des tableaux ou des collections 
     //...pour en manipuler tous les éléments
  cart.forEach((item) => {
    // Calcul de la nouvelle quantité
    const totalUnitQuantity = item.quantity;
    total += totalUnitQuantity;
  });
  //On affiche la quantité totale
  totalQuantity.textContent = total;
}

/************* SUPPRESSION DE L'ARTICLE DU CART *************/

//Fonction de suppression de l'article du cart
function deleteArticleFromCart(item) {
  const deleteArticleFromCart = document.querySelector(
    //Suppression de l'article qui a l'id et la couleur qu'il faut
    `[data-id="${item.id}"][data-color="${item.color}"]`
  );
  // L'article est supprimé du cart
  deleteArticleFromCart.remove();
  //Message d'alert indiquant à l'uilisateur que l'article est bien supprimer de son panier
  alert("--Article supprimé avec succès--");
  //Fin de l'éxecution de la fonction
  return;
}

/************* SUPPRESSION DU DATA DU CACHE *************/

//Fonction pour supprimer au "delete" : le produit que l'utilisateur ne veut plus garder dans son panier
function deleteDataFromLS(item) {
  //On récupére l'itemId et l'itemColor des canapés
  const key = `${item.id}-${item.color}`;
  //Suppression du LS
  localStorage.removeItem(key);
}

/********************** FORMULAIRE **********************/

//SI FORMULAIRE EST INVALIDE 
function ifFormIsInvalid(e) {
  //Récupération du formulaire
  const form = document.querySelector(".cart__order__form");
  //Sélection de tout les inputs
  const inputs = form.querySelectorAll("input");
  // Permet de parcourir des tableaux ou des collections 
     //...pour en manipuler tous les éléments
  inputs.forEach((input) => {
    //Si aucun input n'est rempli
    //...fenêtre avec un message d'erreur : "Remplissez tout les champs du formulaire svp"
    if (input.value === "") {
      //Stopper le rechargement de la page sur laquelle on est
      alert("Remplissez tout les champs du formulaire svp");
      //STOPPER LE RECHARGEMENT
      e.preventDefault();
      //Retourner vrai
      return true;
    } //Ou faux
    return false;
  });
}

// CONSTANTE DU FORMULAIRE AVEC LEUR ID
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// RECUPERATION DES INPUTS CONTENANT LE/LES MESSAGE(S) D'ERREURS
let errorFirstName = document.getElementById("firstNameErrorMsg");
let errorLastName = document.getElementById("lastNameErrorMsg");
let errorAddress = document.getElementById("addressErrorMsg");
let errorCity = document.getElementById("cityErrorMsg");
let errorEmail = document.getElementById("emailErrorMsg");

// VARIABLES
let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

// MISE EN PLACE DU FORMULAIRE / VALEURS, CARACTERES MAX, RegEx 

/************ PARTIE PRENOM ************/
// APPEL DE LA CONSTANTE + évènement d'écoute (EventListener : quand l'utilisateur click qur le champ et commence à taper) 
firstName.addEventListener("input", function (e) {
  //Appel des variables pour mieux manipuler les conditions
  valueFirstName;
  //CONDITIONS
  if (e.target.value.length == 0) {
    //NULL
    errorFirstName.innerText = " ";
    valueFirstName = null;
    // Propriété "e.target.value" récupère la valeur de l'entrée sur laquelle il a été appelé 
    // Ici la longeur du nombre min et max de caractères autorisé 
  } else if (e.target.value.length < 3 || e.target.value.length > 25) { 
    errorFirstName.innerText =
      " Le champ doit contenir entre 3 et 25 caractères ";
    errorFirstName.style.color = "black";
    valueFirstName = null;
  }
  // e.target.value.match : méthode qui récupère les correspondances 
  // Lors de la mise en correspondance d'une chaîne avec une expression régulière => SI OK
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)) { //RegEx : pour faire correspondre le texte avec les motifs
    errorFirstName.innerText = " ";
    valueFirstName = e.target.value;
  }
});

/************ PARTIE NOM ************/
lastName.addEventListener("input", function (e) {
  valueLastName;
  if (e.target.value.length == 0) {
    errorLastName.innerText = " ";
    valueLastName = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    errorLastName.innerText =
      " Le champ doit contenir entre 3 et 25 caractères ";
    errorLastName.style.color = "black";
    valueLastName = null;
  }
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)) { //RegEx : pour faire correspondre le texte avec les motifs
    errorLastName.innerText = " ";
    valueLastName = e.target.value;
  }
});

/************ PARTIE ADDRESS ************/

address.addEventListener("input", function (e) {
  //Appel des variables pour mieux manipuler les conditions
  valueAddress;
  if (e.target.value.length == 0) {
    errorAddress.innerText = " ";
    valueAddress = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 35) {
    errorAddress.innerText = " Le champ doit commencer par un chiffre ";
    errorAddress.style.color = "black";
    valueAddress = null;
  }
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)) { //RegEx : pour faire correspondre le texte avec les motifs
    errorAddress.innerText = " ";
    valueAddress = e.target.value;
  }
});


/************ PARTIE CITY ************/
city.addEventListener("input", function (e) {
  //Appel des variables pour mieux manipuler les conditions
  valueCity;
  if (e.target.value.length == 0) {
    errorCity.innerText = " ";
    valueCity = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    errorCity.innerText = " Le champ doit contenir entre 3 et 25 caractères ";
    errorCity.style.color = "black";
    valueCity = null;
  }
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)) { //RegEx : pour faire correspondre le texte avec les motifs
    errorCity.innerText = " ";
    valueCity = e.target.value;
  }
});

/************ PARTIE EMAIL ************/
email.addEventListener("input", (e) => {
  //Appel des variables pour mieux manipuler les conditions
  if (e.target.value.length == 0) {
    errorEmail.innerText = " ";
    valueEmail = null;
  } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) { //RegEx : pour faire correspondre le texte avec les motifs
  }
  if (
    !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && //RegEx : pour faire correspondre le texte avec les motifs
    !e.target.value.length == 0
  ) {
    errorEmail.innerText =
      " Le champ saisi est incorrect, il doit être de type : pierredupont@hotmail.fr";
    valueEmail = null;
    valueEmail = e.target.value;
  }
});

/********************COMMANDER********************/

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

//Soumettre le formulaire
function submitForm(e) {
  //Évènement qui permet de ne pas rafraichir
  e.preventDefault();
  if (cart.length === 0) {
    //Message d'erreur si le client va directement au panier sans rien ajouter à son panier
    alert("--Votre panier est vide--");
    return;  
}
  //Mettre fin à l'exécution d'une fonction et définit une valeur à renvoyer à la fonction appelante
  if (ifFormIsInvalid()) return;

/****************** REQUETE POST ******************/
  const body = addRequestBody();
  //URL DE NOTRE API ORDER
  fetch("http://localhost:3000/api/products/order", {
    // REQUETE POST : ENVOI DES DONNEES DU FORMULAIRE AU SITE WEB
    // ...POUR QUE LE SERVEUR RECOIVE LES INFOS
    method: "POST",
    // HEADERS : EN-TETE ENVOYES EN MEME TEMPS QUE LA REQUETE => donne plus d'information :
    headers: {
      'Content-Type': "application/json", // Indique que le format du corps de la requête est JSON.
      'Accept': "application/json", // Définit le type de sortie sur JSON.
    },
    // body : LES DONNEES QUE L'ON SOUHAITE ENVOYEES A NOTRE AU SERVEUR (ici en chaîne de caractère JSON ex : {"name"})
    body: JSON.stringify(body),
  })
  //PROMISE
  // .then : récupère une promesse
  //... qui va nous donner des données, et du coup  (une réponse : ((res))
    .then((res) => res.json())
    // Traiter les datas de notre page web
    .then((data) => {
      //Dernière promesse pour la redirection si tt est ok, vers la page qui contient le numéro de commande
      //CONSTANTE DE L'orderId (id de commande)
      const orderId = data.orderId;
      window.location.href = "confirmation.html" + "?orderId=" + orderId;
    })
}

//FONCTION DE LA REQUETE DU BODY POUR QUE L'API RECUPERE SOUS FORME DE STRING LES INFOS DU FORMULAIRE
function addRequestBody() {
  //On rappelle le formulaire
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;

  //CORPS DE REQUETE JSON CONTENANT L'OBJET DE CONTACT
  const body = {
    //OBJET CONTACT
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    //.... ET UN TABLEAU DE PRODUIT
    products: retrieveIdsFromLocalStorage(),
  };
  //RETOURNE L'OBJET CONTACT, PRODUITS ET ORDERID (STRING)
  return body;
}

// On récupère les ids du Ls car il y seront déjà
function retrieveIdsFromLocalStorage() {
  // Nombre de produits dans le localStorage
  const numberOfProducts = localStorage.length;
  // Récupération + affichage ids dans un tableau
  const ids = [];
  //Boucle for pour récupérer les clés des produits
  for (let i = 0; i < numberOfProducts; i++) {
    //Récupération des clés produits
    const key = localStorage.key(i);
    //Récupérer l'id et la couleur séparément
    // On veut la première valeur => [0]
    const id = key.split("-")[0];
    //Pusher les ids
    ids.push(id);
  }
  return ids;
}
