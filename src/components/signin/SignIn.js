import React, { useState } from 'react';
import useStyles from '../../utilities/Styles';
import { Container, Typography, TextField, Button } from '@material-ui/core'
import { useFormValidation } from "../../hooks/useForm";
import { logIn } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router";
import * as yup from "yup";




export default function SignIn () {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles();


    const init = {
      email: '',
      password: ''
  }

  const formSchema = yup.object().shape({
    email: yup.string().min(2, "Minimum 2 characters").required("Email is required"),

    password: yup.string().min(2, "Minimum 2 characters").required("Password is required"),
  });


  const [formState, errors, inputChange, formSubmit] = useFormValidation(init, formSchema, () => {
    dispatch(logIn(formState, () => history.push('/user')))
});
    
    
    return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={formSubmit} name="form">
          <TextField
            id="email"
            error={errors.email}
            label="Email Address"
            helperText={errors.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={inputChange}
            name="email"
          />
          <TextField
            id="password"
            error={errors.password}
            label="Password"
            helperText={errors.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            onChange={inputChange}
            name="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>

)}