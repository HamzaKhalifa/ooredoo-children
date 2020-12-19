import React from 'react'
import { Link } from 'react-router-dom';

import './styles.css';

const Intro: React.FC = () => {
    return (
        <div className="intro_page">
            <Link to='/ooredoo-1'>Exercice 1</Link>
            <Link to='/ooredoo-2'>Exercice 2</Link>
        </div>
    )
}

export default Intro
