import {Link} from 'react-router-dom';
import '../../App.css';
import discord from '../../images/discord-icon.png';
import lb from '../../images/letterboxd-icon.png';



const PlayerCard = (props) => {
    const player = props.player;

    return (
        <div className='card-container'>
            <div className='desc'>
                <h2>
                    <Link to={`/players/show-player/${player._id}`}>{player.name}</Link>
                </h2>
                <p>
                    <img src={discord} className={"third-party-logo"} alt="Discord icon" />
                    {player.discord_username}
                </p>
                <p>
                    <img src={lb} className={"third-party-logo"} alt="Discord icon" />
                    <Link to={player.letterboxd_username}>{player.letterboxd_username.replace("https://letterboxd.com/", "").replace("/", "")}</Link>
                </p>
            </div>
        </div>
    );
};

export default PlayerCard;