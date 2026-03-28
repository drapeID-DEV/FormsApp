import type { IForm, IFormPreview, IResponse } from "./form.types"

export interface IMultipleFormsResponse {
    data: {
        forms: IFormPreview[]
    }
}

export interface IFormResponse {
    data: {
        form: IForm
    }
}

export interface IGetResponsesResponse {
    data: {
        responses: IResponse[]
    }
}

export interface ISubmitResponseResult {
    data: {
        submitResponse: {
            formId: string
        }
    }
}

export interface ISubmitAnswerInput {
    questionIndex: number
    value: unknown
}

export interface ISubmitResponseInput {
    formId: string
    answers: ISubmitAnswerInput[]
}