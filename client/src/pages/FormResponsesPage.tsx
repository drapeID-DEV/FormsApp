import { NavigationBtn } from '../components/NavigationBtn'
import { ResponsesList } from '../components/ResponseList'

export function FormResponsesPage() {
	return (
		<div className="py-5 px-10">
			<NavigationBtn title="Home" url="/" />
			<div className="p-10 flex flex-col items-center">
				<h1 className="text-4xl text-white mb-4">Responses</h1>
				<ResponsesList />
			</div>
		</div>
	)
}
