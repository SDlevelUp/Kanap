//Redirection de l'URL des canapés vers la page d'ajout au panier
let productId = new URL(window.location.href).searchParams.get("id")
  
    if(productId != null){
        let itemPrice = 0
        let imgUrl, altText, productName
    }

// Utilisation de la méthode fetch qui permet d'exécuter des requêtes HTTP sans avoir besoin de recharger la page du navigateur

fetch("http://localhost:3000/api/products/" + productId)

// Envoie une réponse JSON au "composant" choisi

  .then((res) => res.json())
  .then((res) => manipPanier(res))

// Création de la fonction globale pour ajouter les canapés au panier

function manipPanier(canapé) {
    // Constante pour afficher les éléments global du panier
    const {altTxt, colors, description, imageUrl, name, price} = canapé
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
  
// Création de la fonction pour ajouter le prix des canapés

function addPrice(price) {
     // Constante pour afficher le prix du canapé
    const span = document.querySelector("#price")
    if(span != null) {
       span.textContent = price
    }
}

// Création de la fonction pour ajouter la description des canapés

function addDescription(description) {
     // Constante pour afficher la description du canapé
    const p = document.querySelector("#description")
    if(p != null) {
       p.textContent = description
    }
}

// Création de la fonction pour ajouter la couleur des canapés

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
    button.addEventListener("click", (e) => {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value

        //Si c'est vide, message d'erreur
        if(commandNotValid(color, quantity)) return
        sauvegardeCommande(color, quantity)
        window.location.href = "cart.html"
    })

// Fonction pour sauvegarder la dommande dans le fichier panier
function sauvegardeCommande(color, quantity){ 
    const key = `${productId}-${color}`
    const manipPanier = {
        id:productId,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl: imgUrl, 
        altTxt: altText,
        name: productName
    }
    // Envoie au localStorage des éléments des canapés
    localStorage.setItem(key, JSON.stringify(manipPanier))
}

// Fonction qui retourne vrai si une seule des conditions est remplie, color = 0, quanto+ité = 0
function commandNotValid(color, quantity){
    if(color == null || color === "" || quantity == null) {
        alert("Choisissez une couleur et une quantité entre 1 et 100")
        return true
    }
}


