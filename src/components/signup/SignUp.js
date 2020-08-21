import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, TextField } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));




export default function SignUp() {

    const classes = useStyles();


    const [formState, setFormState] = useState({
        first: "",
        last: "",
        username: "",
        password: "",
    });


    const inputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const formSubmit = (e) => {
        e.preventDefault();
        setFormState({
            first: "",
            last: "",
            username: "",
            password: "",
        });
    };


    return (

        // <Container maxWidth="sm">
        //             <Typography component="div" style={{ backgroundColor: '#7FFF00', height: '100vh' }} />


        <form className={classes.root} noValidate autoComplete="off" onSubmit={formSubmit} name="form">

            <TextField id="outlined-basic" label="First Name" variant="outlined" value={formState.first}
                onChange={inputChange} />
            <TextField id="outlined-basic" label="Last Name" variant="outlined" value={formState.last}
                onChange={inputChange} />
            <TextField id="outlined-basic" label="Username" variant="outlined" value={formState.username}
                onChange={inputChange} />
            <TextField id="outlined-basic" label="Password" variant="outlined" value={formState.password}
                onChange={inputChange} />
            <div className={classes.root}>
                <Button variant="contained" color="primary" disableElevation>
                    Submit
            </Button>
            </div>
        </form>
        // </Container>

    );
}







