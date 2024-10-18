import { Button, Card } from "@mui/material";
import React from "react";

const OrderCard = () => {
    return (
      <Card className="flex justify-between items-center p-5">
        <div className="flex items-center space-x-5">
            <img className="h-16 w-16"
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVyZ2VyfGVufDB8fDB8fHww" 
            alt="" />

            <div>
                <p>pizza</p>
                <p>850amd</p>
            </div>

        </div>
        <div>
            <Button className="cursor-not-allowed"> completed</Button>
        </div>
       
      </Card>
    );
};

export default OrderCard