import React, { useState } from 'react';
import useStyles from '../../utilities/Styles';
import { Container, Typography, TextField, Button } from '@material-ui/core'


export default function SignIn () {
    const classes = useStyles();


    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

    
    
    return (
    <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate onSubmit={formSubmit} name="form">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={inputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={inputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </form>
    </Container>

)}