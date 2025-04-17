import React from "react";
import ExchangeRateCard from "../components/dashboard/exchange/exchangeRateCard";
import ExchangeChart from "../components/dashboard/exchange/exchangeChartCard";

const Exchange = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <ExchangeRateCard />
      <ExchangeChart />
    </div>
  );
};

export default Exchange;
