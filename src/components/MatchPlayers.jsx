import {useEffect, useState} from 'react';
import axios from 'axios';
import '../App.css';
import MatchPlayer from "./MatchPlayer";

function MatchPlayers(props) {
    // console.log(props)
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios
            .post('https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/players/ids', {ids: props.players})
            .then((res) => {
                setPlayers(res.data);
            })
            .catch((err) => {
                console.log('Error from ShowPlayerList');
            });
    }, [props]);

    let message = ""
    switch (props.sanity){
        case 0: message = "These partners have not matched before!"; break;
        case 1: message = "These partners have matched 1 time!"; break;
        case undefined: message = ""; break;
        default: message = "These partners have matched " + props.sanity + " times."; break;
    }
    // console.log(players)

    const playerList =
        players.length === 0
            ? 'there is no player record!'
            : players.map((player, k) => <MatchPlayer player={player} key={k}/>);

    return (
        <div>
            <div className='text-list'>{playerList}</div>
            <h2>{message}</h2>
        </div>

        // have this link to information about the match
    )

}

export default MatchPlayers;