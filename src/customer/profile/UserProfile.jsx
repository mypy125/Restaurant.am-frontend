import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../state/authentication/Action'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const handleLogout = () => {
        console.log("Logout functionality to be implemented");
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>No user data found</p>;

    return (
        <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
            <AccountCircleIcon sx={{ fontSize: "9rem" }} />
            <h1 className='py-5 text-2xl font-semibold'>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <Button variant='contained' onClick={handleLogout} sx={{ margin: "2rem 0rem" }}>Logout</Button>
            <p>
                Favorites: {user.favorites?.map(item => <span key={item.id}>{item.name}</span>)}
            </p>
        </div>
    );
};

export default UserProfile;
