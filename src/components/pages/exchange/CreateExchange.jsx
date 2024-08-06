import {useEffect, useState} from 'react';
import Select from 'react-select';
import axios from 'axios';
import {ListItemButton} from "@mui/material";
import MatchPlayers from "../../MatchPlayers";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import store from '../../../app/store'
import {Link} from "react-router-dom";


function getMonth(m) {
  switch (m) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
}

const getAllMembers = async () => {
  try {
    // use data destructuring to get data from the promise object
    let {data: response} = await axios.get('https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/players');
    for (const responseKey in response) {
      const {data: stats} = await axios.get(`https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/players/${response[responseKey]._id}/stats`);
      response[responseKey].matches = stats;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

const checkMatchStatus = async (month, year) => {
  try {
    let {data: response} = await axios.get(`https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/match/${getMonth(month)}/${year}`);
    return response
  } catch (error) {
    return 0
  }
};

const CreateExchange = (props) => {
  const [members, setMembers] = useState([]);
  const [date, setDate] = useState(store.getState().date.next);
  const [selected, setSelected] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchesInfo, setMatchesInfo] = useState([]);
  const [done, setDone] = useState(false);

  let link = '/match/show-match/' + getMonth(store.getState().date.nextMonth) + '/' + store.getState().date.year + '';


  useEffect(() => {
    getAllMembers().then(data => {
        const options = data.map((member) => {
          return {value: member._id, label: member.name, matches: member.matches}
        })
        setMembers(Array.from(new Set(options)));
      }
    );
  }, [])

  useEffect(() => {
    checkMatchStatus(date.month(), date.year()).then(data => {
      if (data !== 0 && data.length > 0) {
        setMatches(data);
        setDone(true);
      }
    })
  }, [date])

  const shuffle = () => {
    let pairs = [];
    let info = [];
    let temp = [];
    selected.forEach((p) => {
      temp.push(p)
    })
    while (temp.length > 0) //while there are two people to match
    {
      let nextPair = []
      if (temp.length === 3) {
        temp.forEach((p) => {
          nextPair.push(p);
        })
        temp = [];
      } else {

        //can improve
        let nextIndex = Math.floor(Math.random() * temp.length);
        let nextMember = temp[nextIndex];
        nextPair.push(nextMember);
        temp.splice(nextIndex, 1)

        //reduce the list to members in the current set who have matched the least amount of times with randomly selected person
        let memberTemp = temp.map((member) => {
          return {
            ...member,
            priority: (nextMember["matches"].hasOwnProperty(member.value)) ? nextMember["matches"][member.value] : 0
          }
        })

        let min = Infinity;
        for (const memberKey in memberTemp) {
          if (memberTemp[memberKey].priority < min) min = memberTemp[memberKey].priority
        }

        memberTemp = memberTemp.filter((member) => {
          return member["priority"] === min
        })
        nextIndex = Math.floor(Math.random() * memberTemp.length);
        nextMember = temp.filter(obj => {
          return obj.value === memberTemp[nextIndex].value
        });
        nextPair.push(nextMember[0]);
        pairs.push(nextPair);
        // console.log(nextPair)

        info.push(memberTemp[0].priority)

        temp = temp.filter(obj => {
          return obj.value !== nextMember[0].value;
        })
      }
    }

    console.log(pairs)
    let exchange = []

    pairs.forEach((pair) => {
      exchange.push(
        {
          members: pair.map((p) => {
            return p.value
          }),
          month: getMonth(date.month()),
          year: date.year()
        }
      )
    })

    setMatches(exchange);
    setMatchesInfo(info);
  }

  const parseExchange = () => {
    matches.forEach((match) => {
      axios.post(`http://localhost:8082/api/match`, match)
        .then((res) => {
          console.log(match)
        })
        .catch((err) => {
          console.log("Error creating match");
        });
    });
  }

  const matchList =
    matches.length === 0
      ? 'there is no match record!'
      : matches.map((match, k) =>
        <ListItem disablePadding key={k}>
          <ListItemButton>
            <MatchPlayers players={match.members} sanity={matchesInfo[k]}/>
          </ListItemButton>
        </ListItem>
      );

  return (
    <div className='CreateExchange'>
      <div className='container'>
        <div className={"page-title"}>
          {done === false &&
          <h2 className='display-4 text-center'>
            Create New Exchange
            for {getMonth(store.getState().date.nextMonth)}, {store.getState().date.year}
          </h2>
          }
          {done === true &&
          <h2 className='display-4 text-center'>
            A33 Film Exchange
            for {getMonth(store.getState().date.nextMonth)}, {store.getState().date.year}
          </h2>
          }
          <hr/>
        </div>
        {done === false &&
        <div className={'settings-grid'}>
          <h3>Who's participating?</h3><br/>
          <div className='row' id={'participants'}>
            <Select
              defaultValue={[]}
              isMulti
              name="players"
              options={members}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(choice) => setSelected((choice))}
            />
          </div>
          <br/>
          {/*<div className={'row'}>*/}
          {/*    <LocalizationProvider dateAdapter={AdapterDayjs}>*/}
          {/*        <DatePicker*/}
          {/*            views={['year', 'month']}*/}
          {/*            label="Film Exchange Month"*/}
          {/*            value={date}*/}
          {/*            onChange={setDate}*/}
          {/*            sx={{*/}
          {/*                '& input': {*/}
          {/*                    color: '#99aab5'*/}
          {/*                },*/}
          {/*                '& label': {color: '#99aab5'},*/}
          {/*                '& svg': {color: '#99aab5'},*/}
          {/*            }}*/}
          {/*        />*/}
          {/*    </LocalizationProvider>*/}
          {/*</div>*/}
          <div className={'row'}>
            <button type="button" onClick={shuffle}>Click Me</button>
          </div>
        </div>
        }
        <List>
          {matchList}
        </List>
        <div className={'row'}>
          {done === false && <button type="button" onClick={parseExchange}>Lock In Partners</button>}
          {done === true &&
          <Link to={link} className='btn btn-outline-warning float-right'>
            More details about the matches for {getMonth(store.getState().date.nextMonth)}, {store.getState().date.year}
          </Link>
          }
        </div>
      </div>
    </div>
  );
}

export default CreateExchange;