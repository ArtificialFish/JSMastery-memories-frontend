import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination/Pagination";

import useStyles from "./styles";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");
    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    
    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            navigate(`/posts/search?=searchQuery${search || "none"}&tags=${tags.join(",")}`);
        } else {
            navigate("/");
        }
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer} >
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} justifyContent="space-between">
                        <Paper position="static">
                            <Grid className={classes.searchGrid} position="static">
                                <TextField 
                                    name="search" 
                                    variant="outlined" 
                                    label="Search Memories"
                                    onKeyDown={handleKeyPress}
                                    fullWidth
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <ChipInput 
                                    style={{ margin: "10px 0" }}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search Tags"
                                    variant="outlined"
                                    fullWidth
                                />
                                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary" fullWidth>Search</Button>
                            </Grid>
                        </Paper>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;