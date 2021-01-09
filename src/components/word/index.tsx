import React from 'react'

import { IWord } from './types';

import './styles.css';

interface IWordLetterContainer {
    letter: string,
    value?: string,
    canChange: boolean,
    onChange: (whichO: number, value: any) => void,
    index: number,
    success: boolean,
    version: string,
    ghost?: string,
    numberOfWords: number,
    first: boolean,
    last: boolean
}

const WordLetterContainer: React.FC<IWordLetterContainer> = (props: IWordLetterContainer) => {
    const { letter, value, canChange, index, onChange, ghost, version, first, last, success } = props;

    const onInputChange= (e) => {
        onChange(index, e.target.value);
    }

    let ghostClassToAdd = props.success ? 'word_letter_containe__ghost_success' : '';
    let letterValueOrInputClassToAdd = props.success && ghost ? 'word_letter__value_success' : '';
    let valueOrInputClassToAdd = "";
    if (version === "2" && success) {
        if (first) {
            valueOrInputClassToAdd = "word_letter_container__value_or_input_first";
        }
        if (last) {
            valueOrInputClassToAdd = "word_letter_container__value_or_input_last"
        }
    }

    return (
        <div className="word__letter_container">
            {version === "1" && <div className="word__letter">
                {letter}
            </div>}

            <div
                // style={{
                //     left: version === "2" && first && success ? 'calc(100% *' + (props.numberOfWords + 2) / 2 + ')' : 'inherit',
                //     right: version === "2" && last && success ? 'calc(100% *' + (props.numberOfWords + 2) / 2 + ')' : 'inherit'
                // }} 
                className={"word_letter_container__value_or_input " + valueOrInputClassToAdd}>
                {canChange && 
                    <input value={value} className={`word_letter_container__input ${letterValueOrInputClassToAdd}`} type="text" onChange={onInputChange} />
                }
                {!canChange && 
                    <span className={`word_letter__value ${letterValueOrInputClassToAdd}`}>
                        {value}
                    </span>
                }
                {ghost && version === "1" && <span className={`word_letter_container__ghost ${ghostClassToAdd}`}>{ghost}</span>}
            </div>
        </div>
    )
}


const Word: React.FC<IWord> = (props: IWord) => {
    const { onChange, letters, version, lastWord } = props;

    return (
        <div className="word__container">
            {letters.map((letter, index) => (
                <WordLetterContainer 
                    first={index === 0}
                    last={false}
                    key={index} index={index}
                    success={props.success} 
                    letter={letter.letter} 
                    ghost={letter.ghost}
                    version={props.version}
                    value={letter.value} 
                    numberOfWords={letters.length}
                    canChange={letter.canChange} onChange={onChange} />
            ))}

            {version === "2" &&
                <WordLetterContainer 
                    index={letters.length}
                    success={props.success} 
                    letter={lastWord ? lastWord : "T"} 
                    value={lastWord ? lastWord : "T"} 
                    version={props.version}
                    numberOfWords={letters.length}
                    canChange={false} onChange={onChange} 
                    last={true}
                    first={false}
                    />
            }
        </div>
    )
}

export default Word
