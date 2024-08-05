import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "./App.css";

import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getPlayers} from "./features/players/playerSlice";
import Navigation from "./components/Navigation";
import Home from "./components/pages/Home";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getPlayers());
    },
    [])

  return (
    <Router>
      <div>
        <Navigation/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          {/*<Route exact path='/players/' element={<ShowPlayerList/>}/>*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
