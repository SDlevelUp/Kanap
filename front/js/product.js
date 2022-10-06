//Redirection de l'URL des canapés vers la page d'ajout au panier
let productId = new URL(window.location.href).searchParams.get('id')
    console.log(productId)


// Utilisation de la méthode fetch qui permet d'exécuter des requêtes HTTP sans avoir besoin de recharger la page du navigateur

fetch("http://localhost:3000/api/products/" + productId)

// Envoie une réponse JSON au "composant" choisi

  .then((res) => res.json())
  .then((res) => manipPanier(res))


// Création de la fonction globale pour ajouter les canapés au panier

function manipPanier(canapé) {
    const {altTxt, colors, description, imageUrl, name, price} = canapé
    addImage(imageUrl, altTxt)
    addTitle(name)
    addPrice(price)
    addDescription(description)
    addColors(colors)
}

// Création de la fonction pour ajouter l'image des canapés

function addImage(imageUrl, altTxt) {
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
    const h1 = document.querySelector("#title")
    if(h1 != null) {
        h1.textContent = name
    }
}
  
// Création de la fonction pour ajouter le prix des canapés

function addPrice(price) {
    const span = document.querySelector("#price")
    if(span != null) {
       span.textContent = price
    }
}

// Création de la fonction pour ajouter la description des canapés

function addDescription(description) {
    const p = document.querySelector("#description")
    if(p != null) {
       p.textContent = description
    }
}

// Création de la fonction pour ajouter la couleur des canapés

function addColors(colors) {
    const select = document.querySelector("#colors")
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

// Ajout de l'évènement de click pour ajouter les produits au panier via le boutton
    
const button = document.querySelector("#addToCart")
button.addEventListener('click', (event) => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
        if(color == null || color === "" || quantity == null || quantity == 0)
            alert("Choisissez une quantité et une couleur !")
    }
)




    
