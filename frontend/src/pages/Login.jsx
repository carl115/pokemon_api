import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Session } from '../App';
import Alert from '../components/Alert';

export default function Login() {
    const session = useContext(Session);
    const navigate = useNavigate();

    /* INPUT VALUES */
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    /*-/-*/

    /* STYLES */

    //FORM
    const styleForm = "bg-gray-700/[.7] w-2/5 h-5/6 px-14 py-20 border-2 border-violet-700 flex flex-col justify-between rounded-md shadow-[0_0px_15px_-0px_rgba(109,40,217,0.50)] shadow-[0_0px_25px_-0px_rgba(109,40,217,0.50)] shadow-[0_0px_45px_-0px_rgba(109,40,217,0.50)]";

    //INPUTS
    const [inputError, setInputError] = useState("border-gray-800");
    const stylesInput = `bg-gray-900 w-full p-2 border-2 ${inputError} text-violet-700 text-lg placeholder-gray-700 rounded-sm focus:outline-0 focus:border-violet-700 focus:shadow-[0_0px_15px_-0px_rgba(109,40,217,0.50)]`;
    /*-/-*/

    /* ALERT */
    const [showAlert, setShowAlert] = useState(false);
    /*-/-*/

    /* HANDLES */
    const HandleChangeUsername = e => {
        setUserName(e.target.value);
    }

    const HandleChangePassword = e => {
        setPassword(e.target.value);
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://localhost:3000/users/login', {
            user_name: userName,
            password
        });

        if(res.data.user) {
            Cookies.set('signInUser', res.data.user, { expires: 1 });
            Cookies.set('userId', res.data.id, { expires: 1 });

            session.setExitsUser(!!Cookies.get('signInUser'));

            navigate("/allpokemons");
        }
        else {
            setInputError("border-red-600");
            setShowAlert(true);
        }
    } 
    /*-/-*/

  return (
    <div className="w-full h-full flex items-center justify-center">
        <form 
            className={styleForm}
            onSubmit={HandleSubmit}
        >
        <h1 className="p-2 text-violet-700 text-2xl font-bold absolute top-[9%] left-[31%]">Sign In</h1>
            <div>
                <input 
                    className={stylesInput} 
                    type="text" 
                    placeholder="User name" 
                    required
                    onChange={HandleChangeUsername}
                />
                <input 
                    className={stylesInput}
                    style={{ marginTop: "20px" }}
                    type="password" 
                    placeholder="Password"
                    required
                    onChange={HandleChangePassword}
                />
                <div className="mt-5 text-white flex">
                    <p>You don't have an account?</p>
                    <Link className="ml-3 text-blue-600 border-b border-blue-700" to="/signup">
                        Sign Up
                    </Link>
                </div>
                <Alert description="User name or password incorrect" show={showAlert} />
            </div>
            <div>
                <input className="bg-white w-full py-3 rounded-md hover:cursor-pointer" type="submit" value="Sign in" />
            </div>
        </form>
    </div>
  )
}
