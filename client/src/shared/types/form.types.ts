export type QuestionType = 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';

//API
export interface IQuestion {
    title: string
    type: QuestionType
    options?: string[]
}

export interface IFormPreview {
    id: string
    title: string
    description?: string
}

export interface IForm extends IFormPreview {
    questions: IQuestion[]
}

export interface FormFilledAnswers {
    answers: (string | string[])[]
}

//UI
export interface IQuestionForm {
    title: string
    type: QuestionType
    options?: { value: string }[]
}

export interface FormBuilderValues {
    title: string
    description?: string
    questions: {
        title: string
        type: QuestionType
        options?: { value: string }[]
    }[]
}

export interface IFormBuilderValues {
    title: string
    description?: string
    questions: IQuestionForm[]
}

export interface ICreateFormInput {
    title: string
    description?: string
    questions: {
        title: string
        type: QuestionType
        options?: string[]
    }[]
}

export interface IAnswer {
    questionIndex: number
    value: string
}

export interface IResponse {
    formId: string
    answers: IAnswer[]
}