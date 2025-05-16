import React, { useState, useEffect } from "react";

function Userlist() {
    const [users, setUsers] = useState([]);         // To store fetched data
    const [loading, setLoading] = useState(true);   // For showing loading state
    const [error, setError] = useState(null);       // For showing any error

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json()) // ✅ CALL the json() function
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>LOADING....</p>;
    if (error) return <p>ERROR: {error}</p>;

    return (
        <div>
            <h1>USER DETAILS</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}: {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Userlist;
