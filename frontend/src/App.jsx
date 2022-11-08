import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Session = createContext();

import ProtectedUrl from './components/ProtectedUrl';
import SessionUrl from './components/SessionUrl';
import Login from './pages/Login';
import Register from './pages/Register';
import Pokemons from './pages/Pokemons';
import Pokemon from './pages/Pokemon';

export default function App() {
  const [exitsUser, setExitsUser] = useState(false);

  useEffect(() => {
    if(Cookies.get('signInUser')) {
      setExitsUser(true);
    }
    else {
      setExitsUser(false);
    }
  }, [])

  return(
    <div className="bg-gray-800 w-full h-screen flex align-center justify-center">
      <Session.Provider value={{ exitsUser, setExitsUser }}>
        <BrowserRouter>
          <Routes>
            <Route element={<SessionUrl />}>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Register />} />
            </Route>
            <Route element={<ProtectedUrl />}>
              <Route path="/allpokemons" element={<Pokemons />} />
              <Route path="/:pokemonName/:id" element={<Pokemon />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Session.Provider>
    </div>
  )
}