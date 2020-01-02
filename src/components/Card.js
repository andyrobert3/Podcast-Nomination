import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: '20px auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    likes: {
        display: "flex",
        flexDirection: "row"
    }
  }));


export default function PodcastCard(props) {
    const classes = useStyles();

    const [buttonDisabled, setDisable] = useState(false);
    const [voted, setVoteState] = useState(props.voted);
    const [likes, setLikes] = useState(props.likes);
    const [buttonColor, setColor] = useState(props.voted ? "primary" : "secondary");

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="podcast" src={props.thumbnail}/>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {props.title_original}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {props.publisher_original}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {props.description_highlighted}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                    <a href={props.listennotes_url} target="_blank" rel="noopener noreferrer">Read more</a>
                                </Typography>
                            </Grid>
                            <Grid classes={classes.likes}>
                                <Fab color={buttonColor} disabled={buttonDisabled} onClick={!voted ? async () => {
                                    setDisable(true);
                                    setColor("primary");
                                    setVoteState(!voted);
                                    setLikes(likes => likes + 1);

                                    setDisable(await props.onVote(props.id));
                                } : async () => {
                                    setDisable(true);
                                    setVoteState(!voted);
                                    setLikes(likes => likes - 1);
                                    setColor("secondary");

                                    setDisable(await props.unVote(props.id));
                                }} aria-label="like">
                                    <FavoriteIcon />
                                </Fab>
                                <Typography variant="subtitle1">{likes} Likes</Typography>
                            </Grid>
                            
                        </Grid>
                    </Grid>

                </Grid>

            </Paper>

        </div>
    )
}
