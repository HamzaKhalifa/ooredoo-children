import React from 'react';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

import './styles.css';

export interface IColors {
    first: string,
    second: string,
    third: string,
    fourth: string,
    firstCorrect?: boolean,
    secondCorrect?: boolean,
    thirdCorrect?: boolean,
    fourthCorrect?: boolean,
}

const Ooredoo: React.FC<IColors> = (colors: IColors) => {
    return (
        <div className='ooredoo__container'>

            <span className='ooredoo__o' style={{color: colors.first} as React.CSSProperties}>
                <span>O</span>
                <span className='ooredoo__check_icon' style={{color: colors.firstCorrect ? 'green' : 'red'} as React.CSSProperties}>
                    {colors.firstCorrect ? <FaCheckCircle/> : <FaTimesCircle/>}
                </span>
            </span>


            <span className='ooredoo__o' style={{color: colors.second} as React.CSSProperties}>
                <span>O</span>
                <span className='ooredoo__check_icon' style={{color: colors.secondCorrect ? 'green' : 'red'} as React.CSSProperties}>
                    {colors.secondCorrect ? <FaCheckCircle/> : <FaTimesCircle/>}
                </span>
            </span>

            <span className='ooredoo__other_letters'>R</span>
            <span className='ooredoo__other_letters'>E</span>
            <span className='ooredoo__other_letters'>D</span>

            <span className='ooredoo__o' style={{color: colors.third} as React.CSSProperties}>
                <span>O</span>
                <span className='ooredoo__check_icon' style={{color: colors.thirdCorrect ? 'green' : 'red'} as React.CSSProperties}>
                    {colors.thirdCorrect ? <FaCheckCircle/> : <FaTimesCircle/>}
                </span>
            </span>

            <span className='ooredoo__o' style={{color: colors.fourth} as React.CSSProperties}>
                <span>O</span>
                <span className='ooredoo__check_icon' style={{color: colors.fourthCorrect ? 'green' : 'red'} as React.CSSProperties}>
                    {colors.fourthCorrect ? <FaCheckCircle/> : <FaTimesCircle/>}
                </span>
            </span>

        </div>
    )
}

export default Ooredoo;
