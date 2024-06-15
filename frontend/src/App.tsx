import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Modal from './components/Modal';
import TripForm from './components/TripForm';
import TripSelector from './components/TripSelector';
import './App.css';

interface Expense {
  id: number;
  category: string;
  amount: number;
  description: string;
}

interface Weather {
  temperature: number;
  description: string;
  icon: string;
}

interface Trip {
  id: number;
  fromLocation: string;
  toLocation: string;
  startDate: string;
  endDate: string;
  fromWeather: Weather;
  toWeather: Weather;
  expenses: Expense[];
}

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);

  const fetchExpenses = () => {
    axios.get('http://localhost:8000/api/expenses/').then((response) => {
      const data = response.data.map((expense: Expense) => ({
        ...expense,
        amount: parseFloat(expense.amount.toString()),
      }));
      setExpenses(data);
    });
  };

  const fetchTrips = () => {
    axios.get('http://localhost:8000/api/trips/').then((response) => {
      setTrips(response.data);
    });
  };

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

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [selectedTripId]);

  return (
    <div className='container'>
      <div className='content'>
        <h1>BizTrip Expenses Tracker</h1>
        <TripSelector
          trips={trips}
          selectedTripId={selectedTripId}
          onSelectTrip={setSelectedTripId}
        />
        <TripForm fetchTrips={fetchTrips} />
        {selectedTripId && <ExpenseForm fetchExpenses={fetchExpenses} />}
        <ExpenseList expenses={expenses} onDelete={openModal} />
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
