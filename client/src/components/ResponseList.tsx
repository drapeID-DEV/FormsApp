import { useParams } from 'react-router-dom'
import { useGetFormQuery, useGetResponsesQuery } from '../services/api/baseApi'

export function ResponsesList() {
	const { id } = useParams()
	const { data: responses, isLoading } = useGetResponsesQuery(id!)
	const { data: form } = useGetFormQuery(id!)

	if (isLoading) return <div>Loading...</div>

	return (
		<>
			{responses?.map((res, index) => (
				<div key={index} className="border p-4 mb-4 rounded">
					{res.answers.map((answ, answId) => {
						const question = form?.questions[answ.questionIndex]

						return (
							<div key={`${index}-${answId}`}>
								<strong>{question?.title}:</strong> {answ.value}
							</div>
						)
					})}
				</div>
			))}
		</>
	)
}
