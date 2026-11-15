const expenseForm = document.querySelector('#expense-form');

const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');

const totalExpenses = document.getElementById('total-expenses');
const expenseList = document.getElementById('expense-list');

const expenses = [];
let expenseId = 0;

const pesoFormatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
});

function handleFormSubmit() {
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        addExpense();
        renderTotal();
        renderExpenses();
        expenseForm.reset();
    });
}

function addExpense() {
    const name = nameInput.value.trim();

     if (name === "") {
        alert("Please enter an expense name.");
        return;
    }

    const amount = Number(amountInput.value);
    if(amountInput.value.trim() === "" || !Number.isFinite(amount)|| amount <= 0) {
        alert("Please enter a valid amount greater than zero.");
        return;
    }

    const category = categorySelect.value;
    if (category === "") {
        alert("Please select a category.");
        return;
    }

    const id = expenseId++;
    expenses.push({
        id,
        name, 
        amount, 
        category
    });
}

function renderExpenses() {
    expenseList.innerHTML = '';
    
    if(expenses.length === 0) {
        const empty = document.createElement('li');
        empty.classList.add('empty-state');
        empty.textContent = "No expenses yet. Add your first expense!";
        expenseList.appendChild(empty)
    } else {
        expenses.forEach((expense) => {
            const item = document.createElement('li');
            item.classList.add('expense-item');

            const div = document.createElement('div');
            div.classList.add('expense-item-div');

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.type = 'button';

            const name = document.createElement('h3');
            name.classList.add('expense-item-name');

            const category = document.createElement('p');
            category.classList.add('expense-item-category');

            const amount = document.createElement('p');
            amount.classList.add('expense-item-amount');

            deleteButton.addEventListener("click", function() {
                deleteExpense(expense.id);
            });
            
            name.textContent = expense.name; 
            category.textContent = expense.category;
            deleteButton.textContent = "Delete";
            currencyFormat(expense.amount, amount);

            expenseList.appendChild(item);
            
            item.appendChild(div);
            div.appendChild(name);
            div.appendChild(category);
            item.appendChild(amount);
            item.appendChild(deleteButton);

        });
    }
}

function renderTotal() {
    const total = expenses.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount;
    }, 0);
    currencyFormat(total, totalExpenses);
}

function currencyFormat(total, toWhere) {
    toWhere.textContent = pesoFormatter.format(total);
}

function initApp() {
    renderExpenses();
    renderTotal();
    handleFormSubmit();
}

initApp();

function deleteExpense(id) {

    const remainingExpenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });


    expenses.splice(0, expenses.length, ...remainingExpenses)

    renderTotal();
    renderExpenses();
}








/*
    const buttonElement = document.querySelector
            ('.js-subscribe-button');

            if (buttonElement.innerText === 'Subscribe') {
                buttonElement.innerHTML = 'Subscribed';
                buttonElement.classList.add('is-subscribed');
            }
            else { 
                buttonElement.innerHTML='Subscribe';
                buttonElement.classList.remove('is-subscribed');
            }

        */