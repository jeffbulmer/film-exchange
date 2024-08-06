import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import '../../../App.css';
import {Button, ListItemButton, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import MatchPlayers from "../../MatchPlayers";
import List from "@mui/material/List";

const ShowMatchList = (props) => {
    const {month, year} = useParams();

    console.log(month, year);
    // const month = props.month;
    const [match, setMatch] = useState([]);

    useEffect(() => {
        axios
            .get(`https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/match/${month}/${year}`)
            .then((res) => {
                setMatch(res.data);
            })
            .catch((err) => {
                console.log('Error from ShowMatchList');
            });
    }, [month, year]);

    const matchList =
        match.length === 0
            ? 'there is no match record!'
            : match.map((match, k) =>
                <ListItem disablePadding>
                    <ListItemButton>
                        <MatchPlayers players={match.members}/>
                    </ListItemButton>
                </ListItem>)
    // <MatchCard match={match} showTime={false} key={k}/>);
    return (
        <div className='ShowMatchList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br/>
                        <Typography variant="h2" gutterBottom>
                            Matches for {month}, {year}
                        </Typography>
                        <Button variant="outlined" href="/match/create-match">Add New Match</Button>
                        <hr/>
                    </div>
                </div>

                {/*<div className='list'>{matchList}</div>*/}
                <List>
                    {matchList}
                </List>
            </div>
        </div>
    );
}

export default ShowMatchList;