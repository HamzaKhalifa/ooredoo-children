import React, { useState, useContext } from 'react'
import { CirclePicker } from 'react-color';
import { RouteComponentProps } from 'react-router-dom';

import Ooredoo, { IColors } from '../../components/ooreedoo/Ooredoo';
import { IntroContext } from '../Intro/Intro';
import { defaultColors } from '../Intro/Intro';
import MyModal from '../../components/myModal/MyModal';
import { getRandomColors } from '../Intro/Intro';

import styles from './styles';

interface IPlay {
    response: IColors,
    attempts: number,
    isModalOpen: boolean,
}

const initialState: IPlay = {
    response: {
        first: '#000',
        second: '#000',
        third: '#000',
        fourth: '#000'
    },
    attempts: 0,
    isModalOpen: false
}

const Play: React.FunctionComponent<RouteComponentProps> = (props: RouteComponentProps) => {
    const[play, setPlay] = useState<IPlay>(initialState);
    const { colors, setColors } = useContext(IntroContext);

    const setColor: Function = (color: string, property: string) => {
        setPlay({
            ...play,
            response: {
                ...play.response,
                [property]: color
            },
        });
    }

    const submit = () => {
        setPlay({
            ...play,
            attempts: play.attempts + 1,
            response: {
                ...play.response,
                firstCorrect: play.response.first === colors.first,
                secondCorrect: play.response.second === colors.second,
                thirdCorrect: play.response.third === colors.third,
                fourthCorrect: play.response.fourth === colors.fourth
            },
            isModalOpen: (play.response.first === colors.first 
                && play.response.second === colors.second
                && play.response.third === colors.third
                && play.response.fourth === colors.fourth)
        })
    }

    const ray = ['first', 'second', 'third', 'fourth']
    return (
        <div style={styles.container as React.CSSProperties} >
            <Ooredoo {...play.response} />
            <p style={styles.attempts}>Attempts: {play.attempts}</p>

            <div style={styles.circlePickers as React.CSSProperties}>
                {ray.map((element, index) => (
                    <div key={index} style={styles.singleCirclePicker as React.CSSProperties}>
                        <CirclePicker colors={defaultColors} onChangeComplete={(color) => { setColor(color.hex, element); }} />
                    </div>
                ))}
            </div>

            <button style={styles.backButton as React.CSSProperties} onClick={submit}>Submit To Check!</button>

            <button style={{...styles.backButton, backgroundColor: '#ff9800'}} onClick={() => {
                setPlay(initialState);
                props.history.push('/');
            }}>BACK</button>

            <MyModal 
                isOpen={play.isModalOpen} 
                onRequestClose={() => {
                setPlay(initialState);
                setColors(getRandomColors());
            }} 
                attempts={play.attempts}
                contentLabel='Congratulations!'
            />
        </div>
    )
}

export default Play
