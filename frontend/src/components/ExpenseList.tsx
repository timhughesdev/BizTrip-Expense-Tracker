import React from 'react';
import axios from 'axios';

interface Expense {
  id: number;
  category: string;
  amount: number | null; // Allow null
  description: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  const totalExpenses = expenses.reduce((total, expense) => {
    return total + (typeof expense.amount === 'number' ? expense.amount : 0); // Ensure amount is a number
  }, 0);

  return (
    <div className='expense-list-container'>
      <h2>Expenses</h2>
      <div className='expense-list'>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.category}: $
              {typeof expense.amount === 'number'
                ? expense.amount.toFixed(2)
                : '0.00'}{' '}
              - {expense.description}{' '}
              <button
                className='delete-btn'
                onClick={() => onDelete(expense.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>
    </div>
  );
};

export default ExpenseList;
