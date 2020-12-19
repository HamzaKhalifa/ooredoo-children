import React, { createContext, Dispatch, useContext, useState, SetStateAction } from 'react'
import Ooredoo2 from '../../../components/ooredoo-2';
import utils from '../../../utils';

import { RouteComponentProps } from 'react-router-dom';

import './styles.css';
import LeaveButton from '../../../components/leave-button';

export type IStatements = {
    o1: number,
    o2: number,
    o3: number,
    o4: number,
}

export type Ooredoo2IntroContextType = {
    statements: IStatements,
    setStatements: Dispatch<SetStateAction<IStatements>>
}


const createStatementWithResult = (o1: number, o2: number): IStatements => {
    const newStatements: IStatements = {o1, o2, o3: 0, o4: 0};

    let result = newStatements.o1 * newStatements.o2;

    if (result < 10) newStatements.o3 = 0;
    else {
        newStatements.o3 = parseInt(result / 10 + '');
    }

    newStatements.o4 = result % 10;

    return newStatements;
}

export const generateRandomStatement: Function = (): IStatements => {
    let o1 = utils.getRandomInt(0, 9);
    let o2 = utils.getRandomInt(0, 9);

    return createStatementWithResult(o1, o2);
}

// Make the statements random at the start of the intro
export const Ooredoo2IntroContext = createContext<Ooredoo2IntroContextType>({
    statements: generateRandomStatement(),
    setStatements: () => {},
});

export const Ooredoo2IntroContextProvider: React.FC = ({ children }) => {
    const[statements, setStatements] = useState<IStatements>(generateRandomStatement());

    return (
        <Ooredoo2IntroContext.Provider value={{statements, setStatements}}>
            {children}
        </Ooredoo2IntroContext.Provider>
    )
}

const Ooredoo2Intro: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const { setStatements, statements } = useContext<Ooredoo2IntroContextType>(Ooredoo2IntroContext);

    const setResultValue = (o1: number, o2: number) => {
        setStatements(createStatementWithResult(o1, o2));
    }

    const onChange = (whichO: number, value: number): void => {
        value = value % 10;
        
        if (isNaN(value)) value = 0;

        let o1 = statements.o1;
        let o2 = statements.o2;

        switch(whichO) {
            case 1: 
                o1 = value;
            break; 
            case 2: 
                o2 = value;
            break;
        }

        setResultValue(o1, o2);
    }

    return (
        <div className="ooredoo_2_intro__container">
            <Ooredoo2 onChange={onChange}
                o1={statements.o1} 
                o2={statements.o2} 
                o3={statements.o3} 
                o4={statements.o4} 
                canChangeO1={true}
                canChangeO2={true}
                canChangeO3={false}
                canChangeO4={false}
            />

            <button onClick={() => {props.history.push('/ooredoo-2/play')}} className="ooredoo_2_intro__play_button">
                Start
            </button>


            <LeaveButton />
        </div>
    )
}

export default Ooredoo2Intro
