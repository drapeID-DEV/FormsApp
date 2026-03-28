import { useForm } from 'react-hook-form'
import type {
	FormFilledAnswers,
	ICreateFormInput
} from '../shared/types/form.types'
import { useSubmitResponseMutation } from '../services/api/baseApi'
import { useNavigate } from 'react-router-dom'
import { NavigationBtn } from './NavigationBtn'
import { QuestionField } from './FormAnswerInput'

interface Props {
	id: string
	form: ICreateFormInput
}

export function FormView({ id, form }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<FormFilledAnswers>()

	const [submitResponse] = useSubmitResponseMutation()
	const navigate = useNavigate()

	const onSubmit = async (data: FormFilledAnswers) => {
		const answers = data.answers.map((value, index) => ({
			questionIndex: index,
			value: Array.isArray(value) ? value.join(', ') : value
		}))

		await submitResponse({
			formId: id,
			answers
		})

		navigate('/')
		alert('Form submitted')
	}

	return (
		<div className="flex flex-col w-full">
			<div>
				<NavigationBtn title="Home" url="/" />
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6 w-150 m-auto mt-20"
			>
				<h1 className="text-2xl font-semibold m-auto">{form.title}</h1>
				{form.questions.map((item, index) => (
					<QuestionField
						key={index}
						item={item}
						index={index}
						register={register}
						errors={errors}
					/>
				))}
				<button
					type="submit"
					disabled={isSubmitting}
					className="bg-blue-500 text-white p-3 rounded hover:bg-blue-900 hover:text-neutral-300 hover:cursor-pointer duration-200 disabled:opacity-50"
				>
					{isSubmitting ? 'Submitting...' : 'Submit'}
				</button>
			</form>
		</div>
	)
}
