import { useFieldArray } from 'react-hook-form'
import type { Control, UseFormRegister } from 'react-hook-form'
import type { FormBuilderValues } from '../shared/types/form.types'

interface Props {
	index: number
	control: Control<FormBuilderValues>
	register: UseFormRegister<FormBuilderValues>
	removeQuestion: (index: number) => void
	type?: string
}

export function QuestionItem({
	index,
	control,
	register,
	removeQuestion,
	type
}: Props) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `questions.${index}.options`
	})

	return (
		<div className="p-4 border rounded-lg bg-white flex flex-col gap-3 text-black">
			<input
				required
				{...register(`questions.${index}.title`)}
				placeholder="Question"
				className="p-2 border rounded"
			/>
			<select
				{...register(`questions.${index}.type`)}
				className="p-2 border rounded"
			>
				<option value="TEXT">Text</option>
				<option value="MULTIPLE_CHOICE">Multiple choice</option>
				<option value="CHECKBOX">Checkbox</option>
				<option value="DATE">Date</option>
			</select>
			{(type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX') && (
				<div className="flex flex-col gap-2">
					{fields.map((field, optIndex) => (
						<div key={field.id} className="flex gap-2">
							<input
								{...register(
									`questions.${index}.options.${optIndex}.value`
								)}
								placeholder="Option"
								className="p-2 border rounded w-full"
							/>

							<button
								type="button"
								onClick={() => remove(optIndex)}
								className="text-red-500 hover:cursor-pointer w-fit"
							>
								Remove
							</button>
						</div>
					))}

					<button
						type="button"
						onClick={() => append({ value: '' })}
						className="text-blue-500 text-sm hover:cursor-pointer w-fit m-auto"
					>
						Add option
					</button>
				</div>
			)}
			<button
				type="button"
				onClick={() => removeQuestion(index)}
				className="text-red-500 text-sm hover:cursor-pointer w-fit m-auto"
			>
				Delete question
			</button>
		</div>
	)
}
