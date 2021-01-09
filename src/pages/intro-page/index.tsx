import React, { useLayoutEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext, AppContextType, getRandomBackgroundColor } from '../../AppContext';

import './styles.css';

const Intro: React.FC = () => {
    const appContext: AppContextType = useContext(AppContext);

    useLayoutEffect(() => {
        appContext.setAppContext({
            ...appContext.appContext,
            backgroundColor: getRandomBackgroundColor()
        })
    }, [])
    
    return (
        <div className="intro_page">
            <Link to='/ooredoo-1'>Exercice 1</Link>
            <Link to='/ooredoo-2'>Exercice 2</Link>
            <Link to='/tunisia-telecom/1'>Exercice 3</Link>
            <Link to='/tunisia-telecom/2'>Exercice 4</Link>
            <Link to='/train'>Exercice 5</Link>
        </div>
    )
}

export default Intro
