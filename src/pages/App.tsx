import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Landing from './Landing';


function App() {

 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/login" element={<Login />}/>
        {/* Other routes... */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;