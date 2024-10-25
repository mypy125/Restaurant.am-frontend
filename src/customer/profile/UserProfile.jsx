import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../state/authentication/Action'; 

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>No user data found</p>;

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p> 
            <p>Email: {user.email}</p>
            <p>Favorites: {user.favorites?.map(item => <span key={item.id}>{item.name}</span>)}</p>
        </div>
    );
};

export default UserProfile;
