import {useEffect, useState} from 'react';
import axios from 'axios';
import '../../../App.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {Button, ListItemButton, ListItemText, Typography} from "@mui/material";

function ShowMonthsList() {
    const [months, setMonths] = useState([]);

    useEffect(() => {
        axios
            .get('https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/match')
            .then((res) => {
                let months = [];
                res.data.forEach((month) => {
                    if(Object.keys(month._id).length === 0)
                        console.log(month)
                    else
                        months.push(month)
                })
                setMonths(months);
            })
            .catch((err) => {
                console.log('Error from ShowMonthsList');
            });
    }, []);

    const monthKey = {
        "January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12
    }

    months.sort(function (a, b) {
        if (a._id.year === b._id.year)
            return monthKey[a._id.month] < monthKey[b._id.month] ? 1 : -1;
        else return a._id.year < b._id.year ? 1 : -1;
    })

    const monthsList =
        months.length === 0
            ? 'there is no match record!'
            : months.map((month, k) =>
                <ListItem disablePadding>
                    <ListItemButton component="a" href={`/match/show-match/${month._id.month}/${month._id.year}`}>
                        <ListItemText key={k} primary={month._id.month + ", " + month._id.year}/>
                    </ListItemButton>
                </ListItem>
            );
    return (
        <div className='ShowMonthsList'>
            <div className='container'>

                <div className='row'>
                    <div className='col-md-12'>
                        <br/>
                        <Typography variant="h2" gutterBottom>
                            Month List
                        </Typography>
                        <Button variant="outlined" href="/match/create-month">Add New Month</Button>
                        <hr/>
                    </div>

                </div>

                <List>
                    {monthsList}
                </List>
            </div>
        </div>
    );
}

export default ShowMonthsList;