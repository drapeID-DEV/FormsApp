import { Provider } from 'react-redux'
import './App.css'
import { HomePage } from './pages/HomePage'
import { store } from './store/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FormeBuilderPage } from './pages/FormeBuilderPage'
import { FormFillPage } from './pages/FormFillPage'
import { FormResponsesPage } from './pages/FormResponsesPage'

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route
							path="/forms/new"
							element={<FormeBuilderPage />}
						/>
						<Route
							path="/forms/:id/fill"
							element={<FormFillPage />}
						/>
						<Route
							path="/forms/:id/responses"
							element={<FormResponsesPage />}
						/>
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	)
}

export default App
