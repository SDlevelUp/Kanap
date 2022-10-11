const cart = []

catchItemsOfCache()
console.log(cart)

cart.forEach((item) => displayItem(item))

function catchItemsOfCache(){
    const numberOfItems = localStorage.length
    for(let i = 0; i < numberOfItems; i++){
    const item = localStorage.getItem(localStorage.key(i))
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
    }
}

function displayItem(item) {
    const article = createArticle(item)
    const divOfImage = createImageDiv(item)
    article.appendChild(divOfImage)
    
    const cardItemContent = createContentDescription(divOfImage, item)
    article.appendChild(cardItemContent)
    displayArticle(article)
}

function createCardItemContent() {
    const div = document.createElement("div")
    div.classList.add("cart__item__content")
}

function createContentDescription(div, item) {
    const description = createDesctiption(item)
    const settings = createSettingsOfProduct()
}

function createSettingsOfProduct(item){
    return ""
}

function createDesctiption(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name

    const p = document.createElement("p")
    p.textContent = item.color

    const paragOfPrice = document.createElement("p")
    paragOfPrice.textContent = item.price + " €"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(paragOfPrice)
    div.appendChild(description)
    return div

}

function displayArticle(article) {
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