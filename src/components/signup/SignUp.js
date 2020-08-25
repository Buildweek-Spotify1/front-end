import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core"

import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/actions";
import useStyles from "../../utilities/Styles";
import * as yup from "yup";
import { useHistory, Redirect } from "react-router";

export default function SignUp() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const history = useHistory()
    const submitError = useSelector(state => state.error)


    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const validateChange = (e) => {
        e.persist();

        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then((valid) => {

                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch((err) => {
                console.log(err);

                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const formSchema = yup.object().shape({
        firstName: yup.string().min(2, "Minimum 2 characters").required("First name is required"),

        lastName: yup.string().min(2, "Minimum 2 characters").required("Last name is required"),

        username: yup.string().min(4, "Must be at least 4 characters").required("Username is required"),

        password: yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
    });

    const inputChange = (e) => {
        e.persist();
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
        validateChange(e);
    };

    const formSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(formState, () => history.push('/user')))
        setFormState({
            firstName: "",
            lastName: "",
            username: "",
            password: "",
        });
    };

    if (localStorage.getItem('token')) {
        return <Redirect to='/user' />
    }


    return (

        // <Container maxWidth="sm">
        //             <Typography component="div" style={{ backgroundColor: '#7FFF00', height: '100vh' }} />


        <form className={classes.root} noValidate autoComplete="off" onSubmit={formSubmit} name="form">
            <TextField
                id="outlined-basic"
                error={errors.firstName}
                label="First Name"
                helperText={errors.firstName}
                variant="outlined"
                value={formState.firstName}
                onChange={inputChange}
                name={'firstName'}
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
            />
            <div className={classes.root}>
                <Button variant="contained" color="primary" disableElevation onClick={formSubmit}>
                    Submit
                </Button>
            </div>
            {submitError && <div>{submitError}</div>}
        </form>
        // </Container>

    );
}







