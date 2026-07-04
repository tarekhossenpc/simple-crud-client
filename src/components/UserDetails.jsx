import React from 'react';
import { useLoaderData } from 'react-router';

const UserDetails = () => {
    const userData = useLoaderData()
    console.log("user info",userData)
    return (
        <div>
            <ul>
                <li>Name: {userData.name}</li>
                <li>Email: {userData.email}</li>
            </ul>
        </div>
    );
};

export default UserDetails;