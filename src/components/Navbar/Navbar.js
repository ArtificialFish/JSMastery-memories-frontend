import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import useStyles from "./styles";
// import memories from "../../images/memories.png";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import * as actionType from "../../constants/actionTypes";

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT});

        navigate("/auth");

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="default">
            <Link to="/" className={classes.brandContainer}>
                {/* <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography> */}
                {/* <img className={classes.image} src={memories} alt="memories" height="60" /> */}
                <img src={memoriesText} alt="icon" height="45px" />
                <img src={memoriesLogo} alt="icon" height="60" className={classes.image} />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button href="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;