import { ITrain, EWagonType } from '../../components/train';
import utils from '../../utils';

type TrainUtilsType = {
    generateRandomTrain: () => ITrain
    calculateAndInjectResult: (ITrain) => void,
    getResult: (value1: string, value2: string, operator: string) => number
    printTrain: (train: ITrain) => void,
}

export const initialTrain: ITrain = {
    wagons: [
        {
            type: EWagonType.Normal,
            value: '0', 
            canChange: true,
        },
        {
            type: EWagonType.Short,
            value: '+',
            canChange: true,
        },
        {
            type: EWagonType.Normal,
            value: '0',
            canChange: true,
        },
        {
            type: EWagonType.Short,
            value: '=',
            canChange: false,
        },
        {
            type: EWagonType.Normal,
            value: '0',
            canChange: false,
        },
    ]
}

const trainUtils: TrainUtilsType = {
    generateRandomTrain() {
        let train: ITrain = {...initialTrain};
        let value1: number = utils.getRandomInt(0, 9);
        let value2: number = utils.getRandomInt(0, 9);
    
        let operators: string[] = ['+', 'x'];
    
        let operator = operators[utils.getRandomInt(0, operators.length - 1)];
    
        train.wagons[1].value = operator;
        train.wagons[0].value = value1 + '';
        train.wagons[2].value = value2 + '';

        this.calculateAndInjectResult(train);
    
        return train;
    },
    calculateAndInjectResult(theTrain: ITrain) {
        let value1 = parseInt(theTrain.wagons[0].value);
        let value2 = parseInt(theTrain.wagons[2].value);
        let result: number;
    
        switch(theTrain.wagons[1].value) {
            case '+': 
                result = value1 + value2;
            break;
            case '-':
                result = value1 - value2;
                break;
            case 'x': 
                result = value1 * value2;
            break;
            default: 
                result = value1 + value2;
                break;
        }
    
        // Set the result
        theTrain.wagons[theTrain.wagons.length - 1].value = result + '';
    },
    getResult: (value1: string, value2: string, operator: string) => {
        let result = 0;
        switch(operator) {
            case '+':
                result = parseInt(value1) + parseInt(value2);
            break;
            case '-': 
                result = parseInt(value1) - parseInt(value2);
            break;
            case 'x':
                result = parseInt(value1) * parseInt(value2);
            break;
            default:
                result = parseInt(value1) + parseInt(value2);
                break;
        }

        return result;
    },
    printTrain(train: ITrain) {
        let trainValues: string = '';
        
        train.wagons.forEach(wagon => {
            trainValues += wagon.value + ' ';
        });
        
        console.log(trainValues);
    },
}

export default trainUtils;