import React from "react";
import ExchangeRateCard from "../components/dashboard/exchange/exchangeRateCard";
//import ExchangeChart from "../components/dashboard/exchange/exchangeChartCard";
import PriceChartCard from "../components/dashboard/exchange/exchangeChartCard2";
import { ExchangeForm } from "../components/dashboard/exchange/exchangeForm";
const Exchange = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Exchange</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExchangeRateCard />
        <PriceChartCard />
      </div>
      <ExchangeForm />
    </div>
  );
};

export default Exchange;
