import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route 
              path="/signup"
              element={<SignUp />}
            />
            <Route 
              path="/login"
              element={<LogIn />}
            />
            <Route
              path="/"
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
