
import utils from '../../utils';
import { EOperator } from './types';

type WordUtilsType = {
    getRandomOperator: () => string
}

const wordUtils: WordUtilsType = {
    getRandomOperator: (): string => {
        let operators: EOperator[] = [EOperator.Substraction, EOperator.Multiplication, EOperator.Sum];
        let operator: EOperator = operators[utils.getRandomInt(0, operators.length - 1)];
    
        switch(operator) {
            case EOperator.Substraction:
                return '-';
            case EOperator.Multiplication: 
                return 'x';
            case EOperator.Sum: 
                return '+'
            default: 
                return '-'
        }
    }
}

export default wordUtils;