import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const styles = (theme) => ({
    ...theme.spreadThis
});

const Orderitemadmin = (props) => {

    const { classes } = props;

    return (
        <Grid item xs={4}>
            <Card className={classes.orderCard}>
                <CardMedia
                    className={classes.orderCardMedia}
                    component="img"
                    src={`/${props.image}`}
                    title={props.name}
                />
                <div>
                    <CardContent>
                        <Typography component="h5" variant="h5" className={classes.orderContentText}>
                            {props.name}
                        </Typography>
                        <Typography variant="h6" className={classes.orderContentText}>
                            Quantity: {props.qty}
                        </Typography>
                        <Typography variant="h6" className={classes.orderContentText} style={{fontWeight: 'bold'}}>
                            ${props.total}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    )
}

export default withStyles(styles)(Orderitemadmin);