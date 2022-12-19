import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";


const Row =( {account,handleDeleteClick}) =>{
        return (
          <tr>
            <td>{account.accountName}</td>
            <td>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(account.debitAmount)}
            </td>
            <td>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(account.creditAmount)}
            </td>
            <td>
              <button
                className="delete-button"
                type="button"
                onClick={() => handleDeleteClick(account.id)}
              >
                <RiDeleteBin6Fill className="icon" />
              </button>
            </td>
          </tr>
        );
} 

export default Row;