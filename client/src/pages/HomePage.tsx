import { FormsList } from '../components/FormsList'
import { NavigationBtn } from '../components/NavigationBtn'

export function HomePage() {
	return (
		<div className="flex flex-col w-full p-10 items-center">
			<div className="text-white mb-10 flex gap-15 items-center">
				<h1 className="text-4xl">Your forms</h1>
				<NavigationBtn title="Create form" url="/forms/new" />
			</div>
			<FormsList />
		</div>
	)
}
