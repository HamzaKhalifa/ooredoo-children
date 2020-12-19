import React from 'react'

import './styles.css';

interface IOoredoo2LetterContainer {
    letter: string,
    value?: string,
    canChange: boolean,
    onChange: (whichO: number, value: number) => void,
    whichO?: number
}

const Ooredoo2LetterContainer: React.FC<IOoredoo2LetterContainer> = (props: IOoredoo2LetterContainer) => {
    const { letter, value, canChange, whichO, onChange } = props;

    const onInputChange= (e) => {
        onChange(whichO ? whichO : 1, parseInt(e.target.value));
    }

    return (
        <div className="ooredoo_2__letter_container">
            <div className="ooredoo_2__letter">
                {letter}
            </div>
            <div className="ooredoo_2_letter_container__value_or_input">
                {canChange && 
                    <input value={value} className='ooredoo_2_letter_container__input' type="text" onChange={onInputChange} />
                }
                {!canChange && 
                    <span className="ooredoo_2_letter__value">
                        {value}
                    </span>
                }
            </div>
        </div>
    )
}

interface IOoredoo2 {
    o1: number,
    o2: number,
    o3: number,
    o4: number,
    canChangeO1: boolean,
    canChangeO2: boolean,
    canChangeO3: boolean,
    canChangeO4: boolean,
    onChange: (whichO: number, value: number) => void
}

const Ooredoo2: React.FC<IOoredoo2> = (props: IOoredoo2) => {
    const { o1, o2, o3, o4, onChange, canChangeO1, canChangeO2, canChangeO3, canChangeO4 } = props;

    return (
        <div className="ooredoo_2__container">
            <Ooredoo2LetterContainer letter='O' whichO={1} value={`${o1}`} canChange={canChangeO1} onChange={onChange} />

            <Ooredoo2LetterContainer letter='-' value='X' canChange={false} onChange={onChange} />

            <Ooredoo2LetterContainer letter='O' whichO={2} value={`${o2}`} canChange={canChangeO2} onChange={onChange} />

            <Ooredoo2LetterContainer letter='-' canChange={false} onChange={onChange} />

            <Ooredoo2LetterContainer letter='R' canChange={false} onChange={onChange} />
            <Ooredoo2LetterContainer letter='E' value='=' canChange={false} onChange={onChange} />
            <Ooredoo2LetterContainer letter='D' canChange={false} onChange={onChange} />

            <Ooredoo2LetterContainer letter='-' canChange={false} onChange={onChange} />

            <Ooredoo2LetterContainer letter='O' whichO={3} value={`${o3}`} canChange={canChangeO3} onChange={onChange} />

            <Ooredoo2LetterContainer letter='-' canChange={false} onChange={onChange} />

            <Ooredoo2LetterContainer letter='O' whichO={4} value={`${o4}`} canChange={canChangeO4} onChange={onChange} />
        </div>
    )
}

export default Ooredoo2
