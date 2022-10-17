let orderId = new URL(window.location.href).searchParams.get("orderId")

const orderIdNumberElements = document.getElementById("#orderId");
orderIdNumberElements.textContent = orderId;

console.log(orderId)

