/*********************************** PARTIE PAGE D'ACCEUIL (SCRIPT) *************************************/

/******** FETCH ********/ 
// Permet de faire du JS de façon asynchrone : demande de recherche de donnée
// URL DE NOTRE API
fetch("http://localhost:3000/api/products") // URL que l'on va "contacter" pour récupérer les données
// .then : récupère une promesse, qui va nous donner des données, (une réponse : ((res) )
  .then((res) => {
    // Traiter et récupérer les données en JSON
    return res.json();
  })
  // On récupère les résultats de la première promesse dans une autre promesse 
  //...qui permet de traiter les datas dans notre page web
  .then((data) => { //Données récupérées sous forme de tableau
    // console.log(data) : 
    //Récupération des produits issus de ma fonction "addProducts"
    return addProducts(data);
  });

// Fonction pour récupérer les produits
function addProducts(sofa) {
  // Création d'une boucle pour traiter et récupérer les éléments de l'array 
  sofa.forEach((sofa) => {
    // Création d'une constante pour tout regrouper en une seule ligne
    const { _id, imageUrl, altTxt, name, description } = sofa;
    //Mise en place du lien des différents produits avec leur attributs : lien, nom, description
    const anchor = addAnchor(_id);
    const article = document.createElement("article");
    const image = addImage(imageUrl, altTxt);
    const h3 = addTitre(name);
    const p = addDescription(description);
    //Appender les éléments
    appendElementsToArticle(article, image, h3, p);
    appendArticleToAnchor(anchor, article);
  });
}

//Ajour du lien du produit
function addAnchor(id) {
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id;
  return anchor;
}

//On récupère les items
function appendArticleToAnchor(anchor, article) {
  const items = document.querySelector("#items");
  //Si il n'y a rien
  if (items != null) {
    items.appendChild(anchor);
    anchor.appendChild(article);
  }
}

//Récupération des images
function addImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;

  return image;
}

///Récupération du titre
function addTitre(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}

//Récupération de la description
function addDescription(description) {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}

//Ajout des éléments descriptif du produit
function appendElementsToArticle(article, image, h3, p) {
  article.appendChild(image);
  article.appendChild(h3);
  article.appendChild(p);
}
