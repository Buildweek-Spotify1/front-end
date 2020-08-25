import React, { useState } from "react";
import useStyles from "../../utilities/Styles";
import { Container, Typography, Button, TextField } from "@material-ui/core";
import { signUp } from "../../redux/actions";
import * as yup from "yup";








export default function SignUp() {

    const classes = useStyles();


    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const validateChange = (e) => {

                yup
                  .reach(formSchema, e.target.name)
                  .validate(e.target.value) 
                  .then((valid) => {
              
                    setErrors({
                      ...errors,
                      [e.target.name]: ""
                    });
                  })
                  .catch((err) => {
                    console.log(err);
              
                    setErrors({
                      ...errors,
                      [e.target.name]: err.errors[0]
                    });
                  });
    };

    const formSchema = yup.object().shape({
        firstName: yup.string().min(2, "Minimum 2 characters").required("First name is required"),
            
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
        setFormState({
            firstName: "",
            lastName: "",
            username: "",
            password: "",
        });
        signUp(formState)
    };


    return (

        // <Container maxWidth="sm">
        //             <Typography component="div" style={{ backgroundColor: '#7FFF00', height: '100vh' }} />


        <form className={classes.root} noValidate autoComplete="off" onSubmit={formSubmit} name="form">
                <TextField
                error={errors.firstName}
                name="firstName"
                label="First Name"
                helperText={errors.firstName}
                value={formState.firstName}
                onChange={inputChange}
                />
                <TextField
                error={errors.lastName}
                name="lastName"
                label="Last Name"
                helperText={errors.lastName}
                value={formState.lastName}
                onChange={inputChange}
                />
                <TextField
                error={errors.username}
                name="username"
                label="Username"
                helperText={errors.username}
                value={formState.username}
                onChange={inputChange}
                />
                <TextField
                error={errors.password}
                name="password"
                label="Password"
                helperText={errors.password}
                value={formState.password}
                onChange={inputChange}
                />
            <div className={classes.root}>
                <Button variant="contained" color="primary" disableElevation>
                    Submit
                </Button>
            </div>
        </form>
        // </Container>

    );
}







