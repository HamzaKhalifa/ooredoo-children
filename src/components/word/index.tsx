import React from 'react'

import utils from '../../utils';

import './styles.css';

interface IWordLetterContainer {
    letter: string,
    value?: string,
    canChange: boolean,
    onChange: (whichO: number, value: any) => void,
    index: number,
    ghost?: string,
    success: boolean
}

const WordLetterContainer: React.FC<IWordLetterContainer> = (props: IWordLetterContainer) => {
    const { letter, value, canChange, index, onChange, ghost } = props;

    const onInputChange= (e) => {
        onChange(index, e.target.value);
    }


    console.log('success', props.success);
    let ghostClassToAdd = props.success ? 'word_letter_containe__ghost_success' : '';
    let letterValueOrInputClassToAdd = props.success && ghost ? 'word_letter__value_success' : '';

    return (
        <div className="word__letter_container">
            <div className="word__letter">
                {letter}
            </div>
            <div className="word_letter_container__value_or_input">
                {canChange && 
                    <input value={value} className={`word_letter_container__input ${letterValueOrInputClassToAdd}`} type="text" onChange={onInputChange} />
                }
                {!canChange && 
                    <span className={`word_letter__value ${letterValueOrInputClassToAdd}`}>
                        {value}
                    </span>
                }
                {ghost && <span className={`word_letter_container__ghost ${ghostClassToAdd}`}>{ghost}</span>}
            </div>
        </div>
    )
}

export enum ERole {
    ToUse,
    Result,
    Operator, 
    Neutral
}

export enum EOperator {
    Sum,
    Multiplication,
    Substraction
}

export interface ILetter {
    letter: string,
    ghost?: string
    canChange: boolean,
    value: string,
    role: ERole,
}

interface IWord {
    letters: ILetter[]
    onChange: (index: number, value: any) => void,
    success: boolean
}

const Word: React.FC<IWord> = (props: IWord) => {
    const { onChange, letters } = props;

    return (
        <div className="word__container">
            {letters.map((letter, index) => (
                <WordLetterContainer 
                    key={index} index={index}
                    success={props.success} 
                    letter={letter.letter} 
                    ghost={letter.ghost}
                    value={letter.value} canChange={letter.canChange} onChange={onChange} />
            ))}
        </div>
    )
}

export const getRandomOperator = (): string => {
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

export default Word
