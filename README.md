# **BizTrip Expenses Tracker**

![BizTrip Expenses Tracker](./BizTrip_logo.png) <!-- Placeholder for an actual project banner image -->

**BizTrip Expenses Tracker** is a simple web application for managing and tracking business trip expenses. Users can add, view, and calculate total expenses with ease.

---

## **Table of Contents**

- [TODO](#todo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

# **TODO**

- [ ] Frontend: Create individual cards for 'TripForm' and 'ExpenseForm' to render sequentially
- [ ] Feature: Add an upload button on each expense in the ExpenseList to upload receipts (save receipts to a directory Receipts/{TripList}).
- [ ] Feature - convert uploaded images to PDF.
- [ ] Feature: Implement a Download/Export button to allow users to download the expense list as a .csv file along with a nested folder containing PDFs of the receipts.
- [ ] Feature - Add Authentication and the appropriate storage account per user
- [ ] Feature: Create a monorepo and build the application in React-Native for cross-platform mobile support.
- [ ] Feature - Add a subscription tier or ads for monetization
- [ ] Profit

## **Features**

- Use Google API to autofill start and end desitination
- Gather geocoding from Google API to pass data to Visual Crossing Historical Weather API to see how the weather was on the trip
- Submit business trip expenses with categories and amounts.
- View a list of all expenses.
- Calculate and display total expenses.

---

## **Tech Stack**

- **Frontend:** React
- **Backend:** Django REST Framework
- **Database:** PostgreSQL
- **Containerization:** Docker

---

## **Installation**

Follow these steps to set up and run the project:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/timhughesdev/biztrip-expenses-tracker.git
   cd biztrip-expenses-tracker
   ```

2. **Build and Start the Services:**

   ```bash
   docker-compose up --build
   ```

3. **Access the Application:**

   ## Frontend

   - **Submit Expense:** Fill our the form with expense details and submit.
   - **View Expenses:** See the list of all expenses and the total expenses calculated.

   ## Backend

   The backend exposes RESTful API endpoints for managing expenses.

## **Endpoints**

### **GET /api/expenses/**

Fetch a list of all expenses.

**Response:**

```json
[
  {
    "id": 1,
    "category": "Transportation",
    "amount": "180.10",
    "description": "Taxi fare from airport"
  },
  {
    "id": 2,
    "category": "Meals",
    "amount": "411.64",
    "description": "Business lunch"
  }
]
```

### **POST /api/expenses/**

Submit a new expense.

**Request:**

```json
{
  "category": "Accommodation",
  "amount": "1708.00",
  "description": "Hotel stay"
}
```

**Response:**

```json
{
  "id": 3,
  "category": "Accommodation",
  "amount": "1708.00",
  "description": "Hotel stay"
}
```

### **PUT /api/expenses/**

Update an existing expense by ID.

**Request:**

```json
{
  "category": "Meals",
  "amount": "420.00",
  "description": "Updated lunch expense"
}
```

**Response:**

```json
{
  "id": 2,
  "category": "Meals",
  "amount": "420.00",
  "description": "Updated lunch expense"
}
```

### **DELETE /api/expenses/**

Delete an expense by ID.
