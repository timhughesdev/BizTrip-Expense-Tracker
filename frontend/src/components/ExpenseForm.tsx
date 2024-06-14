// import React, { useState } from 'react';
// import axios from 'axios';

// interface ExpenseFormProps {
//   fetchExpenses: () => void;
// }

// const ExpenseForm: React.FC<ExpenseFormProps> = ({ fetchExpenses }) => {
//   const [category, setCategory] = useState<string>('');
//   const [amount, setAmount] = useState<string>('');
//   const [description, setDescription] = useState<string>('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     axios
//       .post('http://localhost:8000/api/expenses/', {
//         category,
//         amount: parseFloat(amount), // Ensure amount is a number
//         description,
//       })
//       .then(() => {
//         setCategory('');
//         setAmount('');
//         setDescription('');
//         fetchExpenses();
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Category:</label>
//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         required
//       >
//         <option value=''>Select a category</option>
//         <option value='Transportation'>Transportation</option>
//         <option value='Meals'>Meals</option>
//         <option value='Accommodation'>Accommodation</option>
//         <option value='Miscellaneous'>Miscellaneous Business Expenses</option>
//       </select>

//       <label>Amount:</label>
//       <input
//         type='number'
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         required
//       />

//       <label>Description:</label>
//       <input
//         type='text'
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <button type='submit'>Submit Expense</button>
//     </form>
//   );
// };

// export default ExpenseForm;
import React, { useState } from 'react';
import axios from 'axios';

interface ExpenseFormProps {
  fetchExpenses: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ fetchExpenses }) => {
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/expenses/', {
        category,
        amount: parseFloat(amount), // Ensure amount is a number
        description,
      })
      .then(() => {
        setCategory('');
        setAmount('');
        setDescription('');
        fetchExpenses();
      });
  };

  return (
    <form onSubmit={handleSubmit} className='expense-form'>
      <label>Category:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value=''>Select a category</option>
        <option value='Transportation'>Transportation</option>
        <option value='Meals'>Meals</option>
        <option value='Accommodation'>Accommodation</option>
        <option value='Miscellaneous'>Miscellaneous Business Expenses</option>
      </select>

      <label>Amount:</label>
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <label>Description:</label>
      <input
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type='submit'>Submit Expense</button>
    </form>
  );
};

export default ExpenseForm;
