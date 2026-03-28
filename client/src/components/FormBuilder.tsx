import { useNavigate } from 'react-router-dom'
import { useFormBuilder } from '../hooks/useFormBuilder'
import { useCreateFormMutation } from '../services/api/baseApi'
import type { FormBuilderValues } from '../shared/types/form.types'
import { formatApiRequest } from '../utils/formatApiRequest'
import { AddQuestionBtn } from './AddQuestionBtn'
import { QuestionItem } from './QuestionItem'

export function FormBuilder() {
	const navigate = useNavigate()

	const { form, questionsArray, addQuestion, removeQuestion } =
		useFormBuilder()

	const [createForm, { isLoading }] = useCreateFormMutation()

	const onSubmit = async (data: FormBuilderValues) => {
		const input = formatApiRequest(data)
		await createForm(input)
		navigate('/')
	}

	const questions = form.watch('questions')

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex flex-col gap-6 w-200 m-auto mt-15"
		>
			<input
				{...form.register('title', {
					required: 'Title is required'
				})}
				placeholder="Form title"
				className="p-3 rounded-lg border"
			/>
			{form.formState.errors.title && (
				<span className="text-red-500 text-sm">
					{form.formState.errors.title.message}
				</span>
			)}
			<textarea
				{...form.register('description')}
				placeholder="Description"
				className="p-3 rounded-lg border"
			/>
			<div className="flex flex-col gap-4">
				{questionsArray.fields.map((q, index) => (
					<QuestionItem
						key={q.id}
						index={index}
						control={form.control}
						register={form.register}
						removeQuestion={removeQuestion}
						type={questions?.[index].type}
					/>
				))}
			</div>
			<div className="flex gap-2">
				<AddQuestionBtn
					type="TEXT"
					title="Add Text"
					addQuestion={addQuestion}
				/>
				<AddQuestionBtn
					type="MULTIPLE_CHOICE"
					title="Add Choice"
					addQuestion={addQuestion}
				/>
				<AddQuestionBtn
					type="CHECKBOX"
					title="Add Checkbox"
					addQuestion={addQuestion}
				/>
				<AddQuestionBtn
					type="DATE"
					title="Add Date"
					addQuestion={addQuestion}
				/>
			</div>
			<button
				type="submit"
				disabled={isLoading}
				className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-900 hover:text-neutral-300 hover:cursor-pointer duration-200"
			>
				{isLoading ? 'Saving...' : 'Save form'}
			</button>
		</form>
	)
}
