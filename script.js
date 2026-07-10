const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const form = document.getElementById("converter-form");
const result = document.getElementById("result");

// You can get your free API key from https://www.exchangerate-api.com/
const API_KEY = "https://api.exchangerate-api.com/v4/latest/USD";

// Load currency options
fetch(API_KEY)
  .then(res => res.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(curr => {
      fromCurrency.innerHTML += `<option value="${curr}">${curr}</option>`;
      toCurrency.innerHTML += `<option value="${curr}">${curr}</option>`;
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  });

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = parseFloat(amount.value);

  if (isNaN(amt) || amt <= 0) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      const converted = (amt * rate).toFixed(2);
      result.innerText = `${amt} ${from} = ${converted} ${to}`;
    })
    .catch(() => {
      result.innerText = "Conversion failed. Try again.";
    });
});
