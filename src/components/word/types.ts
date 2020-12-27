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

export interface IWord {
    letters: ILetter[]
    onChange: (index: number, value: any) => void,
    success: boolean,
    version: string,
    lastWord?: string
}

export enum ERole {
    ToUse,
    Result,
    Operator, 
    Neutral
}
