import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getTokenFromCookie } from "../../../backend/utilities/cookie";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddFinanceRecord() {
  const today = new Date();
  const [explicitDate, setExplicitDate] = useState(true);
  const [isExpenditure, setIsExpenditure] = useState(false);
  const formattedToday = today.toISOString().split("T")[0];
  const [date, setDate] = useState(formattedToday);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const onSubmit = async (data) => {
    const payload = {
      token: getTokenFromCookie,
      data: {
        transactionName: data.transactionName,
        domain: data.domain,
        date: date,
        transactionType: isExpenditure ? "Expenditure" : "Income",
        transactionAmount: data.transactionAmount,
        message: data.message,
      },
    };

    fetch("http://localhost:5000/data/addFinanceData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Record added successfully!");
        reset({
          transactionName: "",
          domain: "",
          transactionAmount: "",
          message: "",
        });
        setDate(formattedToday); // Reset the date to today's date
        console.log("Success:", data);
      })
      .catch((error) => {
        toast.error("Error adding record. Please try again.");
        console.error("Error:", error);
      });
    console.log(data);
  };

  const validateAmount = (value) => {
    if (!/^[0-9]*$/.test(value)) {
      return "Please enter a valid amount (numeric input only)";
    }
  };

  return (
    <div className="flex border-2 rounded-lg p-6 items-center justify-center pt-20 border-gray-300 shadow-lg bg-white">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Add New Finance Record
        </h1>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="transactionName">
            Transaction Name
          </label>
          <input
            id="transactionName"
            className="border-gray-300 border-2 rounded w-full p-2"
            type="text"
            placeholder="Transaction Name"
            {...register("transactionName", { required: true })}
          />
          {errors.transactionName && (
            <span className="text-red-400 text-sm">
              This field is required
            </span>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="message">
            Message
          </label>
          <input
            id="message"
            className="border-gray-300 border-2 rounded w-full p-2"
            type="text"
            placeholder="Message"
            {...register("message")}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="transactionAmount">
            Amount
          </label>
          <input
            id="transactionAmount"
            type="text"
            className="border-gray-300 border-2 rounded w-full p-2"
            placeholder="Amount"
            {...register("transactionAmount", {
              required: true,
              validate: validateAmount,
            })}
          />
          {errors.transactionAmount && (
            <span className="text-red-400 text-sm">
              Please enter numeric values only
            </span>
          )}
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium mb-2">Date: {date}</p>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={!explicitDate}
              onChange={() => setExplicitDate(!explicitDate)}
            />
            <span className="ml-2 text-lg">Add Today's Date?</span>
          </label>
        </div>

        {explicitDate && (
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2" htmlFor="dateInput">
              Select a Date:
            </label>
            <input
              id="dateInput"
              type="date"
              value={date}
              onChange={handleDateChange}
              className="border-gray-300 border-2 rounded w-full p-2"
            />
          </div>
        )}

        <div className="mb-6 flex justify-between">
          <button
            type="button"
            className={`${
              isExpenditure ? "bg-black text-red-500" : "bg-red-500"
            } w-1/2 py-2 rounded-lg font-semibold transition-colors`}
            onClick={() => setIsExpenditure(true)}
          >
            Expenditure
          </button>

          <button
            type="button"
            className={`${
              isExpenditure ? "bg-green-500" : "bg-black text-green-500"
            } w-1/2 py-2 rounded-lg font-semibold transition-colors`}
            onClick={() => setIsExpenditure(false)}
          >
            Income
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="domain">
            Choose a Field:
          </label>
          <select
            id="domain"
            className="border-gray-300 border-2 rounded w-full p-2"
            {...register("domain", { required: true })}
          >
            <option value="" disabled selected>
              Select an option
            </option>
            {isExpenditure ? (
              <>
                <option value="Food">Food</option>
                <option value="Education">Education</option>
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Clothing">Clothing</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Travel">Travel</option>
                <option value="Savings">Savings</option>
                <option value="Investments">Investments</option>
                <option value="Gifts/Donations">Gifts/Donations</option>
                <option value="Other">Other</option>
              </>
            ) : (
              <>
                <option value="Salary">Salary</option>
                <option value="Freelance Income">Freelance Income</option>
                <option value="Business Income">Business Income</option>
                <option value="Investment Income">Investment Income</option>
                <option value="Rental Income">Rental Income</option>
                <option value="Interest Income">Interest Income</option>
                <option value="Dividend Income">Dividend Income</option>
                <option value="Commission">Commission</option>
                <option value="Bonus">Bonus</option>
                <option value="Royalties">Royalties</option>
                <option value="Tips/Gratuities">Tips/Gratuities</option>
                <option value="Other">Other</option>
              </>
            )}
          </select>
          {errors.domain && (
            <span className="text-red-400 text-sm">
              Please choose a field
            </span>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold transition-colors hover:bg-blue-600"
          >
            Add Finance Record
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFinanceRecord;
