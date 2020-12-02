import React, { useState, createContext, useContext, Dispatch, SetStateAction, FunctionComponent } from 'react';

import Ooredoo from '../../components/ooreedoo/Ooredoo';
import { IColors } from '../../components/ooreedoo/Ooredoo';
import styles from './styles';
import { RouteComponentProps } from 'react-router-dom';

export const defaultColors: string[] = ['#ff0000', '#0000ff', '#008000', '#ffff00']; 

const getRandomInt: Function = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomColor: Function = (colors: string[]): string => {
    const random = getRandomInt(0, colors.length - 1);
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

type contextType = {
    colors: IColors,
    setColors: Dispatch<SetStateAction<IColors>>
}

export const IntroContext = createContext<contextType>({
    colors: getRandomColors(),
    setColors: () => {}
});


export const IntroContextProvider: React.FC = (props) => {
    const [colors, setColors] = useState<IColors>(getRandomColors());

    return (
        <IntroContext.Provider value={{colors, setColors}}>
            {props.children}
        </IntroContext.Provider>
    );
}

const Intro: React.FunctionComponent<RouteComponentProps> = (props: RouteComponentProps) => {
    const { colors, setColors } = useContext(IntroContext);

    const generateRandomColors = () => {
        setColors(getRandomColors())
    }

    return (
        <div style={styles.container as React.CSSProperties}>
            <Ooredoo {...colors} />

            <button style={styles.randomButton} onClick={generateRandomColors}>Click me to generate random colors!</button>

            <button style={{...styles.randomButton, backgroundColor: '#ff9800'}} onClick={() => {
                props.history.push('/play');
            }}>Click Me To Start!</button>
        </div>
    )
}

export default Intro
