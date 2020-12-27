import React, { createContext, useState, Dispatch, SetStateAction } from 'react';
import { ITrain } from '../../../components/train';
import { initialTrain } from '../trainUtils';

export type TrainIntroContextType = {
    train: ITrain,
    setTrain: Dispatch<SetStateAction<ITrain>>
}

export const TrainIntroContext = createContext<TrainIntroContextType>({
    train: {wagons:[]},
    setTrain: () => {}
});

export const TrainIntroContextProvider: React.FC = (props) => {
    const [train, setTrain] = useState<ITrain>(initialTrain);

    return (
        <TrainIntroContext.Provider value={{train, setTrain}}>
            {props.children}
        </TrainIntroContext.Provider>
    )
}

export default TrainIntroContextProvider 