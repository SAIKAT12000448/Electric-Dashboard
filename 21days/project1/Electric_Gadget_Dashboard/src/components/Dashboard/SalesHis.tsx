import { useState } from "react";
import { useGetSalesQuery } from "../../redux/api/apiSlice";

interface Sale {
  item: string;
  buyer: string;
  quantity: number;
  dateOfSell: string;
  productName: string;
}

const SalesHis = () => {
  const { data, isLoading, isError } = useGetSalesQuery(undefined);
  console.log(isLoading);
  console.log(isError);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  console.log(data);
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const filteredData =
    selectedFilter === "all"
      ? data?.data
      : data?.data.filter((sale: Sale) => {
          const saleDate = new Date(sale.dateOfSell);
          if (selectedFilter === "daily") {
            return new Date().toDateString() === saleDate.toDateString();
          } else if (selectedFilter === "weekly") {
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const diffInDays = Math.round((new Date().getTime() - saleDate.getTime()) / oneDay);
            return diffInDays <= 7;
          } else if (selectedFilter === "monthly") {
            return (
              new Date().getFullYear() === saleDate.getFullYear() &&
              new Date().getMonth() === saleDate.getMonth()
            );
          } else if (selectedFilter === "yearly") {
            return new Date().getFullYear() === saleDate.getFullYear();
          }
          return false;
        });

  return (
    <div>
      <h1 className="text-2xl text-bold">Sales History</h1>
      <div className="flex gap-2 mt-2">
        <button
          className={`btn btn-xs ${selectedFilter === "all" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={`btn btn-xs ${selectedFilter === "daily" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => handleFilterChange("daily")}
        >
          Daily
        </button>
        <button
          className={`btn btn-xs ${selectedFilter === "weekly" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => handleFilterChange("weekly")}
        >
          Weekly
        </button>
        <button
          className={`btn btn-xs ${selectedFilter === "monthly" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => handleFilterChange("monthly")}
        >
          Monthly
        </button>
        <button
          className={`btn btn-xs ${selectedFilter === "yearly" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => handleFilterChange("yearly")}
        >
          Yearly
        </button>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Buyer Name</th>
              <th>Quantity</th>
              <th>Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              Array.isArray(filteredData) &&
              filteredData.map((sale: Sale, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{sale.productName}</td>
                  <td>{sale.buyer}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.dateOfSell}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesHis;