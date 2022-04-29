import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Auth } from "./components/auth/auth";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Auth />} />
			</Routes>
		</div>
	);
}

export default App;
