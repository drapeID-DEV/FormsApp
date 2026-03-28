import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ICreateFormInput, IForm, IFormPreview, IResponse } from '../../shared/types/form.types';
import type { IFormResponse, IGetResponsesResponse, IMultipleFormsResponse, ISubmitResponseInput, ISubmitResponseResult } from '../../shared/types/response.types';

const baseUrl = 'http://localhost:7777/graphql';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Forms', 'Responses'],
    endpoints: (builder) => ({
        getForms: builder.query<IFormPreview[], void>({
            query: () => ({
                url: '',
                method: 'POST',
                body: {
                    query: `
                        query {
                            forms {
                                id
                                title
                                description
                            }
                        }
                    `,
                },
            }),
            transformResponse: (response: IMultipleFormsResponse) => response.data.forms,
            providesTags: ['Forms'],
        }),
        createForm: builder.mutation<IFormPreview, ICreateFormInput>({
            query: (input) => ({
                url: '',
                method: 'POST',
                body: {
                    query: `
                        mutation (
                            $title: String!
                            $description: String
                            $questions: [QuestionInput]
                        ) {
                            createForm(
                                title: $title
                                description: $description
                                questions: $questions
                            ) {
                                id
                                title
                                description
                            }
                        }
                    `,
                    variables: input,
                },
            }),
            invalidatesTags: ['Forms'], //updating forms list after mutation
        }),
        getForm: builder.query<IForm, string>({
            query: (id) => ({
                url: '',
                method: 'POST',
                body: {
                    query: `
                        query ($id: ID!) {
                        form(id: $id) {
                            id
                            title
                            description
                            questions {
                            title
                            type
                            options
                            }
                        }
                        }
                    `,
                    variables: { id },
                },
            }),
            transformResponse: (response: IFormResponse) =>
                response.data.form,
        }),
        submitResponse: builder.mutation<
            { formId: string },
            ISubmitResponseInput
        >({
            query: (input) => ({
                url: '',
                method: 'POST',
                body: {
                    query: `
                        mutation (
                        $formId: ID!
                        $answers: [AnswerInput]
                        ) {
                        submitResponse(
                            formId: $formId
                            answers: $answers
                        ) {
                            formId
                        }
                        }
                    `,
                    variables: input,
                },
            }),

            transformResponse: (response: ISubmitResponseResult) =>
                response.data.submitResponse,
            invalidatesTags: (result, error, input) => [
                { type: 'Responses', id: input.formId }
            ], //revalidate responses after submiting the new one
        }),
        getResponses: builder.query<IResponse[], string>({
            query: (formId) => ({
                url: '',
                method: 'POST',
                body: {
                    query: `
                        query ($formId: ID!) {
                        responses(formId: $formId) {
                            answers {
                            questionIndex
                            value
                            }
                        }
                        }
                    `,
                    variables: { formId },
                },
            }),
            transformResponse: (response: IGetResponsesResponse) => response.data.responses,
            providesTags: (result, error, formId) => [
                { type: 'Responses', id: formId }
            ],
        })
    }),
})

export const { useGetFormsQuery, useCreateFormMutation, useGetFormQuery, useSubmitResponseMutation, useGetResponsesQuery } = baseApi;