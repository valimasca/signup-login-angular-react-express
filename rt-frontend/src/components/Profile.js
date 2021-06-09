import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {withRouter} from 'react-router'

const Profile = withRouter(({history}) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const url = "http://localhost:3000/users"

    useEffect(() => {
        // Need to send Headers
        let myHeaders = {
            authorization: `Bearer ${localStorage.getItem('BSTtoken')}`
        }
        axios.get(`${url}/profile`, {headers: myHeaders})
        .then(response => {
            console.log(response)
            if(response.data.status === 401){
                window.alert('No token send');
                history.push('/signin')
            }
            else{
                setFirstName(response.data.user.firstName);
                setLastName(response.data.user.lastName);
                setEmail(response.data.user.email);
                setUsername(response.data.user.username);
            }
        })
    })

    return (
        <div className="w-full flex justify-center">
            <div className="w-1/2 rounded material-card bg-gray-200 m-4 ">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl tracking-wide">{username}</div>
                    <div className="text-gray-500 text-sm mb-3">Email: {email}</div>
                    <p className="text-gray-700 text-base">
                        {firstName} {lastName}
                    </p>
                </div>
            </div>
        </div>

    )
})

export default withRouter(Profile);