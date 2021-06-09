import React, { useState } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router'

const Signin = withRouter(({ history }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const url = "http://localhost:3000/users"

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);
        let user = {
            username: username,
            password: password
        }
        let response = await axios.post(`${url}/signin`, user);

        console.log(response.data);
        if(response.data.status === 200){        
            // Need to store jwt in localstorage
            localStorage.setItem('BSTtoken', response.data.jwt)
            window.alert(response.data.message);
            history.push('/profile');
        }
        else{
            window.alert(response.data.message);
            history.push('/')
        }
    };

    return (
        <div className="container max-w-full mx-auto md:py-24 px-6">
            <div className="text-center text-2xl">LOGIN</div>
            <div className="relative flex flex-wrap">
                <div className="w-full relative">
                    <div className="md:mt-6">
                        <form className="mt-8" onSubmit={handleSubmit}>
                            <div className="mx-auto max-w-lg ">
                                <div className="py-1">
                                    <span className="px-1 text-sm text-gray-600">Username</span>
                                    <input placeholder="Enter username" type="text" value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" />
                                </div>
                                <div className="py-1">
                                    <span className="px-1 text-sm text-gray-600">Password</span>
                                    <input placeholder="Enter password" type="password" value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" />
                                </div>

                                <button className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                                    Sign In
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    )
})

export default Signin;