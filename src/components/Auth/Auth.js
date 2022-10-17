import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { signin, signup } from "../../actions/auth";
import useStyles from "./styles";
import Input from "./Input";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [formData, setFormData] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    const switchMode = () => {
        setFormData(initialState);
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }

    };
    
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                        <Grid container justifyContent="center">
                            {/* <div id="signInDiv"></div> */}
                        </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid>
                            <Button onClick={switchMode}>
                                { isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;