import React, { useContext, useState, useEffect } from 'react'

import Ooredoo2 from '../../../components/ooredoo-2';
import MyModal from '../../../components/myModal/MyModal';
import { generateRandomStatement } from '../intro';

import { Ooredoo2IntroContext, Ooredoo2IntroContextType } from '../intro';
import LeaveButton from '../../../components/leave-button';

import utils from '../../../utils';

import './styles.css';

interface IResponse {
    o1: number,
    o2: number,
    o3: number,
    o4: number
}

interface IOoredoo2 {
    response: IResponse,
    attempts: number,
    isModalOpen: boolean,
    known: [boolean, boolean, boolean, boolean]
}

const Ooredoo2Play: React.FC = () => {
    
    const introContext: Ooredoo2IntroContextType = useContext<Ooredoo2IntroContextType>(Ooredoo2IntroContext);

    const [ooredoo2, setOoredoo2] = useState<IOoredoo2>({
        response: { 
            o1: 0, o2: 0, o3: 0, o4: 0
        },
        attempts: 0,
        isModalOpen: false,
        known: [false, false, false, false]
    });

    // We need to set random unknowns at the beginning 
    useEffect(() => {
        let unknown1 = utils.getRandomInt(0, 3);
        let unknown2 = unknown1;
        do {
            unknown2 = utils.getRandomInt(0, 3);
        } while (unknown2 === unknown1);
        let newKnown: [boolean, boolean, boolean, boolean] = [true, true, true, true];
        newKnown[unknown1] = false;
        newKnown[unknown2] = false;

        setOoredoo2({
            ...ooredoo2,
            known: newKnown,
            response: {
                o1: newKnown[0] ? introContext.statements.o1 : 0,
                o2: newKnown[1] ? introContext.statements.o2 : 0,
                o3: newKnown[2] ? introContext.statements.o3 : 0,
                o4: newKnown[3] ? introContext.statements.o4 : 0,
            }
        })
    }, [introContext]);

    const onChange = (whichO: number, value: number): void => {
        value = value % 10;
        
        if (isNaN(value)) value = 0;

        let newResponse = { ...ooredoo2.response };

        switch (whichO) {
            case 1:
                newResponse.o1 = value;
            break;
            case 2:
                newResponse.o2 = value;
            break;
            case 3:
                newResponse.o3 = value;
            break;
            case 4:
                newResponse.o4 = value;
            break;
        }

        setOoredoo2({
            ...ooredoo2,
            response: newResponse
        });
    }

    const submit = () => {
        const { o1, o2, o3, o4 } = introContext.statements;

        let firstNumbersRight = (ooredoo2.response.o1 === o2 && ooredoo2.response.o2 === o1) 
            || (ooredoo2.response.o1 === o1 && ooredoo2.response.o2 === o2) 
            // If there is a multiplication by zero and one of the first elements is also 0, then the it's valids
            || ((ooredoo2.response.o1 === 0 || ooredoo2.response.o2 === 0) && (o1 === 0 || o2 === 0))

        let correctMultiplication = ooredoo2.response.o1 * ooredoo2.response.o2 === ooredoo2.response.o3 * 10 + ooredoo2.response.o4

        let win = ((firstNumbersRight
            && ooredoo2.response.o3 === o3
            && ooredoo2.response.o4 === o4
        ) || correctMultiplication);

        setOoredoo2({
            ...ooredoo2,
            attempts: ooredoo2.attempts + 1,
            isModalOpen: win
        });
    }

    const reset = () => {
        setOoredoo2({
            ...ooredoo2,
            attempts: 0,
            isModalOpen: false
        });

        // Generate a new random statement
        introContext.setStatements(generateRandomStatement());
    }

    return (
        <>
            <div className='ooredoo_2__play_container'>
                <Ooredoo2 onChange={onChange}
                    o1={ooredoo2.response.o1} 
                    o2={ooredoo2.response.o2} 
                    o3={ooredoo2.response.o3} 
                    o4={ooredoo2.response.o4} 
                    canChangeO1={!ooredoo2.known[0]}
                    canChangeO2={!ooredoo2.known[1]}
                    canChangeO3={!ooredoo2.known[2]}
                    canChangeO4={!ooredoo2.known[3]}
                />

                <p className='ooredoo_2_play__attempts'>Attempts: {ooredoo2.attempts}</p>

                <button onClick={submit} className="ooredoo_2_play__submit_button">
                    Submit
                </button>

                <MyModal 
                    isOpen={ooredoo2.isModalOpen} 
                    onRequestClose={reset} 
                    attempts={ooredoo2.attempts}
                    contentLabel='Congratulations!'
                />
            </div>

            <LeaveButton />
        </>
    )
}

export default Ooredoo2Play
