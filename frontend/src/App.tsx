import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Modal from './components/Modal';
import './App.css';

interface Expense {
  id: number;
  category: string;
  amount: number;
  description: string;
}

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);

  const fetchExpenses = () => {
    axios.get('http://localhost:8000/api/expenses/').then((response) => {
      const data = response.data.map((expense: any) => ({
        ...expense,
        amount: parseFloat(expense.amount),
      }));
      setExpenses(data);
    });
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const openModal = (id: number) => {
    setExpenseToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setExpenseToDelete(null);
  };

  const confirmDelete = () => {
    if (expenseToDelete !== null) {
      axios
        .delete(`http://localhost:8000/api/expenses/${expenseToDelete}/`)
        .then(() => {
          fetchExpenses();
          closeModal();
        });
    }
  };

  return (
    <div className='container'>
      <div className='content'>
        <h1>BizTrip Expenses Tracker</h1>
        <ExpenseForm fetchExpenses={fetchExpenses} />
        <ExpenseList
          expenses={expenses}
          fetchExpenses={fetchExpenses}
          onDelete={openModal}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDelete}
          title='Confirm Delete'
          content='Are you sure you want to delete this expense?'
        />
      </div>
    </div>
  );
};

export default App;
