import React from 'react';
import { getTokenFromCookie } from '../../../backend/utilities/cookie';

function FinanceCard( {transaction,  onDeleteSuccess} ) {
  const { 
    transactionId, 
    transactionName, 
    transactionAmount, 
    transactionType, 
    domain, 
    transactionDate 
  } = transaction;


  const onDeleteHandler = async () => {
    const token = getTokenFromCookie()
    fetch("http://localhost:5000/data/deleteFinanceData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({transactionId}),
    })
      .then((response) => response.json())
      .then((data) => {
        
        console.log(data);
        onDeleteSuccess();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  
  };

  return (
    <div className='p-4 rounded-lg shadow-md shadow-slate-300 w-full m-10'>
      <div className='font-semibold'>Transaction Name: {transactionName || 'N/A'}</div>
      <div className='font-semibold'>Transaction Id: {transactionId || 'N/A'}</div>
      <div className='font-semibold'>Transaction Amount: <span>{transactionAmount.$numberDecimal || 'N/A'}</span></div>
      <div className='font-semibold'>Transaction Type: <span>{transactionType || 'N/A'}</span></div>
      <div className='font-semibold'>Transaction Domain: <span>{domain || 'N/A'}</span></div>
      <div className='font-semibold'>Transaction Date: <span>{transactionDate || 'N/A'}</span></div>

      <div className='flex items-center justify-center'>
        <button onClick={onDeleteHandler} className='bg-red-600 p-2 rounded font-semibold'>
          Delete Record
        </button>
      </div>
    </div>
  );
}

export default FinanceCard;
