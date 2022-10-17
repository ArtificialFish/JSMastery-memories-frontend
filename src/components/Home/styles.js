import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBarSearch: {
        borderRadius: 4,
        marginBottom: "1rem",
        display: "flex",
        padding: "16px",
    },
    pagination: {
        borderRadius: 4,
        marginTop: "1rem",
        padding: "16px",
    },
    gridContainer: {
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column-reverse",
        },
    },
    searchGrid: {
        padding: theme.spacing(2),
        marginBottom: "1rem",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}));