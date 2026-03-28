import type { FormBuilderValues, ICreateFormInput } from "../shared/types/form.types"

export const formatApiRequest = (data: FormBuilderValues): ICreateFormInput => {
    return {
        title: data.title,
        description: data.description,
        questions: data.questions.map((item) => ({
            title: item.title,
            type: item.type,
            options: item.options?.map((o) => o.value),
        })),
    }
}