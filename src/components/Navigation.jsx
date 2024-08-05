import '../App.css';
import {AppBar, Box, Button, Divider, Toolbar, Typography} from "@mui/material";

const Navigation = () => {

    const navItems = [
        {
            label: 'Home',
            value: '/'
        },
        {
            label: 'Players',
            value: '/players/'
        },
        {
            label: 'Matches',
            value: '/match/'
        },
        {
            label: 'New Exchange',
            value: '/newExchange'
        }
    ]
    return (
        <AppBar component="nav" sx={{
            position: "unset",
            background: "#7289da",
            borderRadius: "1em"
        }}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant="h6" sx={{my: 2}}>
                    A33 Film Exchange
                </Typography>
                <Divider/>
                <Box>
                    {navItems.map((item) => (
                        <Button key={item.label} href={item.value} sx={{color: "#fff"}}>
                            {item.label}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navigation;