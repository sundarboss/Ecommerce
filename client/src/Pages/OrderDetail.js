import React from 'react';
import axios from 'axios';

import Authcontext from '../context/context';
import Orderdetailitem from '../Components/Orderdetailitem';
import Stepper from '../Components/Stepper';
import Loading from '../Components/Loading';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

const styles = (theme) => ({
    ...theme.spreadThis
});

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: {},
            deliveryPercent: 0,
            loading: true
        };
    }

    static contextType = Authcontext;

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/api/user/getorderdetail/${this.props.match.params.orderid}`, {
            headers: {
                "auth-token": this.context.token
            }
        })
        .then((res) => {
            this.setState({order: res.data, loading: false });
            if (res.data.status) {
                this.setState({deliveryPercent: 100});
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getDeliveryDate = () => {
        const deliveryDate = new Date(this.state.order.date);
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        return deliveryDate.toDateString().split(' ').slice(1).join(' ');
    }

    render() {
        const { classes } = this.props;

        var orderItems;

        if (this.state.order.details) {
            orderItems = this.state.order.details.map((item) => {
                return (
                    <Orderdetailitem
                     key={item._id}
                     name={item.name}
                     price={item.price}
                     image={item.image}
                     total={item.total}
                     quantity={item.qty}
                    />
                )
            });
        }
        

        return (
            <div className={classes.ordersContainer}>
                {this.state.loading ? (<Loading />) : 
                (<Paper elevation={5}>
                    <Typography variant="h4" className={classes.buynowHeader}>
                        Order Id - {this.state.order._id}
                    </Typography>
                    <Grid container className={classes.orderDetailGrid}>
                        <Grid container spacing={6} item xs={12}>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    Delivery Address
                                </Typography>
                                <Typography variant="h6">
                                    {this.context.user.name}
                                </Typography>
                                <Typography variant="h6">
                                    {this.context.user.address}
                                </Typography>
                                <Typography variant="h6">
                                    {this.context.user.state}
                                </Typography>
                                <Typography variant="h6">
                                    {this.context.user.country}
                                </Typography><br/>
                                <Typography variant="h5">
                                    Phone Number
                                </Typography>
                                <Typography variant="h6">
                                    {this.context.user.phone}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    Order value
                                </Typography>
                                <Typography variant="h4">
                                    ${this.state.order.value}
                                </Typography><br/><br/>
                                <Typography variant="h5">
                                    Mode of Payment
                                </Typography>
                                <Typography variant="h6">
                                    {this.state.order.paymentmode}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={classes.orderBoxDelivery}>
                                    {this.state.order.status ?
                                        (<CheckCircleIcon className={classes.deliveryTick} />) :
                                        (<ErrorIcon color="secondary" className={classes.orderBoxDeliveryIcon} />)}
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                        {this.state.order.status ? `Delivered on ${new Date(this.state.order.deliverydate).toDateString().split(' ').slice(1).join(' ')}` : `Expected delivery date is ${this.getDeliveryDate()}`}
                                    </Typography>
                                </div>
                                <Typography variant="body1" className={classes.deliveryStatusText}>
                                    {this.state.order.status ? 'Your item has been delivered' : 'Your item is yet to be delivered'}
                                </Typography>
                                <br/>
                                <div>
                                    <div className={classes.barHeader}>
                                        <Typography variant="h6" className={classes.barHeaderText}>
                                            Ordered
                                        </Typography>
                                        <Typography variant="h6" className={classes.barHeaderText}>
                                            Delivered
                                        </Typography>
                                    </div>
                                    <div className={classes.stepperBar}>
                                        <Stepper percent={this.state.deliveryPercent} />
                                    </div>
                                    <div className={classes.barHeader}>
                                        <Typography variant="body1">
                                            {new Date(this.state.order.date).toDateString().split(' ').slice(1).join(' ')}
                                        </Typography>
                                        {this.state.order.status && 
                                        (<Typography variant="body1">
                                        {new Date(this.state.order.deliverydate).toDateString().split(' ').slice(1).join(' ')}
                                        </Typography>)}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <br/>
                            <hr/>
                            <br/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5">
                                Order Summary
                            </Typography>
                            {orderItems}
                        </Grid>
                    </Grid>
                </Paper>)}
            </div>
        )
    }
}

export default withStyles(styles)(OrderDetail);