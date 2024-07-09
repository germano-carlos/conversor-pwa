import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ onAddExpense, editingExpense, onEditExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [currencyFrom, setCurrencyFrom] = useState('USD');
    const [currencyTo, setCurrencyTo] = useState('USD');

    useEffect(() => {
        if (editingExpense) {
            setDescription(editingExpense.description);
            setAmount(editingExpense.amount);
            setQuantity(editingExpense.quantity);
            setCurrencyFrom(editingExpense.currencyFrom);
            setCurrencyTo(editingExpense.currencyTo);
        }
    }, [editingExpense]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingExpense) {
            onEditExpense({ description, amount: parseFloat(amount), quantity: parseFloat(quantity), currencyFrom, currencyTo });
        } else {
            onAddExpense({ description, amount: parseFloat(amount), quantity: parseFloat(quantity), currencyFrom, currencyTo });
        }
        setDescription('');
        setAmount('');
        setQuantity(1);
        setCurrencyFrom('USD');
        setCurrencyTo('USD');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Descri  o:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Valor:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Quantidade:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Moeda de Origem:</label>
                <select value={currencyFrom} onChange={(e) => setCurrencyFrom(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="BRL">BRL</option>
                    {/* Adicione mais moedas conforme necess rio */}
                </select>
            </div>
            <div>
                <label>Moeda de Destino:</label>
                <select value={currencyTo} onChange={(e) => setCurrencyTo(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="BRL">BRL</option>
                    {/* Adicione mais moedas conforme necess rio */}
                </select>
            </div>
            <button type="submit">{editingExpense ? 'Salvar Altera  es' : 'Adicionar Despesa'}</button>
        </form>
    );
};

export default ExpenseForm;