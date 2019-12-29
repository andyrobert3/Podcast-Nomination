import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
  }));

export default function PodcastCard(props) {
    const classes = useStyles();

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
                            <Grid item>
                                <Typography variant="subtitle1">{props.likes} Likes</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>

            </Paper>

        </div>
    )
}
