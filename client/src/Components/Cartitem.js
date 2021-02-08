import React from 'react';
import {Link} from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Cartitem extends React.Component {

    onRemoveClick = () => {
        this.props.onRemoveCart(this.props.id);
    }

    getDeliveryDate = () => {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        return deliveryDate.toDateString();
    }

    render() {

        const { classes } = this.props;

        return (
            <Paper className={classes.mycart} elevation={5}>
                <Grid container>
                    <Grid item xs={4}>
                        <img src={'/' + this.props.image} alt={this.props.name} className={classes.cartImageBox} />
                    </Grid>
                    <Grid item xs={5}>
                        <div className={classes.cartNameBox}>
                            <Link to={`/product/${this.props.id}`}>
                            <Typography variant="h5" className={classes.cartNameBox}>
                                {this.props.name}
                            </Typography>
                            </Link>
                            <Typography variant="h4" className={classes.cartNameBox}>
                                {`$${this.props.price}`}
                            </Typography>
                            {this.props.stock > 0 ?
                            (<React.Fragment>
                            <div className={classes.cartNameBoxStock}>
                                <Typography variant="h6" className={classes.cartNameBoxStockMargin}>
                                    In Stock
                                </Typography>
                                <Typography variant="h6">
                                    Delivery By: <span className={classes.deliveryDate}>{this.getDeliveryDate()}</span>
                                </Typography>
                            </div><br />
                            <div className={`${classes.qtyDetails} ${classes.cartNameBox}`}>
                                <Typography variant="h6">
                                    Select quantity:
                                </Typography>
                                <IconButton size="small" onClick={this.props.onDecrement.bind(this, this.props.id)} className={classes.qtyItem} color="primary" disabled={this.props.qty > 1 ? false : true} >
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5" className={classes.qtyItem}>
                                    {this.props.qty}
                                </Typography>
                                <IconButton size="small" onClick={this.props.onIncrement.bind(this, this.props.id)} className={classes.qtyItem} color="primary" disabled={this.props.qty < this.props.stock ? false : true} >
                                    <AddIcon />
                                </IconButton>
                            </div>
                            </React.Fragment>) :
                            (<React.Fragment>
                                <Typography variant="h5" className={`${classes.cartNameBox} ${classes.outStock}`}>
                                    Out of Stock
                                </Typography>
                            </React.Fragment>)}
                        </div>
                    </Grid>
                    <Grid item xs={3} container>
                        <div className={classes.cartNameBoxPrice}>
                            <Typography variant="h3" className={classes.cartNameBox}>
                                {`$${this.props.total}`}
                            </Typography>
                            <Button variant="contained" size="large" fullWidth onClick={this.onRemoveClick} className={classes.removeButton}>
                                Remove
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(Cartitem);