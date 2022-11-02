/*********************************** PARTIE CART *************************************/ 

//On souhaite récupérer un objet, on va du coup
//....faire un array du total du cart
const cart = []

//Récupération des items du cache (stockage)
recoupItemsFromCache()

//Récupération des items isue du cache
function recoupItemsFromCache(){
    //Voir le nombre d'entrée dans le panier
    const numberOfItems = localStorage.length;
    //Loop pour itérer sur toutes les clés du localStorage et 
    for(let i = 0; i < numberOfItems; i++){
        const item = localStorage.getItem(localStorage.key(i)) || "" //Si item null => rien : ""
        //...on en fait un objet avec JSON.parse
        const itemObject = JSON.parse(item)
        //..on le push : retourner la nouvelle taille du tableau
        cart.push(itemObject)
    }
}

//Pour chaque éléments dans le cart on lui fabrique ses "attributs" issue du code HTML
cart.forEach((item) => showItem(item))

// Affichage des articles
function showArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
} 

//Afficher l'objet
function showItem(item) {
    //On fait un article
    const article = generateArticle(item)
    //Insertion de la div de l'image
    const divOfImage = generateImageDiv(item)
    //Appender la div de l'image à l'article
    article.appendChild(divOfImage)
    // Insertion du content de la description du produit
    const cardItemContent = generateCartContent(item)
    article.appendChild(cardItemContent)
    
    //Récupération des fonctions de l'article, prix total + quantité
    showArticle(article)
    showTotalPrice()
    showTotalQuantity()
}

// On met en place l'article
function generateArticle(item) {
    //Utilisation de createElement pour récupérer l'élément 'article'
    const article = document.createElement("article")
    //Récupération de la class de l'élément
    article.classList.add("card__item")
    //Ajout des attributs à l'élément HTML avec dataset
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

//Récupération de l'image issue de la div (code HTML)
function generateImageDiv(item) {
    //Utilisation de createElement pour récupérer l'élément 'div'
    const div = document.createElement("div")
    //Récupération de la class de l'élément
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    //Récupération des attribut altTxt et ImageUrl des produits
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)

    return div
}

// Récupération de la div: "cart_content"
function generateCartContent(item) { 
    // Insertion de la div du content
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")
    // On créer les constantes pour les paramètres et de la description 
    const description = generateDesctiption(item)
    const settings = generateSettingsOfProducts(item)
    //Appender les éléments description et setting
    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)

    return cardItemContent
}

// Création des spécifités des canapés qui s'afficheront
function generateDesctiption(item) {
    //On lui créer sa div
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    // On lui insert le titre
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    // On lui insert le paragrahpe
    const p = document.createElement("p")
    p.textContent = item.color
    // On lui insert le "paragraphe" du prix
    const paragOfPrice = document.createElement("p")
    paragOfPrice.textContent = item.price + " €"
    // On appende tout les éléments
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(paragOfPrice)

    return description
}

// Fonction pour appeler les paramètres de l'article (suppression, quantité)
function generateSettingsOfProducts(item){
    //Insertion div 
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    
    addQuantitySettings(settings, item)
    addDeleteSettings(settings, item)

    return settings
}

// Récupération de la quantité 
function addQuantitySettings(settings, item){
    //Récupération de la div
    const quantity = document.createElement("div")
    //Ajout de sa class
    quantity.classList.add("cart__item__content__settings__quantity")
    //Ajout du p (de la quantité)
    const p = document.createElement("p")
    //Ajout du terme 
    p.textContent = " Qté : "
    quantity.appendChild(p)
    // Insertion de l'élément "input" 
    const input = document.createElement("input")
    console.log("input", input)
    //Ajout des spécifités relatives à l'input(type, name, value, min, max ...)
    input.classList.add("itemQuantity")
    input.type = "number"
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    
    //Ecouter au click l'ajustement prix / quantité dans le panier
    input.addEventListener("input", () => changeQuantityAndPrice(item.id, input.value, item))
    quantity.appendChild(input)
    settings.appendChild(quantity)
}

//Quand au click on augmente ou diminue la quantité, on récupère la nouvelle valeur
function changeQuantityAndPrice(id, newValue, item){
    //A chaque click de l'update de la quantité, l'id dont la quantité change s'affiche
    const itemUpdate = cart.find((item) => item.id === id)
    //Updater la quantité
    itemUpdate.quantity = Number(newValue)
    item.quantity = itemUpdate.quantity
    //Appeler les fonctions qui vont recalculer le total : quantity and price
    showTotalPrice()
    showTotalQuantity()
    saveNewDataToCache(item)
}

//Suppression de l'article au click
function addDeleteSettings(settings, item){
    //Récupération de la div de suppression d'un produit
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))
    
    //Création de la constante pour afficher le mot "Supprimer"
    const p = document.createElement("p")
    p.textContent = "Suprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

//Suppression de l'article selectionné du cache et de la page cart
function deleteItem(item){
    //Donner un index quant au produit qui est sélectionné
    const itemToDelete = cart.findIndex(
        //Filtre sur deux champs différents : la couleur et l'id
        //...ils doivent correspondre à l'élément supprimer
        (product) => product.id === item.id && product.color === item.color
        )
        //Supprimer un élément avec splice
        cart.splice(itemToDelete, 1)
        console.log(cart)
        //On affiche : la nouvelle quantité, prix
        showTotalQuantity()
        showTotalPrice()
        //Le data et l'article sont supprimé du cache et du cart
        deleteDataFromCache(item)
        deleteArticleFromCart(item)
}

//Recalcule de la quantité au click dans le panier
function showTotalPrice(){
    //On récupère la nouvelle valeur
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach((item) => {
        //Calcul du nouveau prix 
        const totalUnitPrice = item.price * item.quantity
        total = total + totalUnitPrice
    })
    //On affiche le prix total
    totalPrice.textContent = total
}

//Recalcule de la quantité au click dans le panier
function showTotalQuantity(){
    //On récupère la nouvelle valeur
    let total = 0
    const totalQuantity = document.querySelector("#totalQuantity")
    cart.forEach((item) => {
        //Calcul de la nouvelle quantité
        const totalUnitQuantity = item.quantity
        total = total + totalUnitQuantity
    })
    //On affiche la quantoté totale
    totalQuantity.textContent = total
}

//Fonction de suppression de l'article du cart
function deleteArticleFromCart(item){
    const deleteArticleFromCart= document.querySelector(
        //Suppression de l'article qui a l'id
        `article[data-id="${item.id}"][data-color="${item.color}"]`
        )
        //L'article est supprimé du cart
        deleteArticleFromCart.remove()
        alert("L'article sera supprimer de votre panier")
}

//Fonction d'enregiement des nouvelles valeurs updater
function saveNewDataToCache(item){
    const saveData = JSON.stringify(item)
    //On change la clé de base avec la vraie valeur du produit dans le panier (Callycé noir + Callycé blanc, ...)
    const key = `${item.id}-${item.color}`
    //Ajouter la clé dans le LS
    localStorage.setItem(key, saveData)//saveDate : sauvegarde de la nouvelle valeur
}

//Fonction pour suppression du produit dans le localStorage également
function deleteDataFromCache(item){
    //On récupére l'itemId et l'itemColor des canapés
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}
//Récupération des éléments des inputs selon leur ID
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const address = document.querySelector('#address')
const city = document.querySelector('#city')
const email = document.querySelector('#email')

//Récupération des inputs indiquant un message d'erreur
let errorFirstName = document.querySelector('#firstNameErrorMsg');
let errorLastName = document.querySelector('#lastNameErrorMsg');
let errorAddress = document.querySelector('#addressErrorMsg');
let errorCity = document.querySelector('#cityErrorMsg')
let errorEmail = document.querySelector('#emailErrorMsg');

//Variables
let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail

// Mise en place du Formulaire : valeur, caractères max, RegEx
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

//Boutton "Commander"
const orderButton = document.querySelector('#order')
orderButton.addEventListener("click", (e) => submitForm(e))

//Soumettre le formulaire
function submitForm(e) {
    e.preventDefault()
    if(cart.length === 0) {
        //Message d'erreur si le client va directement au panier sans rien ajouter à son panier
        alert("Ajoutez de magnifiques canapés à votre panier !")
        return
    }
    //Mettre fin à l'exécution d'une fonction et définit une valeur à renvoyer à la fonction appelante
    if (ifFormIsInvalid()) return

const body = addRequestBody()

//Récupération de l'API order
fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    //Convertir une valeur JavaScript en chaîne JSON
    body: JSON.stringify(body),
    headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId
            //la fenêtre de redirection doit afficher le numéro de commande : orderId
            window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
        })
        //Si il y a une erreur, affichage dans la console
        .catch((err) => console.error(err))
}

//Validation du formulaire et des champs
function ifFormIsInvalid(){
    //Récupération du formulaire
    const form = document.querySelector(".cart__order__form") 
    //Sélection de tout les inputs
    const inputs = form.querySelectorAll("input")
    //Boucle pour tout les inputs
    inputs.forEach((input) => {
        //Si aucun input n'est rempli
        //..Message d'erreur
        if(input.value === "") {
            alert("Remplissez correctement le formulaire SVP")
            e.preventDefault()
            //Retourner vrai
            return true
        }//Ou faux
        return false
    })
}

//On envoie une requette au body
function addRequestBody() {
    //On rappelle le formulaire
    const form = document.querySelector(".cart__order__form")
    const body = {
        contact:{
            firstName: "valueFirstName",
            lastName: "valueLastName",
            address: "valueAddress",
            city: "valueCity",
            email: "valueEmail"
        },
        products: retrieveIdsFromCache()
    }
    return body
}

//On récupère les ids du cache 
function retrieveIdsFromCache(){
    //Affichage du nombre de produits dans le localStorage
    const numberOfProducts = localStorage.length
    //Récupération + affichage ids dans un tableau 
    const ids = []
    //Boucle for pour récupérer les clés des produits
    for(let i = 0; i < numberOfProducts; i++) {
        //Récupération des clés produits
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        //Pusher les ids
        ids.push(id)
    }
    //retour des ids dans le tableau
    return ids
}


