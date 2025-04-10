import ("./Multipliers.js");

let buttons = document.querySelectorAll(".btn");
let buttonUpgrades = document.querySelectorAll(".manualBtn");
let clickButton = document.querySelector(".clickBtn");
let moneyPerSecond = document.querySelector("#MoneyPerSecond");
let currMoney = document.querySelector("#currMoney");

let mps = 0;
let currMPC = 1
let money = Number.parseInt(currMoney.innerHTML);
let running = false;
initaliseGame();

//create buttons and apply starting variables
function initaliseGame() {
    //add click event listener to each multiplier button
    buttons.forEach(btn => btn.addEventListener("click", updateMPS));
    clickButton.addEventListener("click", addMoney);
    buttonUpgrades.forEach(btn => btn.addEventListener("click",updateMPC));

    moneyPerSecond.innerHTML = `${mps}/s`;
    currMoney.innerHTML = `${money}`;
    clickButton.innerHTML = `+$${currMPC}`;
    running = true;

    window.setInterval(function(){
        money += mps;
    }, 1000);

    window.setInterval(function(){
        moneyPerSecond.innerHTML = `${mps}/s`;
        currMoney.innerHTML = `${money}`;
        clickButton.innerHTML = `+$ ${currMPC}`;
    }, 100)
};

//update Money Per Click
function updateMPC() {
    let textMPC = clickButton.innerHTML;
    let addNum = Number.parseInt(this.innerHTML.match(/(\d+)/)[0]);
    let flag = affordMultiplier(addNum);
    if (!flag) {
        return;
    } else {
        currMPC += addNum;
    }
}

//add money function for the clicker button
function addMoney() {
    let i = this.innerHTML;
    let n = i.match(/(\d+)/);
    let num = Number.parseInt(n[0]);
    money += num;
};

//check whether player can afford the multiplier
function affordMultiplier(multiplier) {
    let cost = multiplier.toString() + "0"; // calculates cost string
    let costNum = Number.parseInt(cost); //changes cost into integer
    //if current money is greater than or equal to cost updateCurrMoney
    if (money >= costNum){
        updateCurrMoney(costNum);
        return true;
    } else {
        return false;
    }
};

//update current money
function updateCurrMoney(amountToRemove) {
    money -= amountToRemove;  // Subtract the cost from money
    currMoney.innerHTML = `${money}`;  // Update the innerHTML of the currMoney element
};

//update money per second 
function updateMPS(){
    let i = this.innerHTML;
    let n = i.match(/(\d+)/); //regex to remove anything that isnt a number
    let num = Number.parseInt(n[0]); //change string into an integer
    let flag = affordMultiplier(num); //checks whether player can afford multiplier
    if (!flag){
        return; //exit funciton
    } else {
        mps += num;
        moneyPerSecond.innerHTML = `${mps}/s`;
    };
};

function roundNun(num) {
    return Number.parseFloat(num).toExponential(4);
};
