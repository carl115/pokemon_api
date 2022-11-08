import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import axios from 'axios';

import { Session } from '../App';

export default function Pokemons() {
  const session = useContext(Session);
  const navigate = useNavigate();

  const [pokemons, setPokemons] = useState([]);
  const [userName, setUserName] = useState("");

  /* STYLES */

  //SESSION OPTIONS
  const [show, setShow] = useState('hidden');
  const styleProfileOptions = `bg-slate-900 w-60 m-5 text-white rounded-md ${show} flex-col items-center justify-around fixed right-[3.4%] top-16`;

  //ALERT
  const [showAlert, setShowAlert] = useState('hidden');
  const styleAlert = `bg-slate-900 p-5 border-2 border-violet-600 text-white ${showAlert} flex-col rounded-md fixed top-5`;
  
  /*-/-*/

  /* HANDLES */
  const HandleOnClickStylesOptionsProfile = () => {
    (show === 'hidden' ? setShow('flex') : setShow('hidden'))
  }

  const HandleOnClickStylesAlert = () => {
    (showAlert === 'hidden' ? setShowAlert('flex') : setShowAlert('hidden'))
  }

  const HandleOnClickSignOut = () => {
    Cookies.remove('signInUser');

    session.setExitsUser(false);

    if(session.exitsUser) {
      navigate("/");
    }
  }

  const HandleOnClickDeleteAccount = () => {
    const userId = Cookies.get('userId');
    Cookies.remove('signInUser');
    Cookies.remove('userId');

    axios.delete(`http://localhost:3000/users/user/${userId}`);

    session.setExitsUser(false);

    if(session.exitsUser) {
      navigate("/");
    }
  }
  /*-/-*/

  const getPokemons = async () => {
    const url = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const res = await url.json();

    if(pokemons.length == 0) {
      res.results.map(async (p) => {
        const urlAttributes = await fetch(p.url);
        const resAttributes = await urlAttributes.json();
  
        setPokemons(array => [...array, 
          { 
            pokemonName: p.name,
            image: resAttributes.sprites.front_default  
          }
        ]);
      });
    }
  }
  
  useEffect(() => {
    getPokemons();

    if(Cookies.get('signInUser')) {
      setUserName(Cookies.get('signInUser'));
    }
  }, []);

  return (
    <div className="w-full h-full grid justify-items-center content-center grid-cols-4 overflow-y-auto">
      <button 
        className="bg-slate-900 w-60 h-14 m-5 text-white rounded-md flex items-center justify-around fixed right-[3.4%]"
        onClick={HandleOnClickStylesOptionsProfile}
      >
        { userName }
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      <div className={styleProfileOptions}>
        <button 
          className="w-full py-4 mb-1" 
          onClick={HandleOnClickSignOut}
        >
        Sign Out
        </button>
        <button 
          className="w-full py-4 text-red-600" 
          onClick={HandleOnClickStylesAlert}
        >
          Delete account
        </button>
      </div>
      <div className={styleAlert}>
        <h3>
          Are you sure you want to delete the account?
        </h3>
        <div className="mt-10 flex justify-between">
          <button 
            className="bg-green-600 p-2 rounded-md"
            onClick={HandleOnClickDeleteAccount}
          >
            Accept
          </button>
          <button 
            className="bg-red-600 p-2 rounded-md"
            onClick={HandleOnClickStylesAlert}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="h-32 col-start-1 col-end-5"></div>
      {
        pokemons.map((p, i) => {
          return (
            <Link
              to={`/${p.pokemonName}/${i}`}
              className="bg-slate-700 w-60 px-5 my-2 flex justify-between items-center border-2 border-violet-600 rounded-lg hover:cursor-pointer hover:bg-slate-900" 
              key={i}
            >
              <p className="text-violet-600">{p.pokemonName}</p>
              <img src={p.image} />
            </Link>
          )
        })
      }
    </div>
  )
}
