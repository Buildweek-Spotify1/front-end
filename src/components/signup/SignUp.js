import React, { useState } from "react";
import useStyles from "../../utilities/Styles";
import { Container, Typography, Button, TextField } from "@material-ui/core";
import { signUp } from "../../redux/actions";
import * as yup from "yup";








export default function SignUp() {

    const classes = useStyles();


    const [formState, setFormState] = useState({
        first: "",
        last: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        first: "",
        last: "",
        username: "",
        password: "",
    });

    const validateChange = (e) => {

                yup
                  .reach(formSchema, e.target.name)
                  .validate(e.target.name  ? e.target.value : null) 
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
        first: yup.string().min(2, "Minimum 2 characters").required("Name is required"),
            
        last: yup.string().min(2, "Minimum 2 characters").required("Last name is required"),
            
        username: yup.string().min(4, "Must be at least 4 characters").required("Username is required"),
            
        password: yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
    });
          
    const inputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
        validateChange(e); 
    };

    const formSubmit = (e) => {
        e.preventDefault();
        setFormState({
            first: "",
            last: "",
            username: "",
            password: "",
        });
        signUp(formState)
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







