let orderId = new URL(window.location.href).searchParams.get("orderId")

let orderIdNumber = document.querySelector('#orderId');
orderIdNumber.textContent = orderId;