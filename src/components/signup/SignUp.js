import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, TextField } from "@material-ui/core"
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/actions";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));




export default function SignUp() {
    const dispatch = useDispatch()

    const classes = useStyles();


    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
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
        dispatch(signUp(formState))
        setFormState({
            firstName: "",
            lastName: "",
            username: "",
            password: "",
        });
    };


    return (

        // <Container maxWidth="sm">
        //             <Typography component="div" style={{ backgroundColor: '#7FFF00', height: '100vh' }} />


        <form className={classes.root} noValidate autoComplete="off" onSubmit={formSubmit} name="form">

            <TextField id="outlined-basic" name='firstName' label="First Name" variant="outlined" value={formState.firstName}
                onChange={inputChange} />
            <TextField id="outlined-basic" name='lastName' label="Last Name" variant="outlined" value={formState.lastName}
                onChange={inputChange} />
            <TextField id="outlined-basic" name='username' label="Username" variant="outlined" value={formState.username}
                onChange={inputChange} />
            <TextField id="outlined-basic" name='password' label="Password" variant="outlined" value={formState.password}
                onChange={inputChange} />
            <div className={classes.root}>
                <Button variant="contained" color="primary" disableElevation onClick={formSubmit}>
                    Submit
            </Button>
            </div>
        </form>
        // </Container>

    );
}







