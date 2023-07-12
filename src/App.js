
import './App.css';
import {Auth} from "./components/pages/Auth";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/pages/Profile";
import {ExternalProfile} from "./components/pages/ExternalProfile";

function App() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Auth/>}/>
            <Route path='/profile/:username' element={<ExternalProfile/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Routes>
    </>
  );
}

export default App;
