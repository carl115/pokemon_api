import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Session } from '../App';

export default function SessionUrl() {
    const session = useContext(Session);

    if(session.exitsUser) {
        return <Navigate to="/allpokemons" />
    }
    
    return <Outlet/>;
}
