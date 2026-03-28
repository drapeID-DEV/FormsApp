import type { IFormPreview } from '../shared/types/form.types'
import { NavigationBtn } from './NavigationBtn'

interface Props {
	form: IFormPreview
}

export function FormCard({ form }: Props) {
	return (
		<div
			key={form.id}
			className="bg-white text-black p-4 rounded-xl shadow-sm border w-2xl flex justify-between"
		>
			<div className="flex flex-col gap-1">
				<h2 className="text-xl font-medium">{form.title}</h2>
				<p className="text-gray-500">{form.description}</p>
			</div>
			<div className="flex gap-3">
				<NavigationBtn title="Fill" url={`/forms/${form.id}/fill`} />
				<NavigationBtn
					title="Responses"
					url={`/forms/${form.id}/responses`}
				/>
			</div>
		</div>
	)
}
