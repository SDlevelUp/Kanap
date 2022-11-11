/*********************************** PARTIE PRODUCT *************************************/

//Redirection de l'URL des canapés vers la page panier
let productId = new URL(window.location.href).searchParams.get("id");

// Utilisation de la méthode fetch qui permet d'exécuter des requêtes HTTP sans avoir besoin de recharger la page du navigateur
//...et afficher les produits
fetch("http://localhost:3000/api/products/" + productId)
  // Dès que la page est chargé, tout est récupérer
  //La méthode .then() est une fonction qui renvoie un objet, avec la Promise
  .then((res) => res.json())
  .then((canapés) => showCanapés(canapés));

// Création de la fonction globale pour ajouter les canapés sur la page produit
function showCanapés(canapé) {
  // Récupérer des éléments du produit
  //On réassigne les variable, let itemPrice, etc
  imgUrl = canapé.imageUrl;
  altText = canapé.altTxt;
  productName = canapé.name;
  addDivImg(canapé);
  addTitle(canapé);
  addPrice(canapé); // A LAISSER
  addDescription(canapé);
  addColors(canapé);
}

// Création de la fonction pour ajouter l'image des canapés
function addDivImg(canapé) {
  const divImg = document.querySelector(".item__img");
  const img = document.createElement("img");
  img.src = canapé.imageUrl;
  img.alt = canapé.altTxt;
  divImg.appendChild(img);

  return divImg;
}

// Création de la fonction pour ajouter le nom des canapés
function addTitle(canapé) {
  // Constante pour afficher le titre du canapé
  const h1 = document.getElementById("title");
  h1.textContent = canapé.name;

  return h1;
}

// Ajouter le prix des canapés
function addPrice(canapé) {
  // Constante pour afficher le prix du canapé
  const price = document.getElementById("price");
  price.textContent = canapé.price;

  return price;
}

// Ajouter la description des canapés
function addDescription(canapé) {
  // Constante pour afficher la description du canapé
  const p = document.getElementById("description");
  p.textContent = canapé.description;

  return p;
}

// Ajouter la couleur du canapé commandé
function addColors(canapé) {
  // Constante pour afficher la couleur du canapé
  const colorsSelect = document.getElementById("colors");
  // Ajout d'une condition si le select est null
  canapé.colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    colorsSelect.appendChild(option);
  });
}

/**********************ADD TO CART******************** */

// Constante qui va lire les des données et les envoyées vers la page panier
const button = document.querySelector("#addToCart");
button.addEventListener("click", clickToOrder);

function clickToOrder() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  //Si c'est invalide : message d'erreur
  if (orderNotValid(color, quantity)) return;
  addToCard(color, quantity);
  window.location.href = "cart.html";
}

// Fonction qui retourne vrai si une seule des conditions est remplie, color = 0, quantité = 0
function orderNotValid(color, quantity) {
  //Si aucune couleur ou quantité n'est choisie
  if (color == "" || color == null || quantity == null || quantity < 1) {
    alert("Choisissez une quantité entre 1 et 100, et une couleur");
    return true;
  }
  // window.location.href = "cart.html";
}

function addToCard(color, quantity) {
  const key = `${productId}-${color}`;
  const value = {
    id: productId,
    color: color,
    quantity: Number(quantity),
    imageUrl: imgUrl,
    altTxt: altText,
    name: productName,
  };
  if (localStorage.getItem(key) == null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    const oldQuantity = JSON.parse(localStorage.getItem(key));
    oldQuantity.quantity += Number(quantity);
    localStorage.setItem(key, JSON.stringify(oldQuantity));
  }
}

// // Storer les produits dans le localStorage
// function saveOrder(color, quantity) {
//   //Afficher les produits avec des ids différents et couleurs différentes

//   // let contentOfCard = JSON.parse(localStorage.getItem("holdData")) || [];
//   // contentOfCard = Array.from(contentOfCard);
//   // console.log(contentOfCard);
//   // const key = `${productId}-${color}`;
//   const holdData = {
//     //On remet les éléments des produits ; id, couleur, quantité, prix
//     id: productId,
//     color: color,
//     quantity: Number(quantity),
//     price: itemPrice, // A laisser : prix s'affiche sur la page cart
//     imageUrl: imgUrl,
//     altTxt: altText,
//     name: productName,
//   };
//   let allInCard = contentOfCard.findIndex(
//     (item) => item.id == holdData.id && item.color == holdData.color
//   );
//   console.log(allInCard);
//   //SI PAS PRESENT
//   if (allInCard == -1) {
//     contentOfCard.push(holdData);
//     // localStorage.setItem("holdData", JSON.stringify(holdData));
//   } else {
//     contentOfCard[allInCard].quantity = parseInt(
//       contentOfCard[allInCard].quantity
//     );
//     holdData.quantity = parseInt(holdData.quantity);
//     // contentOfCard[allInCard].quantity;
//     contentOfCard[allInCard].quantity += holdData.quantity;
//   }
//   localStorage.setItem("holdData", JSON.stringify(holdData));
// }
