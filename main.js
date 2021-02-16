const firstClass = {
  inputFieldId: "first-class__input",
  price: 150,
  quantity: 0,
  btnAreaId: "first-class-btn-area",

}

const economy = {
  inputFieldId: "economy__input",
  price: 100,
  quantity: 0,
  btnAreaId: "economy-btn-area"
}

let subtotal = 0;
let vat = 0;
let total = 0;

function buttonFunctionality(ticketType) {
  document.getElementById(ticketType.btnAreaId).addEventListener('click', function(event) {
    const symbol = event.target.innerText;
    let ticketQuantity = document.getElementById(ticketType.inputFieldId).value;
    ticketQuantity = parseInt(ticketQuantity);
    if(symbol === "+") {
      ticketQuantity++;
    } 
    else if(symbol === "-" && ticketQuantity > 0) {
      ticketQuantity--;
    }
    ticketType.quantity = ticketQuantity;
    document.getElementById(ticketType.inputFieldId).value = ticketQuantity;
    priceCalculation();
  })
}

function inputFunctionality (ticketType) {
  let inputArea = document.getElementById(ticketType.inputFieldId)
  inputArea.addEventListener('input', function(event) {
    let inputValue = event.target.value;
    inputValue = parseInt(inputValue);
    
    if (inputValue > 0) {
      ticketType.quantity = inputValue;
      document.getElementById(ticketType.inputFieldId).value = inputValue;
      priceCalculation();
    }
    else {
      document.getElementById(ticketType.inputFieldId).value = ticketType.quantity;
    }
  })
}

function priceCalculation() {
  subtotal = subTotal();
  setValue("subtotal", subtotal);
  vat = subtotal / 10;
  setValue("vat", vat);
  total = subtotal + vat;
  setValue("total", total);
}

function subTotal() {
  return firstClass.price * firstClass.quantity + economy.price * economy.quantity;
}


function setValue(idName, value) {
  document.getElementById(idName).innerText = value.toFixed(2);
}

buttonFunctionality(firstClass);
buttonFunctionality(economy);

inputFunctionality(firstClass)
inputFunctionality(economy)


// confirmation functionality
document.getElementById("confirm_btn").addEventListener("click", function() {
  if (firstClass.quantity > 0 || economy. quantity > 0) {
    document.getElementById("main").style.display = "none";
    document.getElementById("confirmation_info").style.display = "block";
    createTable();
  }
  else {
    alert("Please, select something");
  }
})


function createTable() {
  let tableContainer = document.getElementById("order_table")
  let table = document.createElement("table");
  tableDetails = `
  <tr>
    <th>Ticket Type</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>total</th>
  </tr>`
  tableDetails += orderTableHelper(firstClass)
  tableDetails += orderTableHelper(economy)
  tableDetails += `
  <tr>
    <td colspan="3">SubTotal</td>
    <td>${subtotal}</td>
  </tr>
  <tr>
    <td colspan="3">Charge 10% VAT</td>
    <td>${vat}</td>
  </tr>
  <tr>
    <td colspan="3">Total</td>
    <td>${total}</td>
  </tr>
  `
  table.innerHTML = tableDetails;
  tableContainer.appendChild(table);
}


function orderTableHelper(ticketType) {
  if(ticketType.quantity > 0) {
    return `
    <tr>
      <td>First Class</td>
      <td>${ticketType.price}</td>
      <td>${ticketType.quantity}</td>
      <td>${ticketType.price * ticketType.quantity}</td>
    </tr>
    `
  }
  else {
    return '';
  }
}