import React, { useContext, useState, useEffect } from 'react'
import MyModal from '../../../components/myModal/MyModal';

import { TunisiaTelecomIntroContext, TunisiaTelecomContextType, generateRandomStatements } from '../intro';
import Word from '../../../components/word';
import { ILetter } from '../../../components/word/types';
import utils from '../../../utils';
import { RouteComponentProps } from 'react-router-dom';

import './styles.css';
import LeaveButton from '../../../components/leave-button';

interface ITunisiaTelecom {
    letters: ILetter[],
    attempts: number,
    isModalOpen: boolean,
    known: [boolean, boolean, boolean, boolean],
    success: boolean,
}

interface IParams {
    version: string
}

const TunisiaTelecomPlay: React.FC<RouteComponentProps<IParams>> = (props: RouteComponentProps<IParams>) => {
    const { match: { params: { version } } } = props;

    const introContext: TunisiaTelecomContextType = useContext<TunisiaTelecomContextType>(TunisiaTelecomIntroContext);
    const [tunisiaTelecom, setTunisiaTelecome] = useState<ITunisiaTelecom>({
        letters:[], 
        attempts: 0,
        isModalOpen: false,
        known: [false, false, false, false],
        success: false
    });

    const reset = () => {
        setTunisiaTelecome({
            ...tunisiaTelecom,
            attempts: 0,
            isModalOpen: false,
        })
        introContext.setStatements(generateRandomStatements());
    }

    const submit = () => {
        const { letters } = tunisiaTelecom;
        let toUse1: number = parseInt(letters[1].value);
        let toUse2: number = parseInt(letters[3].value);
        let operator: string = letters[2].value;

        let tempResult: number = calculate(toUse1, toUse2, operator);
        let rightHandValue: number = parseInt(letters[5].value) * 10 + parseInt(letters[6].value);

        let finalResult: number = calculate(tempResult, rightHandValue, letters[4].value);

        let success: boolean = parseInt(finalResult + '') === parseInt(introContext.statements.result + '');

        setTunisiaTelecome({
            ...tunisiaTelecom,
            attempts: tunisiaTelecom.attempts + 1,
            success
        })

        // Only open the modal after the animation is finished
        setTimeout(() => {
            // setTunisiaTelecome({
            //     ...tunisiaTelecom,
            //     isModalOpen: success,
            // })
        }, 3000);
    }

    const calculate = (toUse1: number, toUse2: number, operator: string): number => {
        switch(operator) {
            case '-':
                    return toUse1 - toUse2;
                case '+':
                    return toUse1 + toUse2;
                case 'x': 
                    return toUse1 * toUse2;
                default:
                    return 0;
        }
    }

    const onChange = (index: number, value: any): void => {
        value = value % 10;
        
        if (isNaN(value)) value = 0;

        let newLetters: ILetter[] = [...tunisiaTelecom.letters];
        newLetters[index].value = value;

        setTunisiaTelecome({
            ...tunisiaTelecom,
            letters: newLetters
        })
    }

    // We need to set the new end results after getting them from the intro context
    useEffect(() => {
        // We don't want to do anything when our into context is still empty
        if (introContext.statements.letters.length <= 0) {
            introContext.setStatements(generateRandomStatements());
            return;
        };

        let unknown1 = utils.getRandomInt(0, 3);
        let unknown2 = unknown1;
        do {
            unknown2 = utils.getRandomInt(0, 3);
        } while (unknown2 === unknown1);
        let newKnown: [boolean, boolean, boolean, boolean] = [true, true, true, true];
        newKnown[unknown1] = false;
        newKnown[unknown2] = false;

        let newLetters = [...introContext.statements.letters];

        let indexesOfChangeables = [1, 3, 5, 6];

        for (let i = 0; i < newKnown.length; i++) {
            console.log(newLetters[indexesOfChangeables[i]]);
            if (!newKnown[i]) {
                newLetters[indexesOfChangeables[i]].value = '0';
            }

            newLetters[indexesOfChangeables[i]].canChange = !newKnown[i];
        }
        // Should never be able to change the operator
        newLetters[2].canChange = false;
        
        setTunisiaTelecome({
            ...tunisiaTelecom,
            letters: newLetters,
            known: newKnown
        });
    }, [introContext]);

    return (
        <div className='tunisia_telecom__play_container'>
            <Word 
                letters={tunisiaTelecom.letters}
                onChange={onChange}
                success={tunisiaTelecom.success}
                version={version}
            />

            <div className='tunisia_telecom_play__expected_result_container'>
                <label className="tunisia_telecom_exepected_result__label">Expected Result:  </label>
                <span className='tuniia_telecom_play__expected_result'>{introContext.statements.result}</span>
            </div>

            <p className='ooredoo_2_play__attempts'>Attempts: {tunisiaTelecom.attempts}</p>

            {!tunisiaTelecom.success &&
                <button onClick={submit} className="tunisia_telecom_play__submit_button">
                    Submit
                </button>
            }

            <MyModal 
                isOpen={tunisiaTelecom.isModalOpen} 
                onRequestClose={reset} 
                attempts={tunisiaTelecom.attempts}
                contentLabel='Congratulations!'
            />

            <LeaveButton />
        </div>
    )
}

export default TunisiaTelecomPlay
