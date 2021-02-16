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
  const subtotal = subTotal();
  setValue("subtotal", subtotal);
  const vat = subtotal / 10;
  setValue("vat", vat);
  const total = subtotal + vat;
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