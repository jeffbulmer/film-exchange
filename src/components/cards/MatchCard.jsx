import MatchPlayers from "../MatchPlayers";
import '../../App.css';

const MatchCard = (props) => {
    const match = props.match;
    const showTime = props.showTime
    console.log(match);

    return (
        <div className='card-container'>
            <img
                src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
                alt='Match'
                height={200}
            />
            <div className='desc'>
                <MatchPlayers players={match.members}/>
                {showTime === true ?
                    <p>{match.month}, {match.year}</p> : ''
                }
            </div>
        </div>
    );
};

export default MatchCard;