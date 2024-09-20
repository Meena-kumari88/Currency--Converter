const BASE_URL = "https://v6.exchangerate-api.com/v6/30051ab48a72217c22fce75c/latest/USD";

let dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.message'); 


for (let select of dropdowns) {
  for (currentCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currentCode;
    newOption.value = currentCode;
    if (select.name === "from" && currentCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currentCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = '1';
    }
  
    // Fetch the exchange rates
    let response = await fetch(BASE_URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

};

const updateFlag = (element) => {
  let currCode = element.value;
  let cuntryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${cuntryCode}/flat/64.png`;
  let img = element.parentElement.querySelector('img');
  img.src = newSrc;
}

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener('load',()=>{
    updateExchangeRate();
})