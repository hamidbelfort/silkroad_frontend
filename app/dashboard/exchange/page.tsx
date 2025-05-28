"use client";
import React, { useEffect, useState } from "react";
import { ExchangeRateCard } from "../components/dashboard/exchange/exchangeRateCard";
//import ExchangeChart from "../components/dashboard/exchange/exchangeChartCard";
import PriceChartCard from "../components/dashboard/exchange/exchangeChartCard2";
import { ExchangeForm } from "../components/dashboard/exchange/exchangeForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getExchangeRate } from "@/lib/api/exchange";
const Exchange = () => {
  const [rate, setRate] = useState<number>(0);
  const getExchangeRatePrice = async () => {
    try {
      const res = await getExchangeRate();
      if (res) {
        setRate(res.basePrice);
        //console.log(`Exchange rate: ${res.basePrice}`);
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };
  useEffect(() => {
    getExchangeRatePrice();
  }, []);
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Exchange
      </h1>

      <Accordion
        type="single"
        collapsible
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:cursor-pointer text-xl font-bold">
            Currency Rate Data
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ExchangeRateCard
                onRateChange={(rate) => setRate(rate)}
              />
              <PriceChartCard />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ExchangeForm exchangeRate={rate} />
    </div>
  );
};

export default Exchange;
