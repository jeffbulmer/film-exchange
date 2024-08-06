import {Link} from 'react-router-dom';
import '../App.css';
import {Avatar} from "@mui/material";

const MatchPlayer = (props) => {
    const player = props.player;

    return (
        <div>
            <Avatar alt={player.name} src={`/images/${player._id}.jpg`}/>
            <Link to={`/players/show-player/${player._id}`}>{player.name}</Link>
        </div>
    );
};

export default MatchPlayer;