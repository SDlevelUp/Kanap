//Redirection de l'URL des canapés vers la page panier
let productId = new URL(window.location.href).searchParams.get("id")
  
    //Si l'Id n'est pas null...
    if(productId != null){
        //On récupère le prix, imgUrl, ...
        let itemPrice = 0
        let imgUrl, altText, productName
    }

// Utilisation de la méthode fetch qui permet d'exécuter des requêtes HTTP sans avoir besoin de recharger la page du navigateur
//..et afficher les produits
fetch("http://localhost:3000/api/products/" + productId)
// Dès que la page est chargé, tout est récupérer
//La méthode .then() est une fonction qui renvoie un objet Promise
  .then((res) => res.json())
  .then((res) => holdData(res))

// Création de la fonction globale pour ajouter les canapés sur la page d'acceuil
function holdData(canapé) {
    // Récupérer des éléments du produit depuis l'API
    const {altTxt, colors, description, imageUrl, name, price} = canapé
    //On réassigne les variable, let itemPrice, etc
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    productName = name
    addImage(imageUrl, altTxt)
    addTitle(name)
    addPrice(price)
    addDescription(description)
    addColors(colors)
}

// Création de la fonction pour ajouter l'image des canapés
function addImage(imageUrl, altTxt) {
     // Constante pour afficher l'image du canapé
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if(parent != null) {
        parent.appendChild(image)
    }
}

// Création de la fonction pour ajouter le nom des canapés
function addTitle(name) {
     // Constante pour afficher le titre du canapé
    const h1 = document.querySelector("#title")
    if(h1 != null) {
        h1.textContent = name
    }
}
  
// Ajouter le prix des canapés
function addPrice(price) {
     // Constante pour afficher le prix du canapé
    const span = document.querySelector("#price")
    if(span != null) {
       span.textContent = price
    }
}

// Ajouter la description des canapés
function addDescription(description) {
     // Constante pour afficher la description du canapé
    const p = document.querySelector("#description")
    if(p != null) {
       p.textContent = description
    }
}

// Ajouter la couleur du canapé commandé
function addColors(colors) {
     // Constante pour afficher la couleur du canapé
    const select = document.querySelector("#colors")
    // Ajout d'une condition si le select est null
    if(select != null) {
    colors.forEach((color) => {
    const option = document.createElement("option")
    option.value = color
    option.textContent = color
    select.appendChild(option)
        })
    }
}

// Constante qui va lire les des données 
const button = document.querySelector("#addToCart")
button.addEventListener("click", clickToOrder) 

function clickToOrder (){
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    //Si c'est invalide : message d'erreur
    if(orderNotValid(color, quantity)) return
    saveOrder(color, quantity)
    window.location.href = "cart.html"
}

// Storer les éléments dans le localStorage
function saveOrder(color, quantity){ 
    //Afficher les produits avec des ids différents et couleurs différentes
    const key = `${productId}-${color}`
    const holdData = {
        id:productId,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl: imgUrl, 
        altTxt: altText,
        name: productName
    }
    // Envoie au localStorage des éléments des canapés
    localStorage.setItem(key, JSON.stringify(holdData))
}

// Fonction qui retourne vrai si une seule des conditions est remplie, color = 0, quanto+ité = 0
function orderNotValid(color, quantity){
    if(color == null || color === "" || quantity == null) {
        alert("Choisissez une quantité entre 1 et 100, et une couleur")
        return true
    }
}