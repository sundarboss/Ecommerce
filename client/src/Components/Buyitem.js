import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    ...theme.spreadThis
});

const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    return deliveryDate.toDateString();
}

const Buyitem = (props) => {

    const { classes } = props;

    return (
        <Grid container className={classes.buynowProductItem}>
            <Grid item xs={3}>
                <img src={'/' + props.image} alt={props.name} className={classes.cartImageBox} />
            </Grid>
            <Grid item xs={9}>
                <div className={classes.cartNameBox}>
                    <Typography variant="h5" className={classes.cartNameBox}>
                        {props.name}
                    </Typography>
                    <div className={`${classes.qtyDetails} ${classes.cartNameBox}`}>
                        <Typography variant="h6">
                            Quantity:
                        </Typography>
                        <Typography variant="h5" className={classes.qtyItem}>
                            {props.qty}
                        </Typography>
                    </div>
                    <Typography variant="h4" className={classes.cartNameBox}>
                        ${props.total}
                    </Typography><br />
                    <Typography variant="h6" className={classes.cartNameBox}>
                        Delivery By: <span className={classes.deliveryDate}>{getDeliveryDate()}</span>
                    </Typography>
                </div>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Buyitem);