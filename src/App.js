import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";

const App = () => (

    // <GoogleOAuthProvider clientId="1086141858682-tlfmm1vuicva12r449a0iemn5i76vrab.apps.googleusercontent.com">
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    // </GoogleOAuthProvider>
);

export default App;