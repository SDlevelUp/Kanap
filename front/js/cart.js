/*********************************** PARTIE CART *************************************/

//On souhaite récupérer un objet, on va du coup
//....faire un array du total du cart
const cart = [];

//Récupération des items du cache (stockage)
retrieveLocalStorage();

//Pour chaque éléments dans le cart on lui fabrique ses "attributs" issue du code HTML
cart.forEach((item) => {
  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then((res) => res.json())
    .then((data) => {
      showItem(item, data);
    })
    .catch((error) => {
      alert(
        "Oops, il semblerait que nous n'ayons pas pu récupérer les données"
      );
      console.log(error);
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

/*********** OK ***********/
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

/*****IMAGE OK*****/
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

// Récupération de la div: "cart_content"
function generateCartContent(item, data) {
  // Insertion de la div du content
  const itemContent = document.createElement("div");
  itemContent.classList.add("cart__item__content");

  // On créer les constantes pour les paramètres et de la description
  const description = generateDesctiption(item, data);
  const settings = generateSettingsOfProducts(item);

  //Appender les éléments description et setting
  itemContent.appendChild(description);
  itemContent.appendChild(settings);

  return itemContent;
}

/********OK*******/
// Création des spécifités des canapés qui s'afficheront
function generateDesctiption(item, data) {
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

  quantitySettings.appendChild(quantity);
  quantitySettings.appendChild(input);

  return quantitySettings;
}

//Quand au click on augmente ou diminue la quantité, on récupère la nouvelle valeur
function changeQuantityAndPrice(id, item, newValue) {
  const itemUpdate = cart.find(
    (product) => product.id === item.id && product.color === item.color
  );

  itemUpdate.quantity = Number(newValue);
  item.quantity = itemUpdate.quantity;
  showTotalPrice();
  showTotalQuantity();
  saveNewDataToCache(item);
}

/******OK******/
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

//Suppression de l'article selectionné du cache et de la page cart
function deleteItem(item) {
  const itemToDelete = cart.find(
    //Filtre sur deux champs différents : la couleur et l'id
    //...ils doivent correspondre à l'élément supprimer
    (product) => product.id === item.id && product.color === item.color
  );
  //Supprimer un élément avec splice
  cart.splice(cart.indexOf(itemToDelete), 1);

  //On affiche : la nouvelle quantité, prix
  showTotalPrice();
  showTotalQuantity();
  //Le data et l'article sont supprimé du cache et du cart
  deleteDataFromCache(item);
  deleteArticleFromCart(item);
}

/************* AFFICHAGE TOTAL PRIX *************/
//Recalcule de la quantité au click dans le panier
function showTotalPrice() {
  //On récupère la nouvelle valeur
  let total = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      fetch(`http://localhost:3000/api/products/${item.id}`)
        .then((res) => res.json())
        .then((data) => {
          total += data.price * item.quantity;
          document.querySelector("#totalPrice").textContent = total;
        })
        .catch((error) => console.log(error));
    });
  } else {
    document.querySelector("#totalPrice").textContent = "";
  }
}

/**********  OK  **********/
//Recalcule de la quantité au click dans le panier
function showTotalQuantity() {
  //On récupère la nouvelle valeur
  let total = 0;
  const totalQuantity = document.querySelector("#totalQuantity");
  cart.forEach((item) => {
    //Calcul de la nouvelle quantité
    const totalUnitQuantity = item.quantity;
    total = total + totalUnitQuantity;
  });
  //On affiche la quantoté totale
  totalQuantity.textContent = total;
}

//Fonction de suppression de l'article du cart
function deleteArticleFromCart(item) {
  const deleteArticleFromCart = document.querySelector(
    //Suppression de l'article qui a l'id
    `[data-id="${item.id}"][data-color="${item.color}"]`
  );
  //L'article est supprimé du cart
  deleteArticleFromCart.remove();
  alert("--Article supprimé avec succès--");
  return;
}

/*********** OK *************/
//Enregistrement des nouvelles valeurs updater : (prix, quantité, canapés, ...)
function saveNewDataToCache(item) {
  const saveData = JSON.stringify(item);
  //On change la clé de base avec la vraie valeur du produit dans le panier (Callycé noir + Callycé blanc, ...)
  const saveKey = `${item.id}-${item.color}`;
  //Ajouter la clé dans le LS
  localStorage.setItem(saveKey, saveData); //saveData : sauvegarde de la nouvelle valeur
}

//Fonction pour suppression du produit dans le localStorage également
function deleteDataFromCache(item) {
  //On récupére l'itemId et l'itemColor des canapés
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}

/********************** FORMULAIRE **********************/

//Récupération des éléments des inputs selon leur ID
//Validation du formulaire et des champs
function ifFormIsInvalid(e) {
  //Récupération du formulaire
  const form = document.querySelector(".cart__order__form");
  //Sélection de tout les inputs
  const inputs = form.querySelectorAll("input");
  //Boucle pour tout les inputs
  inputs.forEach((input) => {
    //Si aucun input n'est rempli
    //..Message d'erreur
    if (input.value === "") {
      alert("Remplissez tout les champs du formulaire svp");
      e.preventDefault();
      //Retourner vrai
      return true;
    } //Ou faux
    return false;
  });
}

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

//Récupération des inputs indiquant un message d'erreur
let errorFirstName = document.getElementById("firstNameErrorMsg");
let errorLastName = document.getElementById("lastNameErrorMsg");
let errorAddress = document.getElementById("addressErrorMsg");
let errorCity = document.getElementById("cityErrorMsg");
let errorEmail = document.getElementById("emailErrorMsg");

//Variables
let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

// Mise en place du Formulaire : valeur, caractères max, RegEx
firstName.addEventListener("input", function (e) {
  valueFirstName;
  if (e.target.value.length == 0) {
    errorFirstName.innerText = " ";
    valueFirstName = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    errorFirstName.innerText =
      " Le champ doit contenir entre 3 et 25 caractères ";
    valueFirstName = null;
  }
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)) {
    errorFirstName.innerText = " ";
    valueFirstName = e.target.value;
  }
});

lastName.addEventListener("input", function (e) {
  valueLastName;
  if (e.target.value.length == 0) {
    errorLastName.innerText = " ";
    valueLastName = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    errorLastName.innerText =
      " Le champ doit contenir entre 3 et 25 caractères ";
    valueLastName = null;
  }
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)) {
    errorLastName.innerText = " ";
    valueLastName = e.target.value;
  }
});

address.addEventListener("input", function (e) {
  valueAddress;
  if (e.target.value.length == 0) {
    errorAddress.innerText = " ";
    valueAddress = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 35) {
    errorAddress.innerText = " Le champ doit commencer par un chiffre ";
    valueAddress = null;
  }
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)) {
    errorAddress.innerText = " ";
    valueAddress = e.target.value;
  }
});

city.addEventListener("input", function (e) {
  valueCity;
  if (e.target.value.length == 0) {
    errorCity.innerText = " ";
    valueCity = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    errorCity.innerText = " Le champ doit contenir entre 3 et 25 caractères ";
    valueCity = null;
  }
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)) {
    errorCity.innerText = " ";
    valueCity = e.target.value;
  }
});

email.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    errorEmail.innerText = " ";
    valueEmail = null;
  } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
  }
  if (
    !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    !e.target.value.length == 0
  ) {
    errorEmail.innerText =
      " Le champ saisi est incorrect, il doit être de type : pierredupont@hotmail.fr";
    valueEmail = null;
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
    alert("Votre panier est vide");
    return;
  }

  //Mettre fin à l'exécution d'une fonction et définit une valeur à renvoyer à la fonction appelante
  if (ifFormIsInvalid()) return;

  const body = addRequestBody();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href = "confirmation.html" + "?orderId=" + orderId;
    })
    .catch((error) => console.error(error));
}

//On envoie une requette au body
function addRequestBody() {
  //On rappelle le formulaire
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;

  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: retrieveIdsFromLocalStorage(),
  };
  return body;
}

//On récupère les ids du cache
function retrieveIdsFromLocalStorage() {
  //Affichage du nombre de produits dans le localStorage
  const numberOfProducts = localStorage.length;
  //Récupération + affichage ids dans un tableau
  const ids = [];
  //Boucle for pour récupérer les clés des produits
  for (let i = 0; i < numberOfProducts; i++) {
    //Récupération des clés produits
    const key = localStorage.key(i);
    const id = key.split("-")[0];
    //Pusher les ids
    ids.push(id);
  }
  //retour des ids dans le tableau
  return ids;
}
