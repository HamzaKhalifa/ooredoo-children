import React, { createContext, Dispatch, useContext, useState, SetStateAction, useEffect } from 'react'
import Word from '../../../components/word';
import { ILetter, ERole } from '../../../components/word/types';
import  wordUtils from '../../../components/word/wordUtils';
import utils from '../../../utils';

import { RouteComponentProps } from 'react-router-dom';

import './styles.css';
import LeaveButton from '../../../components/leave-button';


const initialLetters: ILetter[] = [
    { 
        canChange: false, letter: 'T', value: 'T', role: ERole.Neutral
    },
    { 
        canChange: true, letter: 'U', value: '0', role: ERole.ToUse, ghost: 'E'
    },
    { 
        canChange: true, letter: 'N', value: 'X', role: ERole.Operator, ghost: 'L'
    },
    { 
        canChange: true, letter: 'I', value: '0', role: ERole.ToUse, ghost: 'E'
    },
    { 
        canChange: false, letter: 'S', value: '-', role: ERole.Operator, ghost: 'C'
    },
    { 
        canChange: false, letter: 'I', value: '0', role: ERole.Result, ghost: 'O'
    },
    { 
        canChange: false, letter: 'E', value: '0', role: ERole.Result, ghost: 'M'
    },
]

export type IStatements = {
    letters: ILetter[],
    result: number
}

export type TunisiaTelecomContextType = {
    statements: IStatements,
    setStatements: Dispatch<SetStateAction<IStatements>>
}


const createStatementsWithResult = (statements: IStatements): IStatements => {
    let toUse1: number = parseInt(statements.letters[1].value);
    let toUse2: number = parseInt (statements.letters[3].value);

    let tempResult = 0;
    switch(statements.letters[2].value) {
        case '-':
            tempResult = toUse1 - toUse2;
            break;
        case '+':
            tempResult = toUse1 + toUse2;
            break;
        case 'x': 
            tempResult = toUse1 * toUse2;
            break;
    }

    let numberToAchieve = Math.abs(statements.result - tempResult);

    statements.letters[6].value = numberToAchieve % 10 + '';
    statements.letters[5].value = parseInt(numberToAchieve / 10 + '') + '';

    if (statements.result > tempResult) {
        statements.letters[4].value = '+';
    } else {
        statements.letters[4].value = '-';
    }

    return statements;
}

export const generateRandomStatements: Function = (): IStatements => {
    let statements: IStatements = {
        letters: [...initialLetters],
        result: 0
    }
    
    statements.letters[1].value = utils.getRandomInt(0, 9) + '';
    statements.letters[3].value = utils.getRandomInt(0, 9) + '';

    statements.letters[2].value = wordUtils.getRandomOperator();

    return createStatementsWithResult(statements);
}

// Make the statements random at the start of the intro
export const TunisiaTelecomIntroContext = createContext<TunisiaTelecomContextType>({
    statements: { letters:[], result: 0 },
    setStatements: () => {},
});

export const TunisiaTelecomIntroContextProvider: React.FC = ({ children }) => {
    const[statements, setStatements] = useState<IStatements>({letters: [], result: 0});

    return (
        <TunisiaTelecomIntroContext.Provider value={{statements, setStatements}}>
            {children}
        </TunisiaTelecomIntroContext.Provider>
    )
}

interface IParams {
    version: string
}

const TunisiaTelecom: React.FC<RouteComponentProps<IParams>> = (props: RouteComponentProps<IParams>) => {
    const { setStatements, statements } = useContext<TunisiaTelecomContextType>(TunisiaTelecomIntroContext);

    const { match: { params: { version } } } = props;

    useEffect(() => {
        setStatements(generateRandomStatements());
    }, [])

    const onChange = (index: number, value: any): void => {
        // We only turn into a single digit number when it's not the operator
        if (index != 2) {
            value = value % 10;
            
            if (isNaN(value)) value = 0;
        } else {
            console.log(value + '');
            if (value == '') {
                value = '*'
            } else {
                // If the operator's length given is superior to 1, then we take the last character in the operator
                if (value.length > 1) {
                    value = value[value.length - 1];
                }
                // We don't do anything if we are changing an operator and the value given isn't an operator
                if (['-', '+', 'x'].indexOf(value + '') === -1) {
                    return;
                }
            }
        }

        let newStatements: IStatements = {...statements};
        newStatements.letters[index].value = value + '';
        
        setStatements(createStatementsWithResult(newStatements));
    }

    const onResultChange = (e) => {
        let newStatements: IStatements = {...statements};
        newStatements.result = e.target.value === '' ? '0' : e.target.value;
        setStatements(createStatementsWithResult(newStatements));
    }
    
    return (
        <div className="tunisia_telecom_intro__container">
            <Word 
                onChange={onChange}
                letters={statements.letters}
                success={false}
                version={version}
                lastWord="T"
            /> 

            <div className='tunisia_telelcom__result_input'>
                <label className='tunisia_telecom__result_label'>Final wanted value</label>
                <input className='tunisia_telecom__result_input' type="text" value={statements.result} onChange={onResultChange} />
            </div>

            <button onClick={() => {props.history.push('/tunisia-telecom/play/' + version)}} className="tunisia_telecom_intro__play_button">
                Start
            </button>

            <LeaveButton />
        </div>
    )
}

export default TunisiaTelecom
