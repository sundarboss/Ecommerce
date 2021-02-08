import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    ...theme.spreadThis
});


const Orderdetailitem = (props) => {

    const { classes } = props;

    return (
        <Grid container className={classes.buynowProductItem}>
            <Grid item xs={3}>
                <img src={'/' + props.image} alt={props.name} className={classes.cartImageBox} />
            </Grid>
            <Grid item xs={9}>
                <div className={classes.cartNameBox}>
                    <Typography variant="h4" className={classes.cartNameBox}>
                        {props.name}
                    </Typography>
                    <Typography variant="h4" className={`${classes.cartNameBox} ${classes.orderItemPrice}`}>
                        ${props.total}
                    </Typography><br/>
                    <div className={`${classes.qtyDetails} ${classes.cartNameBox}`}>
                        <Typography variant="h6">
                            Quantity:
                        </Typography>
                        <Typography variant="h5" className={classes.qtyItem}>
                            {props.quantity}
                        </Typography>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Orderdetailitem);