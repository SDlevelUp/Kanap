/*********************************** PARTIE CONFIRMATION + NUMERO DE COMMANDE *************************************/

//Récupération de l'orderId
const orderId = retrieveOrderId();
//Afficher l'orderId
showOrderId(orderId);
// La méthode clear() de l'interface Storage, lorsqu'elle est invoquée, vide toutes les clés stockées
clearLocalStorage();

// Récupération de l'id de la commande
function retrieveOrderId() {
  const urlQueryString = window.location.search;
  const urlParams = new URLSearchParams(urlQueryString);
  return urlParams.get("orderId");
}

// Affichage de l'id de la commande
function showOrderId(orderId) {
  //Sélectionner l'id de l'orderId
  const orderIdElement = document.getElementById("orderId");
  orderIdElement.textContent = orderId;
}

//SECURITE EN PLUS AJOUTEE
// Suppression du localStorage après la confirmation de la commande
function clearLocalStorage() {
  //....après avoir reçu l'orderId, le localStorage est vide
  localStorage.clear();
}
