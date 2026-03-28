import { useParams } from 'react-router-dom'
import { useGetFormQuery } from '../services/api/baseApi'
import { FormView } from '../components/FormView'

export function FormFillPage() {
	const { id } = useParams()
	const { data, isLoading } = useGetFormQuery(id!)

	if (isLoading) return <div>Loading...</div>
	if (!data) return <div>Something went wrong</div>

	return (
		<div className="p-10 flex justify-center">
			<FormView id={id!} form={data} />
		</div>
	)
}
