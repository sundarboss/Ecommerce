import React from 'react';
import {Link} from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const styles = (theme) => ({
    ...theme.spreadThis
});

const Product = (props) => {

    const { classes } = props;

    return (
        <Grid item xs={3}>
            <Link to={`/product/${props.id}`}>
                <Card>
                    <CardActionArea>
                        <CardMedia className={classes.cardMedia} component="img" src={'/' + props.image}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                {props.title}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {`${props.specs[0]}...`}
                            </Typography>
                            <Typography className={classes.cardPrice} variant="h5">
                                {`$${props.price}`}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>    
        </Grid>
    )
}

export default withStyles(styles)(Product);