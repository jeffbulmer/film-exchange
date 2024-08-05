import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "./App.css";

import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getPlayers} from "./features/players/playerSlice";
import Navigation from "./components/Navigation";
import Home from "./components/pages/Home";
import ShowPlayerList from "./components/pages/player/ShowPlayerList";
import UpdatePlayerInfo from "./components/pages/player/UpdatePlayerInfo";
import CreatePlayer from "./components/pages/player/CreatePlayer";
import ShowPlayerDetails from "./components/pages/player/ShowPlayerDetails";

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
          <Route exact path='/players/' element={<ShowPlayerList/>}/>
          <Route path='/players/edit-player/:id' element={<UpdatePlayerInfo/>}/>
          <Route path='/players/create-player' element={<CreatePlayer/>}/>
          <Route path='/players/show-player/:id' element={<ShowPlayerDetails/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
