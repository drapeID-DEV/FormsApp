import { useGetFormsQuery } from '../services/api/baseApi'
import { FormCard } from './FormCard'

export function FormsList() {
	const { data, isLoading, error } = useGetFormsQuery()

	if (!data?.length) return <div>No forms yet</div>
	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Something went wrong</div>

	return (
		<div className="flex flex-col gap-4">
			{data.map((form) => (
				<FormCard key={form.id} form={form} />
			))}
		</div>
	)
}
