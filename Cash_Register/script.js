let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const input = document.getElementById("cash");
const result = document.getElementById("change-due");
const register = document.getElementById("register");
const btn = document.getElementById("purchase-btn");
const priceWord = document.getElementById("price");

priceWord.textContent = `Total Price: ${price}`;
register.innerHTML = `
  <h3>Change in Drawer</h3>
  <p>Pennies: $${cid[0][1]}</p>
  <p>Nickels: $${cid[1][1]}</p>
  <p>Dimes: $${cid[2][1]}</p>
  <p>Quarters: $${cid[3][1]}</p>
  <p>Ones: $${cid[4][1]}</p>
  <p>Fives: $${cid[5][1]}</p>
  <p>Tens: $${cid[6][1]}</p>
  <p>Twenties: $${cid[7][1]}</p>
  <p>Hundreds: $${cid[8][1]}</p>
  `
const val = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];


/* for (const key in obj) {
      result.innerHTML += `<p>${key}: ${key === "Status" ? "" : "$"}${obj[key]}</p>`
    } */

const totalMoney = () => {
  let total = 0;
  for (const arr of cid) {
    total += arr[1];
  }

  return total;
}

const getChange = () => {
  let change = parseFloat((input.value - price).toFixed(2));
  let obj = {};
  result.innerHTML = "";
  console.log(change)
  if (change < 0) {
    //obj["Status"] = "INSUFFICIENT_FUNDS";
    alert("Customer does not have enough money to purchase the item");
    input.value = "";
    return;
  } else if (change === 0) {
    result.innerHTML = "<p>No change due - customer paid with exact cash</p>"
    input.value = "";
    return;
  }

  


  for (let i = val.length - 1; i >= 0; i--) {
    if (change >= val[i] && cid[i][1] >= val[i]) {
      if (change - cid[i][1] > 0) {
        const rem = cid[i][1];
        cid[i][1] -= parseFloat(rem.toFixed(2));
        change = parseFloat((change - rem).toFixed(2));
        obj["Status"] = "OPEN";
        obj[cid[i][0]] = rem;
        console.log(i, val[i], change, rem, "Yes");
      } else {
        const rem = Math.floor(change / val[i]) * val[i];
        cid[i][1] -= parseFloat(rem.toFixed(2));
        change = parseFloat((change - rem).toFixed(2));
        obj["Status"] = "OPEN";
        obj[cid[i][0]] = rem;
        console.log(i, val[i], change, rem, "No");
      }
    }
  }
  console.log(obj);

  if (change > 0) {
    obj = {};
    result.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }
if (totalMoney() === change) {
    obj["Status"] = "CLOSED";
    for (const key in obj) {
      result.innerHTML += `<p>${key}: ${key === "Status" ? "" : "$"}${obj[key]}</p>`
    }
    input.value = "";
    return;
  }
  
  register.innerHTML = `
  <h3>Change in Drawer</h3>
  <p>Pennies: $${cid[0][1]}</p>
  <p>Nickels: $${cid[1][1]}</p>
  <p>Dimes: $${cid[2][1]}</p>
  <p>Quarters: $${cid[3][1]}</p>
  <p>Ones: $${cid[4][1]}</p>
  <p>Fives: $${cid[5][1]}</p>
  <p>Tens: $${cid[6][1]}</p>
  <p>Twenties: $${cid[7][1]}</p>
  <p>Hundreds: $${cid[8][1]}</p>
  `
  for (const key in obj) {
      result.innerHTML += `<p>${key}: ${key === "Status" ? "" : "$"}${obj[key]}</p>`
    }
}

btn.addEventListener("click", getChange)
