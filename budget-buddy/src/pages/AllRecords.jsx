import React, { useEffect, useState } from "react";
import { getTokenFromCookie } from "../../../backend/utilities/cookie";
import FinanceCard from "../components/FinanceCard";

function AllRecords() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTypeOption, setSelectedTypeOption] = useState("All");
  const token = getTokenFromCookie();

  useEffect(() => {
    fetch("http://localhost:5000/data/getFinanceData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (selectedTypeOption === "All") {
          setData(data.data); // Assuming data.data is the correct structure
        } else {
          setData(
            data.data.filter(
              (transaction) => transaction.transactionType === selectedTypeOption
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token, selectedTypeOption]);

  const handleDeleteSuccess = () => {
    fetch("http://localhost:5000/data/getFinanceData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDropdownChange = (e) => {
    setSelectedTypeOption(e.target.value);
  };

  useEffect(() => {
    if (selectedTypeOption === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(
          (transaction) => transaction.transactionType === selectedTypeOption
        )
      );
    }
  }, [selectedTypeOption, data]);

  const handleFilterButtonClick = (type) => {
    setSelectedTypeOption(type);
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${selectedTypeOption === "All"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
            }`}
          onClick={() => handleFilterButtonClick("All")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${selectedTypeOption === "Expenditure"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
            }`}
          onClick={() => handleFilterButtonClick("Expenditure")}
        >
          Expenditure
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${selectedTypeOption === "Income"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
            }`}
          onClick={() => handleFilterButtonClick("Income")}
        >
          Income
        </button>
      </div>

      {data.length > 0 ? (
        filteredData.map((dataRecord) => (
          <FinanceCard
            key={dataRecord.transactionId}
            transaction={dataRecord}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))
      ) : (
        <p className="font-semibold text-xl text-center">No records found</p>
      )}
    </div>
  );
}

export default AllRecords;
