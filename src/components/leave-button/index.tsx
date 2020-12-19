import React from 'react'
import { Link } from 'react-router-dom';

import './styles.css';

const LeaveButton: React.FC = () => {
    return (
        <div className="leave_button">
            <Link to='/'>Leave</Link>
        </div>
    )
}

export default LeaveButton
