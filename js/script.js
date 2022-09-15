const nameElement = document.getElementById('name');
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
const activitiesInput = document.querySelectorAll('input[type="checkbox"]')
let totalCost = 0;

//add default focus state to name field
nameElement.focus();

// event listener to display 'Other job role' input text field if user selects 'Other' from 'Job role' dropdown menu. 
// User can type in job role when this is displayed.
otherJobRole.style.display = 'none';
jobRole.addEventListener('change', (e) => {
  if (e.target.value === 'other' ) {
    otherJobRole.style.display = 'block';
  }
})

// Event listener to disable 'Color' element until after user has chosen a design
// Only colors tagged with a specific design will appear in the dropdown menu
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

// Program 'Register for Activities' section so that the total cost of selected activities is displayed on the screen.
// Total cost will change as user clicks/unclicks activities 
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

// Event listener set up so when user changes the payment type, all other payment sections are hidden.  
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
    creditCard.style.display = 'none';
  } else {
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
    creditCard.style.display = 'block';
    payment.children[1].selected = true;
  }
})

//helper functions for the form validation event listener below
//functions are testing that individual sections follow requirements for submitting
function nameValidator() {
  const nameValue = nameElement.value;
  const nameIsValid = /^[a-zA-z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
  return nameIsValid;
}

function emailValidator() {
  const emailValue = email.value;
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
  return emailIsValid;
}

function activitiesValidator() {
  const activitiesIsValid = totalCost > 0;
  return activitiesIsValid;
}

function creditCardValidator() {
  const cardValue = ccNum.value;
  const cardIsValid = /^[0-9]{13,16}$/.test(cardValue);
  return cardIsValid;
}

function zipValidator() {
  const zipValue = zip.value;
  const cardIsValid = /^\d{5}$/.test(zipValue);
  return cardIsValid;
}

function cvvValidator() {
  const cvvValue = cvv.value;
  const cvvIsValid = /^\d{3}$/.test(cvvValue);
  return cvvIsValid;
}

//event listener to prevent users from submitting an incomplete form and alerting them of the error

form.addEventListener('submit', (e) => {
    if (!nameValidator()) {
      e.preventDefault();
      nameElement.parentElement.classList.add('not-valid');
      nameElement.parentElement.classList.remove('valid');
      nameElement.nextElementSibling.style.display = 'block';
    } else {
        nameElement.parentElement.classList.add('valid');
        nameElement.parentElement.classList.remove('not-valid');
        nameElement.nextElementSibling.style.display = 'none';
    }

    if (!emailValidator()) {
      e.preventDefault();
      email.parentElement.classList.add('not-valid');
      email.parentElement.classList.remove('valid');
      email.nextElementSibling.style.display = 'block';
    } else {
      email.parentElement.classList.add('valid');
      email.parentElement.classList.remove('not-valid');
      email.nextElementSibling.style.display = 'none';
    }

    if (!activitiesValidator()) {
      e.preventDefault();
      regForActivities.classList.add('not-valid');
      regForActivities.classList.remove('valid');
      regForActivities.lastElementChild.style.display = 'block';
    } else {
      regForActivities.classList.add('valid');
      regForActivities.classList.remove('not-valid');
      regForActivities.lastElementChild.style.display = 'none';
    }

    if (payment.value === 'credit-card') {
      if (!creditCardValidator()) {
        e.preventDefault();
        ccNum.parentElement.parentElement.classList.add('not-valid');
        ccNum.parentElement.parentElement.classList.remove('valid');
        ccNum.nextElementSibling.style.display = 'block';
      } else {
        ccNum.parentElement.parentElement.classList.add('valid');
        ccNum.parentElement.parentElement.classList.remove('not-valid');
        ccNum.nextElementSibling.style.display = 'none';
      }
      if (!zipValidator()) {
        e.preventDefault();
        zip.parentElement.parentElement.classList.remove('valid');
        zip.parentElement.parentElement.classList.remove('valid');
        zip.nextElementSibling.style.display = 'block'
      } else {
        zip.parentElement.parentElement.classList.add('valid');
        zip.parentElement.parentElement.classList.remove('not-valid');
        zip.nextElementSibling.style.display = 'none';
      }
      if (!cvvValidator()) {
        e.preventDefault();
        cvv.parentElement.parentElement.classList.remove('valid');
        cvv.parentElement.parentElement.classList.remove('valid');
        cvv.nextElementSibling.style.display = 'block'
      } else {
        cvv.parentElement.parentElement.classList.add('valid');
        cvv.parentElement.parentElement.classList.remove('not-valid');
        cvv.nextElementSibling.style.display = 'none';
      }
    }
})

// Event listeners to make the focus state of the activities more obvious to all users
for (let i = 0; i < activitiesInput.length; i++) {
  activitiesInput[i].addEventListener('focus', (e) => {
    e.target.parentElement.classList.add('focus');
  })
  activitiesInput[i].addEventListener('blur', (e) => {
    e.target.parentElement.classList.remove('focus');
  })
}