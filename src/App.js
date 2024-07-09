import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Overview from './components/Overview';
import './App.css';

const App = () => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpenseIndex, setEditingExpenseIndex] = useState(null);
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const data = await response.json();
                setExchangeRates(data.rates);
            } catch (error) {
                console.error('Erro ao buscar taxas de c�mbio:', error);
            }
        };

        fetchExchangeRates();
    }, []);

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    const editExpense = (updatedExpense) => {
        const updatedExpenses = expenses.map((expense, index) =>
            index === editingExpenseIndex ? updatedExpense : expense
        );
        setExpenses(updatedExpenses);
        setEditingExpenseIndex(null);
    };

    const deleteExpense = (index) => {
        const updatedExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(updatedExpenses);
    };

    const startEditingExpense = (index) => {
        setEditingExpenseIndex(index);
    };

    return (
        <div className="container">
            <h1>Gerenciador de Despesas de Viagem</h1>
            <ExpenseForm
                onAddExpense={addExpense}
                onEditExpense={editExpense}
                editingExpense={expenses[editingExpenseIndex]}
            />
            <ExpenseList
                expenses={expenses}
                onEditExpense={startEditingExpense}
                onDeleteExpense={deleteExpense}
                exchangeRates={exchangeRates}
            />
            <Overview expenses={expenses} />
        </div>
    );
};

export default App;