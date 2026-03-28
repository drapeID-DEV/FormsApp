import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { FormFilledAnswers, IQuestion } from '../shared/types/form.types'

interface Props {
	item: IQuestion
	index: number
	register: UseFormRegister<FormFilledAnswers>
	errors: FieldErrors<FormFilledAnswers>
}

export function QuestionField({ item, index, register, errors }: Props) {
	return (
		<div className="flex flex-col gap-2">
			<label className="font-medium">{item.title}</label>
			{item.type === 'TEXT' && (
				<>
					<input
						{...register(`answers.${index}`, { required: true })}
						className="p-2 border rounded"
					/>
					{errors.answers?.[index] && (
						<span className="text-red-500 text-sm">
							This field is required
						</span>
					)}
				</>
			)}
			{item.type === 'DATE' && (
				<>
					<input
						type="date"
						{...register(`answers.${index}`, { required: true })}
						className="p-2 border rounded"
					/>
					{errors.answers?.[index] && (
						<span className="text-red-500 text-sm">
							Please select a date
						</span>
					)}
				</>
			)}
			{item.type === 'MULTIPLE_CHOICE' &&
				item.options?.map((opt, i) => (
					<label key={i} className="flex gap-2">
						<input
							type="radio"
							value={opt}
							{...register(`answers.${index}`, {
								required: true
							})}
						/>
						{opt}
					</label>
				))}
			{item.type === 'MULTIPLE_CHOICE' && errors.answers?.[index] && (
				<span className="text-red-500 text-sm">
					Please select an option
				</span>
			)}
			{item.type === 'CHECKBOX' &&
				item.options?.map((opt, i) => (
					<label key={i} className="flex gap-2">
						<input
							type="checkbox"
							value={opt}
							{...register(`answers.${index}`, {
								validate: (value) =>
									(value && value.length > 0) ||
									'Select at least one option'
							})}
						/>
						{opt}
					</label>
				))}
			{item.type === 'CHECKBOX' && errors.answers?.[index] && (
				<span className="text-red-500 text-sm">
					{errors.answers[index]?.message as string}
				</span>
			)}
		</div>
	)
}
