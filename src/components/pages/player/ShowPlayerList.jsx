import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../../../App.css';
import PlayerCard from "../../cards/PlayerCard";

function ShowPlayerList() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios
            .get('https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/players')
            .then((res) => {
                setPlayers(res.data);
            })
            .catch(() => {
                console.log('Error from ShowPlayerList');
            });
    }, []);

    const playerList =
        players.length === 0
            ? 'there is no player record!'
            : players.map((player, k) => <PlayerCard player={player} key={k}/>);
    return (
        <div className='ShowPlayerList'>
            <div className='container'>
                <div className={"page-title"}>
                    <h2 className='display-4 text-center'>
                        Players List
                    </h2>
                    <Link
                        to='/players/create-player'
                        className='btn btn-outline-warning float-right'
                    >
                        + Add New Player
                    </Link>
                    <hr/>
                </div>
                <div className='card-list'>{playerList}</div>
            </div>
        </div>
    );
}

export default ShowPlayerList;