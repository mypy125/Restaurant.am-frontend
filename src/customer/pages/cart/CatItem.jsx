import { IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from "react";

const CatItem = () => {
    return(
        <>
            <div className="px-5">
        
                <div className="lg:flex items-center lg:spce-x-5">
        
                    <div className="w-[5rem] h-[5rem] object-cover">
                        <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVyZ2VyfGVufDB8fDB8fHww"
                         alt="" />
                    </div>
        
                    <div className="flex items-center justify-between lg:w-[70%]">
                        <div className="space-y-1 lg:space-y-3 w-full">
        
                            <p>Burger</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-1">
                                    <IconButton color="primary">
                                        <RemoveCircleOutlineIcon/>
                                    </IconButton>
                                    <div className="w-5 h-5 text-xs">
                                        5
                                    </div>
                                    <IconButton color="primary">
                                        <AddCircleOutlineIcon/>
                                    </IconButton>
        
                                </div>
        
                            </div>
        
                        </div>
                        <p>800amd</p>
        
                    </div>
        
                </div>
        
            </div>
        </>
    )
}

export default CatItem