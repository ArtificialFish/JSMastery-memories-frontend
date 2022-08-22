import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";

import PostDetails from "./Components/PostDetails/PostDetails";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";

const App = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    
    return (
    // <GoogleOAuthProvider clientId="1086141858682-tlfmm1vuicva12r449a0iemn5i76vrab.apps.googleusercontent.com">
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" element={ <Navigate to="/posts" />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" />} />
                </Routes>
            </Container>
        </BrowserRouter>
    // </GoogleOAuthProvider>
    );
};

export default App;