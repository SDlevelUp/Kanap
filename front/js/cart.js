//Création d'une variable globale
const cart = []
//Récupération des Items
catchItems()


//Boucle pour récupéter les items et les afficher sous forme de tableau dans la console
cart.forEach((item) => visualizeItem(item))
function catchItems(){
    const numberOfItems = localStorage.length
    for(let i = 0; i < numberOfItems; i++){
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
    }
}
// Création de la fonction qui contient l'article
function visualizeItem(item) {
    const article = createArticle(item)
    //Insertion de la div de l'image
    const divOfImage = createImageDiv(item)
    article.appendChild(divOfImage)
    // Insertion du content de la description du produit
    const cardItemContent = createContentDescription(item)
    article.appendChild(cardItemContent)
    
    visualizeArticle(article)
    visualiseTotalPrice(item)
}

// Fonction dréation du content
function createContentDescription(item) { 
    // Insertion de la div du content
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")
    // On créer les constantes pour les paramètres et de la description 
    const description = createDesctiption(item)
    const settings = createSettingsOfProducts(item)
    
    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    
    return cardItemContent
}

// Fonction pour appeler les paramètres
function createSettingsOfProducts(item){
    //Insertion div 
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantitySettings(settings, item)
    addDeleteSettings(settings)

    return settings
}

function addDeleteSettings(settings){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")

    const p = document.createElement("p")
    p.textContent = "Suprimer"
    div.appendChild(p)

    settings.appendChild(div)
}

// Fonction sur la partie quantité
function addQuantitySettings(settings, item){
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    //Ajout du p de la quantité
    const p = document.createElement("p")
    p.textContent = " Qté : "
    quantity.appendChild(p)
    // Insertion de l'élément "input" et ses éléments (type, name, min, max, ...)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    quantity.appendChild(input)
    settings.appendChild(quantity)
}

// Fonction description du canapé
function createDesctiption(item) {
    //On lui créer sa div
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    // On lui insert le titre
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    // On lui insert le paragrahpe
    const p = document.createElement("p")
    p.textContent = item.color
    // On lui insert le paragraphe du prix
    const paragOfPrice = document.createElement("p")
    paragOfPrice.textContent = item.price + " €"
    // On append tout les éléments
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(paragOfPrice)
    return description
}

function visualizeArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function createArticle(item) {
    const article = document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function createImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

 
function visualiseTotalPrice(item){
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total = total + totalUnitPrice
    })
    console.log(total)
    totalPrice.textContent = total
}


