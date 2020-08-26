import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@material-ui/core"

import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/actions";
import useStyles from "../../utilities/Styles";
import * as yup from "yup";
import { useHistory, Redirect } from "react-router";
import { useFormValidation } from "../../hooks/useForm";

export default function SignUp() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const history = useHistory()
    const submitError = useSelector(state => state.error)

    const init = {
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    }

    const formSchema = yup.object().shape({
        firstName: yup.string().min(2, "Minimum 2 characters").required("First name is required"),

        lastName: yup.string().min(2, "Minimum 2 characters").required("Last name is required"),

        username: yup.string().min(4, "Must be at least 4 characters").required("Username is required"),

        password: yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
    });

    const [formState, errors, inputChange, formSubmit] = useFormValidation(init, formSchema, () => {
        dispatch(signUp(formState, () => history.push('/user')))
    })


    if (localStorage.getItem('token')) {
        return <Redirect to='/user' />
    }


    return (


        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={formSubmit} name="form">

                    <TextField
                        id="outlined-basic"
                        error={errors.firstName}
                        label="First Name"
                        helperText={errors.firstName}
                        variant="outlined"
                        value={formState.firstName}
                        onChange={inputChange}
                        name={'firstName'}
                        fullWidth
                    />
                    <TextField
                        id="outlined-basic"
                        error={errors.firstName}
                        label="Last Name"
                        helperText={errors.lastName}
                        variant="outlined"
                        value={formState.lastName}
                        onChange={inputChange}
                        name={'lastName'}
                        fullWidth
                    />
                    <TextField
                        id="outlined-basic"
                        error={errors.username}
                        label="Username"
                        helperText={errors.username}
                        variant="outlined"
                        value={formState.username}
                        onChange={inputChange}
                        name={'username'}
                        fullWidth
                    />
                    <TextField
                        id="outlined-basic"
                        error={errors.password}
                        label="Password"
                        helperText={errors.password}
                        variant="outlined"
                        value={formState.password}
                        onChange={inputChange}
                        name={'password'}
                        fullWidth
                    />
                    <div className={classes.submit}>
                        <Button variant="contained" color="primary" disableElevation onClick={formSubmit}>
                            Submit
                </Button>
                    </div>
                    {submitError && <div>{submitError}</div>}
                </form>
            </div>
        </Container>
    );
}







