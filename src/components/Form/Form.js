import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });

    const post = useSelector((state) => currentId ? state.posts.posts.find((message) => message._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: [], selectedFile: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
        }
        
        clear();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    };

    const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
    };

    const handleDeleteChip = (chipToDelete) => {
        setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
    };

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing" : "Creating" } a Memory</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <div style={{ padding: "5px 0", width: "94%" }}>
                    <ChipInput 
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip) => handleDeleteChip(chip)}
                    />
                </div>
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;