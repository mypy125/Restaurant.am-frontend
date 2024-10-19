import { Height } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";

const EventCard = () => {
    return(
        <div>
            <Card sx={{width:345}}>
                <CardMedia 
                sx={{height:345}}
                image="https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl6emF8ZW58MHx8MHx8fDA%3D"
                />

                <CardContent>
                    <Typography variant="h5">
                        Armenian Fast Food
                    </Typography>
                    <Typography variant="body2">
                        50% of on your first order
                    </Typography>

                    <div className="py-2 space-y-2">
                        <p>{"Gyumri"}</p>
                        <p className="text-sm text-blue-500">February 10, 2025 10:00 pm</p>
                        <p className="text-sm text-red-500">February 11, 2025 10:00 pm</p>
                    </div>
                </CardContent>
                {
                    false && <CardActions>
                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>
                    </CardActions>
                }
            </Card>
        </div>
    )
}

export default EventCard;