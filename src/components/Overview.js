import React, { useEffect, useState } from 'react';
import { convertCurrency } from '../utils/currencyConverter';

const Overview = ({ expenses }) => {
    const [totals, setTotals] = useState({});

    useEffect(() => {
        const calculateTotals = async () => {
            const newTotals = {};

            for (let expense of expenses) {
                const convertedAmount = await convertCurrency(expense.amount * expense.quantity, expense.currencyFrom, expense.currencyTo);

                if (!newTotals[expense.currencyTo]) {
                    newTotals[expense.currencyTo] = 0;
                }

                newTotals[expense.currencyTo] += convertedAmount;
            }

            setTotals(newTotals);
        };

        calculateTotals();
    }, [expenses]);

    return (
        <div className="overview">
            <h2>Vis�o Geral</h2>
            {Object.entries(totals).map(([currency, total]) => (
                <p key={currency}>Total em {currency}: {total.toFixed(2)}</p>
            ))}
        </div>
    );
};

export default Overview;
