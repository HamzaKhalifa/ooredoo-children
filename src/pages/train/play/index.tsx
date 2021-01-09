import React, { useContext, useState, useEffect } from 'react'
import LeaveButton from '../../../components/leave-button';
import Train from '../../../components/train';
import { TrainIntroContext, TrainIntroContextType } from '../intro/context';
import trainUtils from '../trainUtils';
import { ITrain } from '../../../components/train';
import utils from '../../../utils';
import MyModal from '../../../components/myModal/MyModal';

import './styles.css';

interface IState {
    modalOpen: boolean,
    attempts: number,
    responseTrain: ITrain
}
const TrainPlay: React.FC = () => {
    const [state, setState] = useState<IState>({
        modalOpen: false,
        attempts: 0,
        responseTrain: {wagons: []}
    });

    const trainIntroContext: TrainIntroContextType = useContext<TrainIntroContextType>(TrainIntroContext);

    useEffect(() => {
        setState({
            ...state,
            responseTrain: generateResponseTrain()
        });
    }, [trainIntroContext]);

    const generateResponseTrain = (): ITrain => {
        let randomValue = utils.getRandomInt(0, 9) + '';
        let responseTrain: ITrain = {
            wagons: [
                {
                    type: 0,
                    value: trainIntroContext.train.wagons[0].value,
                    canChange: false,
                    text: 'O'
                },
                {
                    type: 1,
                    value: '',
                    canChange: false,
                },
                {
                    type: 0,
                    value: trainIntroContext.train.wagons[4].value,
                    canChange: false,
                    text: 'O'
                },
                {
                    type: 1,
                    value: '--',
                    canChange: false,
                    text: 'RED'
                },
                {
                    type: 0,
                    value: randomValue + '',
                    canChange: false,
                    text: 'O'
                },
                {
                    type: 1,
                    value: '',
                    canChange: false,
                },
                {
                    type: 0,
                    value: '0',
                    canChange: true,
                    text: 'O'
                },
            ]
        }

        return responseTrain;
    }

    const onChange = (e) => {
        let responseTrain = {...state.responseTrain};

        // If we have an empty input, then we set to 0
        if (e.target.value === '') {
            responseTrain.wagons[6].value = '0';
            setState({...state, responseTrain});
            return;
        }

        let value: number = parseInt(e.target.value);

        // If we entered a string, then we don't alter the train
        if (isNaN(value) || value > 100) return;

        responseTrain.wagons[6].value = value + '';
        setState({...state, responseTrain});
    }

    const submit = () => {
        // We make an operator between the first given number of response train and the second given number of train intro
        let result = trainUtils.getResult(state.responseTrain.wagons[4].value, trainIntroContext.train.wagons[2].value, trainIntroContext.train.wagons[1].value);

        let win: boolean = (result + '' === state.responseTrain.wagons[6].value);

        setState({
            ...state,
            modalOpen: win,
            attempts: state.attempts + 1,
        })
    }

    const reset = () => {
        trainIntroContext.setTrain(trainUtils.generateRandomTrain());
        setState({
            ...state,
            responseTrain: generateResponseTrain(),
            modalOpen: false,
            attempts: 0
        });
    } 

    return (
        <div className="train__play_container">
            <Train train={state.responseTrain} onChange={onChange} />
            
            <p className='train_play__attempts'>Attempts: {state.attempts}</p>

            <button onClick={submit} className="train_play__submit_button">
                Submit
            </button>

            <MyModal 
                onRequestClose={reset}  
                attempts={state.attempts}
                isOpen={state.modalOpen}
                contentLabel='Congratulations!'
            />
            <LeaveButton />
        </div>
    )
}

export default TrainPlay;
