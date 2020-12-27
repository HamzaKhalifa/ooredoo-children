import React from 'react'

import './styles.css';
import wagon1 from './wagon1.png';
import wagon2 from './wagon2.png'; 

export enum EWagonType {
    Normal,
    Short
}

interface IWagon {
    value: string,
    type: EWagonType,
    canChange: boolean,
    onChange?: () => void,
}

export interface ITrain {
    wagons: IWagon[],
}

export interface ITrainProps {
    train: ITrain,
    onChange: React.ChangeEventHandler
}

const Train: React.FC<ITrainProps> = (trainProps: ITrainProps) => {
    const { wagons } = trainProps.train;

    return (
        <div className="train__container">
            {wagons.map((wagon, index) => (
                <div key={index} className={wagon.type === EWagonType.Normal ? "train_wagon_container train__normal_wagon_container" : "train_wagon_container train__short_wagon_container"}>
                    {wagon.canChange ? 
                        <input onChange={trainProps.onChange} name={index + ''} value={wagon.value} type="text" className="train__wagon_input" />
                        : 
                        <span className={"train__wagon_value"}>{wagon.value}</span>
                    }
                    <img alt="" src={wagon.type === EWagonType.Normal ? wagon1 : wagon2} 
                        className={wagon.type === EWagonType.Normal ? "train__normal_wagon" : "train__short_wagon"}/>
                </div>
            ))}
        </div>
    )
}

export default Train
