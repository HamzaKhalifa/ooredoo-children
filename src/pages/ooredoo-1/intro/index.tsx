import React, { useState, createContext, useContext, Dispatch, SetStateAction } from 'react';

import Ooredoo from '../../../components/ooreedoo/Ooredoo';
import { IColors } from '../../../components/ooreedoo/Ooredoo';
import { RouteComponentProps } from 'react-router-dom';
import utils from '../../../utils';

import './styles.css';
import LeaveButton from '../../../components/leave-button';

export const defaultColors: string[] = ['#ff0000', '#0000ff', '#008000', '#ffff00']; 


const getRandomColor: Function = (colors: string[]): string => {
    const random = utils.getRandomInt(0, colors.length - 1);
    return colors[random]
} 

export const getRandomColors: Function = (): IColors => {
    let first: string = getRandomColor(defaultColors);
    let colorsForSecond: string[] = defaultColors.filter(color => color !== first);
    let second: string = getRandomColor(colorsForSecond);
    let colorsForThird: string[] = colorsForSecond.filter(color => color !== second);
    let third: string = getRandomColor(colorsForThird);
    let colorsForFourth: string[] = colorsForThird.filter(color => color !== third);
    let fourth = colorsForFourth[0];

    const colors: IColors = {
        first,
        second,
        third,
        fourth,
        firstCorrect: true,
        secondCorrect: true,
        thirdCorrect: true,
        fourthCorrect: true
    }

    return colors;
}

type ContextType = {
    colors: IColors,
    setColors: Dispatch<SetStateAction<IColors>>
}

export const Ooredoo1IntroContext = createContext<ContextType>({
    colors: getRandomColors(),
    setColors: () => {}
});


export const Ooredoo1IntroContextProvider: React.FC = (props) => {
    const [colors, setColors] = useState<IColors>(getRandomColors());

    return (
        <Ooredoo1IntroContext.Provider value={{colors, setColors}}>
            {props.children}
        </Ooredoo1IntroContext.Provider>
    );
}

const Ooredoo1Intro: React.FunctionComponent<RouteComponentProps> = (props: RouteComponentProps) => {
    const { colors, setColors } = useContext(Ooredoo1IntroContext);

    const generateRandomColors = () => {
        setColors(getRandomColors())
    }

    return (
        <div className='ooredoo_1_intro__container'>
            <Ooredoo {...colors} />

            <button className='ooredoo_1_intro__random_button' onClick={generateRandomColors}>Click me to generate random colors!</button>

            <button className='ooredoo_1_intro__random_button' onClick={() => {
                props.history.push('/ooredoo-1/play');
            }}>Click Me To Start!</button>

            <LeaveButton />
        </div>
    )
}

export default Ooredoo1Intro
