//Création d'une constiable globale
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
    visualizeTotalPrice()
    visualizeTotalQuantity()
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
    addDeleteSettings(settings, item)
    return settings
}

function addDeleteSettings(settings, item){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))
    
    //Création de la constante pour afficher le mot "Supprimer"
    const p = document.createElement("p")
    p.textContent = "Suprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item){
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color
        )
        cart.splice(itemToDelete, 1)
        visualizeTotalQuantity()
        visualizeTotalPrice()
        deleteDateFromCache(item)
        deleteArticleFromCart(item)
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
        
        //Ajout des spécifités relatives à l'input(type, name, value, ...)
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    
    //Eventlistener pour constier le prix et la quantité dans le panier
    input.addEventListener("input", () => changeQuantityAndPrice(item.id, input.value, item))
    
    quantity.appendChild(input)
    settings.appendChild(quantity)
}

// Ajout des spécifités des canapés
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

function visualizeTotalPrice(){
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total = total + totalUnitPrice
    })
    totalPrice.textContent = total
}

function visualizeTotalQuantity(){
    let total = 0
    const totalQuantity = document.querySelector("#totalQuantity")
    cart.forEach((item) => {
        const totalUnitQuantity = item.quantity
        total = total + totalUnitQuantity
    })
    
    totalQuantity.textContent = total
}

//Fonction de réduction de la quantité et du prix
function changeQuantityAndPrice(id, newValue, item){
    const itemUpdate = cart.find((item) => item.id === id)
    itemUpdate.quantity = Number(newValue)
    item.quantity = itemUpdate.quantity
    visualizeTotalPrice()
    visualizeTotalQuantity()
    saveNewData(item)
}

function deleteDateFromCache(item){
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

//Fonction d'enregiement des nouvelles valeurs updater
function saveNewData(item){
    const saveData = JSON.stringify(item)
    //On change la clé de base avec la vraie valeur du produit dans le panier (Callycé noir + Callycé blanc, ...)
    const key = `${item.id} -${item.color}`
    localStorage.setItem(key, saveData)
}
function deleteArticleFromCart(item){
    const deleteArticleFromCart= document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
        )
        deleteArticleFromCart.remove()
}
    

//Récupération des éléments des inputs selon leur ID
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const address = document.querySelector('#address')
const city = document.querySelector('#city')
const email = document.querySelector('#email')

//Récupération des éléments pour les messages d'erreurs
let errorFirstName = document.querySelector('#firstNameErrorMsg');
let errorLastName = document.querySelector('#lastNameErrorMsg');
let errorAddress = document.querySelector('#addressErrorMsg');
let errorCity = document.querySelector('#cityErrorMsg')
let errorEmail = document.querySelector('#emailErrorMsg');

let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail

// Formulaire : valeur, caractères max, etc
firstName.addEventListener("input", function(e){
    valueFirstName;
    if (e.target.value.length == 0){
        errorFirstName.innerText = " "
        valueFirstName = null
    }
    else if (e.target.value.length < 3 || e.target.value.length > 25){
        errorFirstName.innerText = " Le prénom doit contenir entre 3 et 25 caractères "
        valueFirstName = null
    }
    if (e.target.value.match(/^[a-z A-Z]{3,25}$/)){
        errorFirstName.innerText = " "
        valueFirstName = e.target.value
    } 
    if(
        !e.target.value.match(/^[a-z A-Z]{3,25}$/) && 
        e.target.value.length > 3 && 
        e.target.value.length < 25
    ) {
        errorFirstName.innerText = " Le prénom de doit pas contenir de caractère spéciaux, chiffres ou accent "
        valueFirstName = null
    }
})

lastName.addEventListener("input", function(e){
    valueLastName;
    if (e.target.value.length == 0){
        errorLastName.innerText = " "
        valueLastName = null

    }
    else if (e.target.value.length < 3 || e.target.value.length > 25){
        errorLastName.innerText = " Le nom doit contenir entre 3 et 25 caractères "
        valueLastName = null
        console.log("trop court ou long")
    }

    if (e.target.value.match(/^[a-z A-Z]{3,25}$/)){
        errorLastName.innerText = " "
        valueLastName = e.target.value
    } 
    if(
        !e.target.value.match(/^[a-z A-Z]{3,25}$/) && 
        e.target.value.length > 3 && 
        e.target.value.length < 25
    ) {
        errorLastName.innerText = " Le nom de doit pas contenir de caractère spéciaux, chiffres ou accent "
        valueLastName = null
    }
})

address.addEventListener("input", function(e){
    valueAddress;
    if (e.target.value.length == 0){
        errorAddress.innerText = " "
        valueAddress = null
    }
    
    else if (e.target.value.length < 3 || e.target.value.length > 35){
        errorAddress.innerText = " L'adresse doit contenir entre 3 et 35 caractères "
        valueAddress = null
    }

    if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)){
        errorAddress.innerText = " "
        valueAddress = e.target.value
    } 
    if(
        !e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/) && 
        e.target.value.length > 3 && 
        e.target.value.length < 35
    ) {
        errorAddress.innerText = " L'adresse doit commencer par des chiffres "
        valueAddress = null
    }
})

city.addEventListener("input", function(e){
    valueCity;
    if (e.target.value.length == 0){
        errorCity.innerText = " "
        valueCity = null
    }
    else if (e.target.value.length < 3 || e.target.value.length > 25){
        errorCity.innerText = " La ville doit contenir entre 3 et 25 caractères "
        valueCity = null
    }
    if (e.target.value.match(/^[a-z A-Z]{3,25}$/)){
        errorCity.innerText = " "
        valueCity = e.target.value
    } 
    if(
        !e.target.value.match(/^[a-z A-Z]{3,25}$/) && 
        e.target.value.length > 3 && 
        e.target.value.length < 25
    ) {
        errorCity.innerText = " La ville de doit pas contenir de caractère spéciaux, chiffres ou accent "
        valueCity = null
    }
})

email.addEventListener("input", (e) => {
    if(e.target.value.length == 0) {
        errorEmail.innerText = " "
        valueEmail = null
    }
    else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
        errorEmail.innerText = " "
        valueEmail = e.target.value
    }
    if(!e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && !e.target.value.length == 0){
        errorEmail.innerText = " L'email est incorrecte, saisissez un mail de type: pierredupont@hotmail.fr"
        valueEmail = null
    }
})

const orderButton = document.querySelector('#order')
orderButton.addEventListener("click", (e) => submitForm(e))


function submitForm(e) {
    e.preventDefault()
    if(cart.length === 0) {
        alert("Ajoutez de jolis canapés à votre panier")
        return
    }
    if (ifFormIsInvalid()) return

const body = addRequestBody()

fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
}

//Validation du formulaire et des champs
function ifFormIsInvalid(){
    const form = document.querySelector(".cart__order__form") 
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
        if(input.value === "") {
            alert("Remplissez correctement le formulaire SVP")
            return true
        }
        return false
    })
}

function addRequestBody() {
    const form = document.querySelector(".cart__order__form")
    const body = {
        contact:{
            firstName: valueFirstName,
            lastName: valueLastName,
            address: valueAddress,
            city: valueCity,
            email: valueEmail
        },
        products: retrieveIdsFromCache()
    }
    console.log(body)
    return body
}

function retrieveIdsFromCache(){
    const numberOfProducts= localStorage.length
    const ids = []

    for(let i = 0; i < numberOfProducts; i++) {
        //Récupération des clés produits
        const key = localStorage.key(i)
        console.log(key)
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}


