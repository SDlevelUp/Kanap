/*********************************** PARTIE PRODUCT *************************************/

//Redirection de l'URL des canapés vers la page panier
let productId = new URL(window.location.href).searchParams.get("id");

/******** FETCH ********/ 
// Permet de faire du JS de façon asynchrone : demande de recherche de donnée
// URL DE NOTRE API
fetch("http://localhost:3000/api/products/" + productId)
  // .then : récupère une promesse, qui va nous donner des données, (une réponse : ((res))
  .then((res) => res.json())
  //Affichage et récupération des produits via la fonction "showSofa"
  .then((sofa) => showSofa(sofa));

// Création de la fonction globale pour ajouter les canapés sur la page produit
function showSofa(sofa) {
  // Récupérer des éléments du produit
  // AFFICHAGE DES ATTRIBUTS DES CANAPES (IMAGE, NOM DU PRODUIT, PRIX, DESCRIPTION, IMAGE, ETC)
  imgUrl = sofa.imageUrl;
  altText = sofa.altTxt;
  productName = sofa.name;
  addDivImg(sofa);
  addTitle(sofa);
  addPrice(sofa);
  addDescription(sofa);
  addColors(sofa);
}

/*********** AFFICHAGE DE L'IMAGE ***********/
// Création de la fonction pour ajouter l'image des canapés
function addDivImg(sofa) {
  const divImg = document.querySelector(".item__img");
  const img = document.createElement("img");
  img.src = sofa.imageUrl;
  img.alt = sofa.altTxt;
  divImg.appendChild(img);

  return divImg;
}


/*********** AJOUT NOM DU PRODUIT ***********/
// Création de la fonction pour ajouter le nom des canapés
function addTitle(sofa) {
  // Constante pour afficher le titre du sofa
  const h1 = document.getElementById("title");
  h1.textContent = sofa.name;

  return h1;
}


/*********** AJOUT PRIX DU PRODUIT ***********/
// Ajouter le prix des canapés
function addPrice(sofa) {
  // Constante pour afficher le prix du canapé
  const price = document.getElementById("price");
  price.textContent = sofa.price;

  return price;
}

/*********** AJOUT DESCRIPTION DU PRODUIT ***********/
// Ajouter la description des canapés
function addDescription(sofa) {
  // Constante pour afficher la description du canapé
  const p = document.getElementById("description");
  p.textContent = sofa.description;

  return p;
}

/*********** AJOUT COULEUR DU PRODUIT ***********/
// Ajouter la couleur du canapé commandé
function addColors(sofa) {
  // Constante pour afficher la couleur du canapé
  const colorsSelect = document.getElementById("colors");
  // Ajout d'une condition si le select est null
  sofa.colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    colorsSelect.appendChild(option);
  });
}

/**********************ADD TO CART******************** */

// Constante qui va lire les des données et les envoyées vers la page panier au click
const button = document.getElementById("addToCart");
button.addEventListener("click", clickToOrder);

function clickToOrder() {
  const color = document.getElementById("colors").value;
  const quantity = document.getElementById("quantity").value;
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
}

/*********** AJOUTER AU CART LES ELEMENTS DU PRODUIT ***********/

//Quand le client est sur la partie "COMMANDE"
// Infos du canapés s'affiche
function addToCard(color, quantity) {
  const id = `${productId}-${color}`;
  const value = {
    id: productId,
    color: color,
    quantity: Number(quantity),
    imageUrl: imgUrl,
    altTxt: altText,
    name: productName,
  };
  //Conditions d'ajout de la nouvelle quantité lorsque l'utilisateur...
  //...choisi un autre canapé (couleur identique au précédent)
  if (localStorage.getItem(id) == null) {
    localStorage.setItem(id, JSON.stringify(value));
  } else {
    //L'ancienne quantité est stringifiée et stocker dans le localStorage
    const oldQuantity = JSON.parse(localStorage.getItem(id));
    //ENSUITE..
    //...On calcule a nouvelle quantité en l'ajoutant à l'ancienne (oldQuantity)
    oldQuantity.quantity += Number(quantity);
    //Et on la re-stringfiy et on la stock dans le localStorage
    localStorage.setItem(id, JSON.stringify(oldQuantity));
  }
}
