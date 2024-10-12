import React from "react";
import CatItem from "./CatItem";
import { Divider } from "@mui/material";

const cartItems = [1,1,1,1];

const Cart = () => {
  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 min-h-screen pt-10">
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <CatItem key={index} />
            ))}
          </div>
          <Divider />

          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>800</p>
              </div>

              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>800</p>
              </div>

              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>800</p>
              </div>

              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>800</p>
              </div>

              <Divider />

              <div className="flex justify-between text-gray-400">
                <p>Total Payable</p>
                <p>4500</p>
              </div>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />

        <section className="lg:w-[70%] px-5">
    
        </section>
      </main>
    </>
  );
};

export default Cart;
