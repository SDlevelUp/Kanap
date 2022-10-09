//Redirection de l'URL des canapés vers la page d'ajout au panier
let productId = new URL(window.location.href).searchParams.get('id')
    console.log(productId)

    if(productId != null){
        let itemPrice = 0
        let imgUrl, altText
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
    imgUrl = imageUrl;
    altText = altTxt

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
    console.log(color)
        })
    }
}

// Récupération des données sélectionnées par l'utilisateur +  envoie au panier
const button = document.querySelector("#addToCart")
button.addEventListener("click", (event) => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    ifCartValid(color, quantity)
    saveOrderToCart(color, quantity)
})
    // Constante et Fonction pour récupérer les éléments du canapé et les injecter
    
function saveOrderToCart() {
    const manipPanier = {
        id: productId,
        color: color,
        quantity: Number(quantity),
        imageUrl: imgUrl, 
        altTxt: altText,
        price: itemPrice
    }
    localStorage.setItem(productId, JSON.stringify(manipPanier))
    document.location.reload()
    window.location.href = "cart.html"
}


function ifCartValid(color, quantity) {
    if(color == null || color === "" || quantity == null){
        alert("Choisissez une quantité entre 1 et 100 et une couleur !")
        return
    }
}
// Fonction pour sauvegarder la partie cart




// On sélectionne l'ID du formulaire

//const formulaire = document.querySelector(".cart__order__form__question")
//console.log(formulaire)