import React from 'react';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

import styles from './styles';

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
        <div style={styles.container as React.CSSProperties}>

            <span style={{...styles.o, color: colors.first} as React.CSSProperties}>
                <span>O</span>
                <span style={{...styles.checkIcon, color: colors.firstCorrect ? 'green' : 'red'} as React.CSSProperties}>
                    {colors.firstCorrect ? <FaCheckCircle/> : <FaTimesCircle/>}
                </span>
            </span>


            <span style={{...styles.o, color: colors.second} as React.CSSProperties}>
                <span>O</span>
                <span style={{...styles.checkIcon, color: colors.secondCorrect ? 'green' : 'red'} as React.CSSProperties}>
                    {colors.secondCorrect ? <FaCheckCircle/> : <FaTimesCircle/>}
                </span>
            </span>

            <span style={styles.otherLetters}>R</span>
            <span style={styles.otherLetters}>E</span>
            <span style={styles.otherLetters}>D</span>

            <span style={{...styles.o, color: colors.third} as React.CSSProperties}>
                <span>O</span>
                <span style={{...styles.checkIcon, color: colors.thirdCorrect ? 'green' : 'red'} as React.CSSProperties}>
                    {colors.thirdCorrect ? <FaCheckCircle/> : <FaTimesCircle/>}
                </span>
            </span>


            <span style={{...styles.o, color: colors.fourth} as React.CSSProperties}>
                <span>O</span>
                <span style={{...styles.checkIcon, color: colors.fourthCorrect ? 'green' : 'red'} as React.CSSProperties}>
                    {colors.fourthCorrect ? <FaCheckCircle/> : <FaTimesCircle/>}
                </span>
            </span>

        </div>
    )
}

export default Ooredoo;
