// Récupérer les paramétres 
const urlParam = new URLSearchParams(window.location.search);
const orderId = urlParam.get("order");
console.log(orderId);
// Insérer l'ID dans l'URL HTML
document.getElementById("orderId").innerText = orderId;
