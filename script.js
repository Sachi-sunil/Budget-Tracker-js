"use strict";

const errorMesgEl = document.querySelector(".error_message");
const budgetInputEl = document.querySelector(".budget_input");
const expensedelEl = document.querySelector(".expenses_input");
const expenseamountEl = document.querySelector(".expenses_amount");
const tblrecordEl = document.querySelector(".tbl_data");
const cardscontainer = document.querySelector(".cards");

//Cards content 
const budgetcardEl = document.querySelector(".budget_card")
const expensescardEl = document.querySelector(".expenses_card")
const balancecardEl = document.querySelector(".balance_card")

let itemlist =[]
let iteamid=0;

//==================button events=================

function btnevents(){
  const btnbudgetcal = document.querySelector("#btn_budget")
  const btnexpensescal = document.querySelector("#btn_expenses")
  //budget event-------------------------------------------
  btnbudgetcal.addEventListener("click",(e)=>{
    e.preventDefault();
    budgetfunc();
  });

  btnexpensescal.addEventListener('click',(e)=>{
    e.preventDefault();
    expensesfunc();
  });

}

//calling btn event=========
document.addEventListener("DOMContentLoaded", btnevents);

// =======expenses function
function expensesfunc(){
  let expensesdescvalue = expensedelEl.value;
  let expenseamountvalue = expenseamountEl.value;

  if(expensesdescvalue == "" || budgetInputEl<0 ){
    errormessage("Please Enter Expense Description")
  }else if(expenseamountvalue == ""|| budgetInputEl<0 ){
    errormessage("Please Enter Expense Amount")
  }else{
    let amount = parseInt(expenseamountvalue);
    expenseamountEl.value = "";
    expenseamountEl.value="";

    //store value inside object
    let expenses = {
      id: iteamid,
      title: expensesdescvalue,
      amount : amount
    };
    iteamid++;
    itemlist.push(expenses)
  

    //add expenses inside the html page
    addexpenses(expenses);
    showbalance();
  }

}
////add expenses///////
function addexpenses(expensespara) {
  const html = `<ul class="tbl_tr_content">
          <li data-id="${expensespara.id}">${expensespara.id}</li>
          <li>${expensespara.title}</li>
          <li><span>$</span>${expensespara.amount}</li>
          <li>
            <button type="button" class="btn_edit">Edit</button>
            <button type="button" class="btn_delete">Delete</button>
          </li>
        </ul>`;

  tblrecordEl.insertAdjacentHTML("beforeend", html);

  const btnedit = document.querySelectorAll('.btn_edit');
  const btndel = document.querySelectorAll('.btn_delete');

  // Edit Button Event
  btnedit.forEach((btn) => {
    btn.addEventListener("click", (el) => {
      const element = el.target.closest('.tbl_tr_content');
      const id = parseInt(element.querySelector("li[data-id]").dataset.id);

     
      const expenses = itemlist.find(item => item.id === id);
      if (expenses) {
        expensedelEl.value = expenses.title;
        expenseamountEl.value = expenses.amount;

        itemlist = itemlist.filter(item => item.id !== id);
        element.remove();

        showbalance();
      }
    });
  });

  // Delete Button Event
  btndel.forEach((btn) => {
    btn.addEventListener("click", (el) => {
      const element = el.target.closest('.tbl_tr_content');
      const id = parseInt(element.querySelector("li[data-id]").dataset.id);

      itemlist = itemlist.filter(item => item.id !== id);
      element.remove();

      showbalance();
    });
  });
}

//budget function============
function budgetfunc(){
  const budgetvalue = budgetInputEl.value;
   if(budgetvalue == ""){
    errormessage("Please Enter your Budget")
   }else if( budgetvalue < 0){
    errormessage("Please Enter Budget more than 0")
   }else{
    budgetcardEl.textContent = budgetvalue;
    budgetInputEl.value = "";
    showbalance();
   }

}


//show balanceeee
function showbalance(){
  const expenses = totalexpenses();
  const total = parseInt(budgetcardEl.textContent)-expenses;
  balancecardEl.textContent=total
}


//total expense    
function totalexpenses(){
  let total = 0;

   if(itemlist.length > 0){
     total = itemlist.reduce(function(acc,curr){
      acc += curr.amount
      return acc;
     },0);
   }

   expensescardEl.textContent = total;
  return total;
}




///eror messageeeeeee
function errormessage(message){
  errorMesgEl.innerHTML = `<p>${message}</p>`
    errorMesgEl.classList.add("error");
    setTimeout(()=>{
      errorMesgEl.classList.remove("error");
    },2500)
}