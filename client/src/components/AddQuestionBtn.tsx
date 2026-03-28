import type { QuestionType } from '../shared/types/form.types'

interface Props {
	type: QuestionType
	title: string
	addQuestion: (type: QuestionType) => void
}

export function AddQuestionBtn({ type, title, addQuestion }: Props) {
	return (
		<button
			type="button"
			onClick={() => addQuestion(type)}
			className="text-black px-3 py-2 bg-gray-200 rounded hover:cursor-pointer hover:bg-neutral-600 duration-200"
		>
			{title}
		</button>
	)
}
