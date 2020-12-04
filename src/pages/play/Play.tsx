import React, { useState, useContext } from 'react'
import { CirclePicker } from 'react-color';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { RouteComponentProps } from 'react-router-dom';

import Ooredoo, { IColors } from '../../components/ooreedoo/Ooredoo';
import { IntroContext } from '../Intro/Intro';
import { defaultColors } from '../Intro/Intro';
import MyModal from '../../components/myModal/MyModal';
import { getRandomColors } from '../Intro/Intro';

import './styles.css';

interface IPlay {
    response: IColors,
    attempts: number,
    isModalOpen: boolean,
}

const initialState: IPlay = {
    response: {
        first: '#fff',
        second: '#fff',
        third: '#fff',
        fourth: '#fff'
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
        <div className='play__container' >
            <Ooredoo {...play.response} />
            <p className='play__attempts'>Attempts: {play.attempts}</p>

            <div className='play__circle_pickers'>
                {ray.map((element, index) => (
                    <div key={index} className='play__single_circle_picker' style={{ borderColor: play.response[element]} as React.CSSProperties}>
                        <CirclePicker value='#0000ff' colors={defaultColors} onChangeComplete={(color) => { setColor(color.hex, element); }} />
                        <span className='play__close_o' style={{color: play.response[element]} as React.CSSProperties}>
                            O 
                            {play.response[element + 'Correct'] ? 
                                <span className='play__close_or_correct_or_false_icon' style={{color: 'green'}}><FaCheckCircle /></span>
                                : <span className='play__close_or_correct_or_false_icon' style={{ color: 'red'}}><FaTimesCircle /></span>}
                        </span>
                    </div>
                ))}
            </div>

            <button className='play__back_button' onClick={submit}>Submit To Check!</button>

            <button className='play__back_button' style={{backgroundColor: 'white'}} onClick={() => {
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
