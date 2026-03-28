import { ResponsesList } from '../components/ResponseList'

export function FormResponsesPage() {
	return (
		<div className="p-10 flex flex-col items-center">
			<h1 className="text-4xl text-white mb-4">Responses</h1>
			<ResponsesList />
		</div>
	)
}
