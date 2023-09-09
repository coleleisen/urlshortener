import logo from './logo.svg';
import './App.css';
import Home from './home'
import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path={`/redirect/:url`} element={<Home />}/>
      <Route exact path="/"  element={<Home />}/>         
    </Routes>
    </div>
  );
}

export default App;
