import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Alert from '../components/Alert';

export default function Register() {
    const navigate = useNavigate();

    /* INPUT VALUES */
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    /*-/-*/

    /* STYLES */

    //FORM
    const styleForm = "bg-gray-700/[.7] w-2/5 h-5/6 px-14 py-20 border-2 border-violet-700 flex flex-col justify-between rounded-md shadow-[0_0px_15px_-0px_rgba(109,40,217,0.50)] shadow-[0_0px_25px_-0px_rgba(109,40,217,0.50)] shadow-[0_0px_45px_-0px_rgba(109,40,217,0.50)]";

    //INPUTS
    const [inputError, setInputError] = useState("border-gray-800");
    const styleInput = `bg-gray-900 w-full p-2 border-2 ${inputError} text-violet-700 text-lg placeholder-gray-700 rounded-sm focus:outline-0 focus:border-violet-700 focus:shadow-[0_0px_15px_-0px_rgba(109,40,217,0.50)]`;

    /*-/-*/

    /* ALERT */
    const [textAlert, setTextAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    /*-/-*/

    /* HANDLES */
    const HandleChangeUsername = e => {
        setUserName(e.target.value);
    }

    const HandleChangePassword = e => {
        setPassword(e.target.value);
    }

    const HandleChangeConfirmPassword = e => {
        setConfirmPassword(e.target.value);
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if(password === confirmPassword) {
            const res = await axios.post('http://localhost:3000/users/register', {
                user_name: userName,
                password
            });

            (res.data.message ? navigate("/") : 
                setInputError("border-red-600"),
                setTextAlert("User name already exists"),
                setShowAlert(true)
            )
        }
        else {
            setInputError("border-red-600");
            setTextAlert("Password incorrect");
            setShowAlert(true);
        }
    }
    /*-/-*/

  return (
    <div className="bg-gray-800 w-full h-screen flex items-center justify-center">
        <form 
            className={styleForm}
            onSubmit={HandleSubmit}
        >
            <h1 className="p-2 text-violet-700 text-2xl font-bold absolute top-[9%] left-[31%]">
                Sign Up
            </h1>
            <div>
                <input 
                    className={styleInput} 
                    type="text" 
                    placeholder="User name" 
                    required
                    onChange={HandleChangeUsername}
                />
                <input 
                    className={styleInput}
                    style={{ marginTop: "20px" }}
                    type="password" 
                    placeholder="Password"
                    required
                    onChange={HandleChangePassword}
                />
                <input 
                    className={styleInput}
                    style={{ marginTop: "20px" }}
                    type="password" 
                    placeholder="Confirm password"
                    required
                    onChange={HandleChangeConfirmPassword}
                />
                <Alert description={textAlert} show={showAlert} />
            </div>
            <div>
                <input className="bg-white w-full py-3 rounded-md hover:cursor-pointer" type="submit" value="Sign up" />
            </div>
        </form>
    </div>
  )
}

