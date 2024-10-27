const BASE_URL =
  "https://api.currencyapi.com/v3/latest?apikey=cur_live_c5lG2W1l215pI8GXMLAxTT0qfE9iYoGzU5NZEIxf";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

////////
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = BASE_URL; // Use the base URL as you provided
  let response = await fetch(URL);

  // Check if the response is okay (status code 200)
  if (!response.ok) {
    msg.innerText = "Error fetching data. Please try again.";
    return;
  }

  let data = await response.json();
  console.log(data); // Log the response to see its structure

  // Adjust the way you access the rate
  let fromCurrency = fromCurr.value;
  let toCurrency = toCurr.value;
  let rateFrom = data.data[fromCurrency].value; // Access the value property
  let rateTo = data.data[toCurrency].value; // Access the value property

  // Calculate the final amount based on the rate
  let finalAmount = (amtVal / rateFrom) * rateTo; // Convert to target currency

  msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmount.toFixed(
    2
  )} ${toCurrency}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
