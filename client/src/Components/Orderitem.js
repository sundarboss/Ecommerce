import React from 'react';
import {Link} from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = (theme) => ({
    ...theme.spreadThis
});



const Orderitem = (props) => {
    const { classes } = props;

    const getDeliveryDate = () => {
        const deliveryDate = new Date(props.orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        return deliveryDate.toDateString().split(' ').slice(1).join(' ');
    }

    return (
        <Link to={`/order/${props.id}`}>
            <Paper elevation={5} className={classes.orderBox}>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <img src={'/' + props.image} alt={props.name} className={classes.orderImageBox} />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                            {props.name}
                        </Typography><br />
                        <Typography variant="body1">
                            Order date: {new Date(props.orderDate).toLocaleDateString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h5">
                            ${props.price}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={classes.orderBoxDelivery}>
                            {props.status ?
                                (<CheckCircleIcon className={classes.deliveryTick} />) :
                                (<ErrorIcon color="secondary" className={classes.orderBoxDeliveryIcon} />)}
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                {props.status ? `Delivered on ${new Date(props.deliveryDate).toDateString().split(' ').slice(1).join(' ')}` : `Expected delivery date is ${getDeliveryDate()}`}
                            </Typography>
                        </div>
                        <Typography variant="body1">
                            {props.status ? 'Your item has been delivered' : 'Your item is yet to be delivered'}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Link>
    )
}

export default withStyles(styles)(Orderitem);