import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

import Orderitemadmin from '../../Components/Orderitemadmin';
import Authcontext from '../../context/context';
import Alert from '../../Components/Alert';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Vieworder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: {},
            orderSuccess: false
        };
    }

    static contextType = Authcontext;

    componentDidMount() {
        this.setState({order: this.props.location.state.order});
    }

    onDeliverOrder = () => {
        axios.put('http://127.0.0.1:5000/api/admin/markorder', {
            orderId: this.state.order._id
        }, {
            headers: {
                "auth-token": this.context.token
            }
        })
        .then((res) => {
            this.setState(prevState => {
                const updatedOrder = {...prevState.order};
                updatedOrder.status = true;
                updatedOrder.deliverydate = res.data.deliverydate;
                return {order: updatedOrder, orderSuccess: true};
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    onOrderSuccessClose = () => {
        this.setState({orderSuccess: false});
    }

    render() {
        const { classes } = this.props;
        
        const orderItems = this.state.order.details && this.state.order.details.map((prod) => {
            return (
                <Orderitemadmin 
                 key={prod._id}
                 image={prod.image}
                 name={prod.name}
                 qty={prod.qty}
                 total={prod.total}
                />
            )
        });

        return (
            <div className={classes.adminContainer}>
                <Paper elevation={6} className={classes.adminPaper}>
                    <div className={classes.adminHeaderContainer}>
                        <Typography variant="h4" className={classes.adminHeaderText}>
                            Order Detail
                        </Typography>
                        <Typography variant="body1" className={classes.adminHeaderSubText}>
                            View details of the order
                        </Typography>
                    </div>
                    <div className={classes.productForm}>
                        <div className={classes.orderFieldPair}>
                            <div className={classes.orderTextfield}>
                                <Typography variant="h5">
                                    Order ID
                                </Typography>
                                <Typography variant="h6" className={classes.productDetailText}>
                                    {this.state.order._id}
                                </Typography>
                            </div>
                            <div className={classes.orderTextfield}>
                                <Typography variant="h5">
                                    Order Date
                                </Typography>
                                <Typography variant="h6" className={classes.productDetailText}>
                                    {new Date(this.state.order.date).toDateString().split(' ').slice(1).join(' ')}
                                </Typography>
                            </div>
                            <div className={classes.orderTextfield}>
                                <Typography variant="h5">
                                    Delivery Date
                                </Typography>
                                <Typography variant="h6" className={classes.productDetailText}>
                                    {this.state.order.status ? new Date(this.state.order.deliverydate).toDateString().split(' ').slice(1).join(' ') : 'Yet to be delivered'}
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.orderFieldPair}>
                            <div className={classes.orderTextfield}>
                                <Typography variant="h5">
                                    No. of Items
                                </Typography>
                                <Typography variant="h6" className={classes.productDetailText}>
                                    {this.state.order.details && this.state.order.details.length}
                                </Typography>
                            </div>
                            <div className={classes.orderTextfield}>
                                <Typography variant="h5">
                                    Order Value
                                </Typography>
                                <Typography variant="h6" className={classes.productDetailText}>
                                    ${this.state.order.value}
                                </Typography>
                            </div>
                            <div className={classes.orderTextfield}>
                                <Typography variant="h5">
                                    Mode of Payment
                                </Typography>
                                <Typography variant="h6" className={classes.productDetailText}>
                                    {this.state.order.paymentmode}
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.orderFieldPair}>
                            <div className={classes.orderTextfield}>
                                <Typography variant="h5">
                                    Consumer Name and Address
                                </Typography>
                                <Typography variant="h6" className={classes.productDetailText}>
                                    {this.state.order.userid && this.state.order.userid.name}
                                </Typography>
                                <Typography variant="h6" className={classes.productDetailText}>
                                    {this.state.order.userid && this.state.order.userid.address}
                                </Typography>
                                <Typography variant="h6" className={classes.productDetailText}>
                                    {this.state.order.userid && this.state.order.userid.state}
                                </Typography>
                                <Typography variant="h6" className={classes.productDetailText}>
                                    {this.state.order.userid && this.state.order.userid.country}
                                </Typography>
                                <Typography variant="h6" className={classes.productDetailText}>
                                    Ph: {this.state.order.userid && this.state.order.userid.phone}
                                </Typography>
                            </div>
                            <div className={classes.orderTextfield}>
                                <Typography variant="h5">
                                    Status
                                </Typography>
                                <div className={classes.orderCard}>
                                {this.state.order.status ?
                                        (<CheckCircleIcon className={classes.deliveryTick} />) :
                                        (<ErrorIcon color="secondary" className={classes.orderBoxDeliveryIcon} />)}
                                <Typography variant="h6" className={this.state.order.status ? classes.orderCompletedText : classes.orderPendingText}>
                                    {this.state.order.status ? 'Order Delivered' : 'Delivery Pending'}
                                </Typography>
                                </div>
                            </div>
                        </div>
                        <div className={classes.orderGrid}>
                            <Typography variant="h5" style={{marginBottom: '1.5rem'}}>
                                Items in the Order
                            </Typography>
                            <Grid container spacing={3}>
                                {orderItems}
                            </Grid>
                        </div>
                        <div className={classes.productDetailButtons}>
                            <div>
                                <Button variant="contained" color="secondary" component={Link} to="/admin/order" className={classes.productActionButton}>
                                    Go Back
                                </Button>
                            </div>
                            {!this.state.order.status &&
                            (<div>
                                <Button variant="contained" onClick={this.onDeliverOrder} className={`${classes.productActionButton} ${classes.productDetailDeleteButton}`}>
                                    Deliver Order
                                </Button>
                            </div>)}
                        </div>
                    </div>
                </Paper>
                <Alert
                 title="Order Deliver Success"
                 content="Order delivered successfully!"
                 buttonText="OK"
                 openStatus={this.state.orderSuccess}
                 onDialogClose={this.onOrderSuccessClose}
                 onButtonClick={this.onOrderSuccessClose}
                 cancelButton={false}
                />
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Vieworder));