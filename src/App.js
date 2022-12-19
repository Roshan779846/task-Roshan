
import React, { useState } from "react";
import "./App.css";
import data from "./mock-data.json";
import { nanoid } from "nanoid";

import Row from './Components/Row.jsx'

const App = () => {
  // Accessing the data

  const [accounts, setaccounts] = useState(data);

  // Total of the debit and credit accounts
  let totalDebit = 0;
  let i;
  for (i = 0; i < accounts.length; i++) {
    totalDebit += Number(accounts[i].debitAmount);
  }

  let totalCredit = 0;
  let j;
  for (j = 0; j < accounts.length; j++) {
    totalCredit += Number(accounts[j].creditAmount);
  }

  // Adding data from form

  const [addFormData, setAddFormData] = useState({
    accountName: "",
    debitAmount: {},
    creditAmount: {},
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const accountName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[accountName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newAccount = {
      id: nanoid(),
      accountName: addFormData.accountName,
      debitAmount: addFormData.debitAmount,
      creditAmount: addFormData.creditAmount,
    };

    const newAccounts = [...accounts, newAccount];
    setaccounts(newAccounts);
  };

  // Deleting elements
  const handleDeleteClick = (accountId) => {
    const newAccounts = [...accounts];

    const index = accounts.findIndex((account) => account.id === accountId);

    newAccounts.splice(index, 1);

    setaccounts(newAccounts);
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Accounts</th>
            <th>Debit Amount</th>
            <th>Credit Amount</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
           <Row account={account} handleDeleteClick={handleDeleteClick} />
          ))}
        </tbody>
      </table>
      <table className="t-total">
        <tbody>
          <tr>
            <td>Total</td>
            <td>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(totalDebit)}
            </td>
            <td>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(totalCredit)}
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Add</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="accountName"
          required="required"
          placeholder="Account Name"
          onChange={handleAddFormChange}
        />
        <input
          type="integer"
          name="debitAmount"
          required="required"
          placeholder="Debit Amount"
          onChange={handleAddFormChange}
        />
        <input
          type="integer"
          name="creditAmount"
          required="required"
          placeholder="Credit Amount"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;

