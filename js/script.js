const name = document.getElementById('name');
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');
const design = document.getElementById('design');
const color = document.getElementById('color');
const colorOptions = color.children;
const regForActivities = document.getElementById('activities');
const totalP = document.getElementById('activities-cost');
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const email = document.getElementById('email');
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');
let totalCost = 0;

name.focus();
// event listener to display 'Other job role' input text field if user selects 'Other' from 'Job role' dropdown menu. 
// User can type in job role when this is displayed.
otherJobRole.style.display = 'none';
jobRole.addEventListener('change', (e) => {
  if (e.target.value === 'other' ) {
    otherJobRole.style.display = 'block';
  }
})

color.disabled = true;
design.addEventListener('change', (e) => {
  color.disabled = false;
  for (let i = 1; i < colorOptions.length; i++) {
    let targetValue = e.target.value;
    let dataTheme = colorOptions[i].getAttribute("data-theme");
    
    if (targetValue === dataTheme) {
      colorOptions[i].hidden = false;
      colorOptions[i].setAttribute('selected', true);
    } else {
      colorOptions[i].hidden = true;
      colorOptions[i].removeAttribute('selected');
    }
  }
})

regForActivities.addEventListener('change', (e) => {
  let dataCost = parseInt(e.target.getAttribute('data-cost'));
  // console.log(dataCost);
  // console.log(typeof(dataCost));
  if (e.target.checked === true) {
    totalCost += dataCost;
  } else {
    totalCost -= dataCost
  }
  // console.log(totalCost);
  // console.log(e.target.checked);
  totalP.innerHTML = `Total: $${totalCost}`
})

paypal.style.display = 'none';
bitcoin.style.display = 'none';
payment.children[1].selected = true;
// console.log(payment);

payment.addEventListener('change', (e) => {
  if (e.target.value === 'paypal') {
    payment.children[1].selected = false;
    payment.children[2].selected = true;
    paypal.style.display = 'block';
    creditCard.style.display = 'none';
  } else if (e.target.value === 'bitcoin') {
    payment.children[2].selected = false;
    payment.children[3].selected = true;
    bitcoin.style.display = 'block';
    paypal.style.display = 'none';
  } else {
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
    creditCard.style.display = 'block';
    payment.children[1].selected = true;
  }
})

form.addEventListener('submit', (e) => {
    const nameValue = name.value;
    const nameIsValid = /^[a-zA-z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    if (nameValue !== nameIsValid) {
        e.preventDefault();
    } 
    // console.log("Name value is: ", `"${nameValue}"`);
    // console.log(`Name validation test on "${nameValue}" evaluates to ${nameIsValid}`);
})