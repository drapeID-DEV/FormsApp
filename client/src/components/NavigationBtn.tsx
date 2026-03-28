import { useNavigate } from 'react-router-dom'

interface Props {
	title: string
	url: string
}

export function NavigationBtn({ title, url }: Props) {
	const navigate = useNavigate()

	return (
		<button
			onClick={() => navigate(url)}
			className="text-xl hover:cursor-pointer hover:bg-blue-900 hover:text-neutral-300 duration-200 rounded-2xl py-2 px-3 bg-blue-500 text-white"
		>
			{title}
		</button>
	)
}
