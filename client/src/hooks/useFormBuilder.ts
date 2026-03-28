import { useForm, useFieldArray } from 'react-hook-form'
import type { FormBuilderValues, QuestionType } from '../shared/types/form.types'

export const useFormBuilder = () => {
    const form = useForm<FormBuilderValues>({
        defaultValues: {
            title: '',
            description: '',
            questions: [],
        },
    })

    const questionsArray = useFieldArray({
        control: form.control,
        name: 'questions',
    })

    const addQuestion = (type: QuestionType) => {
        questionsArray.append({
            title: '',
            type,
            options:
                type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX'
                    ? [{ value: '' }]
                    : [],
        })
    }

    const removeQuestion = (index: number) => {
        questionsArray.remove(index)
    }

    return {
        form,
        questionsArray,
        addQuestion,
        removeQuestion,
    }
}