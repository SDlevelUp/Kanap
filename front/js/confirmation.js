/*********************************** PARTIE CONFIRMATION + NUMERO DE COMMANDE *************************************/
const orderId = retrieveOrderId();
showOrderId(orderId);
clearLocalStorage();

// Récupération de l'id de la commande
function retrieveOrderId() {
  const urlQueryString = window.location.search;
  const urlParams = new URLSearchParams(urlQueryString);
  return urlParams.get("orderId");
}
// Affichage de l'id de la commande
function showOrderId(orderId) {
  const orderIdElement = document.querySelector("#orderId");
  orderIdElement.textContent = orderId;
}

// Suppression du localStorage après la confirmation de la commande
function clearLocalStorage() {
  localStorage.clear();
}
