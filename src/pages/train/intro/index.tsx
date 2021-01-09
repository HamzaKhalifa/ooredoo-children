import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LeaveButton from '../../../components/leave-button';
import trainUtils from '../trainUtils';
import { TrainIntroContext } from './context';

import Train, { ITrain } from '../../../components/train';

import './styles.css';

const TrainIntro: React.FC<RouteComponentProps> = (props) => {

    const { train, setTrain } = useContext(TrainIntroContext);

    useEffect(() => {
        setTrain(trainUtils.generateRandomTrain());
    }, []);

    const onChange = (e) => {
        let newTrain: ITrain = {...train};

        // If we are trying to change the operator (the index 1 is that of the operator)
        if (e.target.name == '1') {
            let value = e.target.value;

            // If the operator's length given is superior to 1, then we take the last character in the operator
            if (value.length > 1) {
                value = value[value.length - 1];
            }
            // We don't do anything if we are changing an operator and the value given isn't an operator
            if (['+', 'x'].indexOf(value + '') === -1) {
                return;
            }

            newTrain.wagons[1].value = value;
        } else {
            let value = parseInt(e.target.value);

            if (isNaN(value)) {
                value = 0;
            }
            value %= 10;
            
            newTrain.wagons[e.target.name].value = value + '';
        }
        
        trainUtils.calculateAndInjectResult(newTrain);

        setTrain(newTrain);
    }
    
    return (
        <div className="train_intro__container">
            <Train onChange={onChange} train={train} />

            <button onClick={() => {props.history.push('/train/play')}} className="train_intro__play_button">
                Start
            </button>

            <LeaveButton />
        </div>
    )
}

export default TrainIntro
