import React from 'react';
import useStyles from '../../utilities/Styles';
import { Container, Typography, TextField, Button } from '@material-ui/core'
import { useForm } from "../../hooks/useForm";
import { logIn } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router";




export default function SignIn() {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles();
  const error = useSelector(state => state.error)


  const init = {
    username: '',
    password: ''
  }


  const [formState, inputChange, formSubmit] = useForm(init, () => {
    dispatch(logIn(formState, () => history.push('/user')))
  });

  if (localStorage.getItem('token')) {
    return <Redirect to='/user' />
  }


  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={formSubmit} name="form">
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={inputChange}
            name="username"
          />
          <TextField
            id="password"
            label="Password"
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
        {error && <div>{error} </div>}
      </div>
    </Container>

  )
}