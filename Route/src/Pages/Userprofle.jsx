import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Userprofile() {
    const [user, setUser] = useState(null); //store user data
    const { id } = useParams(); // reads data from URL
    const [loading, setLoading] = useState(true); //show loading

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json()) 
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>LOADING...</p>;
    if (!user) return <p>NO USER FOUND...</p>;

    return (
        <div>
            <h2>USER PROFILE</h2>
            <p>ID: {user.id}</p>
            <p>NAME: {user.name}</p>
        </div>
    );
}

export default Userprofile;
