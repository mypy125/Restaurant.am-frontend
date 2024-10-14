import React from "react";
import CatItem from "./CatItem";
import {Divider, Card, Button} from "@mui/material";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AddressCard from "./AddressCard";

const cartItems = [1,1,1,1];
const addresses = [1,1,1,1,1];
const Cart = () => {

  const createOrderSelectedAddress = () => {
    console.log("create order")
  }

  const handleAddressModel = () => {
    console.log("handle address open model")
  }

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
          <h1 className="text-center font-semibold text-2xl py-10">Choose Delivery Address</h1>
    
            <div className="flex flex-wrap justify-between">
                {addresses.map((item)=><AddressCard 
                showButton={true}
                item={item} 
                handleSelectAddress={createOrderSelectedAddress}/>)}

          <Card className="flex space-x-5 lg:w-64 m-5 p-5">
            <AddLocationAltIcon />
              <div className="space-y-3 text-gray-400">
                <p>Add New Address</p>

                <Button 
                onClick={handleAddressModel}
                fullWidth
                variant="contained"
                 sx={{padding:".75rem"}}>
                      Add
                </Button>
              </div>
          </Card>
            </div>
        </section>
      </main>
    </>
  );
};

export default Cart;
