import React, { useState } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router'

const Signup = withRouter(({ history }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const url = "http://localhost:3000/users"

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        }
        console.log(user);
        let response = await axios.post(`${url}/signup`, user);

        console.log(response.data);
        window.alert(response.data.message);
        history.push('/signin')
    };

    return (
        <div className="container max-w-full mx-auto md:py-24 px-6">
            <div className="text-center text-2xl">SIGN UP</div>
            <div className="relative flex flex-wrap">
                <div className="w-full relative">
                    <div className="md:mt-6">
                        <form className="mt-8" onSubmit={handleSubmit}>
                            <div className="mx-auto max-w-lg ">
                                <div className="py-1">
                                    <span className="px-1 text-sm text-gray-600">First Name</span>
                                    <input placeholder="Enter first name" type="text" name="fname" value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                </div>
                                <div className="py-1">
                                    <span className="px-1 text-sm text-gray-600">Last Name</span>
                                    <input placeholder="Enter last name" type="text" name="lname" value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                </div>
                                <div className="py-1">
                                    <span className="px-1 text-sm text-gray-600">Email</span>
                                    <input placeholder="Enter email" type="text" name="email" value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                </div>
                                <div className="py-1">
                                    <span className="px-1 text-sm text-gray-600">Username</span>
                                    <input placeholder="Enter username" type="text" name="username" value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                </div>
                                <div className="py-1">
                                    <span className="px-1 text-sm text-gray-600">Password</span>
                                    <input placeholder="Enter password" type="password" name="password" value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                </div>

                                <button className="mt-3 text-lg font-semibold
            bg-gray-800 w-full text-white rounded-lg
            px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                                    Sign Up
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
})

export default Signup;