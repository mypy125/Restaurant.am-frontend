import { 
    Button, Modal, Box,
    Grid,
    TextField
 } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction } from "../../customer/state/restaurant/Action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Events = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const {restaurant} = useSelector((store)=>store)
    const jwt = localStorage.getItem("jwt")

    const [formValues, setFormValues] = React.useState({
        image: "",
        location: "",
        name: "",
        startedAt: dayjs(),
        endsAt: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedValues = {
            ...formValues,
            startedAt: formValues.startedAt ? formValues.startedAt.format("MM/DD/YYYY hh:mm A") : null,
            endsAt: formValues.endsAt ? formValues.endsAt.format("MM/DD/YYYY hh:mm A") : null,
        };
        console.log("Submitted values:", formattedValues);
        dispatch(createEventAction({
            data: formValues,
            restaurantId: restaurant.userRestaurant?.id,
            jwt,
        }))
        setFormValues(formValues)
    };

    const handleFormChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date, dateType) => {
        setFormValues({ ...formValues, [dateType]: date });
    };

    return (
        <div>
            <div className="p-5">
                <Button onClick={handleOpen} variant="contained">
                    Create New Event
                </Button>

                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="image"
                                        label="Image URL"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.image}
                                        onChange={handleFormChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="location"
                                        label="Location"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.location}
                                        onChange={handleFormChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        label="Event Name"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.name}
                                        onChange={handleFormChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="Start Date And Time"
                                            value={formValues.startedAt}
                                            onChange={(newValue) => handleDateChange(newValue, "startedAt")}
                                            inputFormat="MM/dd/yyyy hh:mm a"
                                            sx={{ width: "100%" }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="End Date And Time"
                                            value={formValues.endsAt}
                                            onChange={(newValue) => handleDateChange(newValue, "endsAt")}
                                            inputFormat="MM/dd/yyyy hh:mm a"
                                            sx={{ width: "100%" }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button onClick={handleSubmit}
                                        type="submit" 
                                        variant="contained" 
                                        fullWidth 
                                        sx={{ mt: 2 }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};
