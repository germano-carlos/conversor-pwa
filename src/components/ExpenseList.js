import React from 'react';

const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense, exchangeRates }) => {
    const handleDelete = (index) => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir esta despesa?');
        if (confirmDelete) {
            onDeleteExpense(index);
        }
    };

    const calculateConvertedAmount = (amount, quantity, currencyFrom, currencyTo) => {
        if (exchangeRates && exchangeRates[currencyFrom] && exchangeRates[currencyTo]) {
            const rate = exchangeRates[currencyTo] / exchangeRates[currencyFrom];
            return (amount * quantity * rate).toFixed(2);
        }
        return 'N/A';
    };

    return (
        <ul className="expense-list">
            {expenses.map((expense, index) => (
                <li key={index} className="expense-item">
                    <div className="expense-details">
                        <p><strong>Descrição:</strong> {expense.description}</p>
                        <p><strong>Valor:</strong> {expense.amount} {expense.currencyFrom} x {expense.quantity}</p>
                        <p><strong>Convertido:</strong> {calculateConvertedAmount(expense.amount, expense.quantity, expense.currencyFrom, expense.currencyTo)} {expense.currencyTo}</p>
                    </div>
                    <div className="expense-actions">
                        <button onClick={() => onEditExpense(index)}>Editar</button>
                        <button onClick={() => handleDelete(index)}>Excluir</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;