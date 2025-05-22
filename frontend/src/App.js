import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route 
              path="/" 
              element={<Navigate to="/home" replace />} 
              />
            <Route 
              path="/signup"
              element={<SignUp />}
            />
            <Route 
              path="/login"
              element={<LogIn />}
            />
            <Route
              path="/home"
              element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
