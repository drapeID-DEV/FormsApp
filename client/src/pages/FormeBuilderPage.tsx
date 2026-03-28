import { FormBuilder } from '../components/FormBuilder'
import { NavigationBtn } from '../components/NavigationBtn'

export function FormeBuilderPage() {
	return (
		<div className="px-10 py-5">
			<NavigationBtn title="Home" url="/" />
			<FormBuilder />
		</div>
	)
}
