import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Buyitem from '../Components/Buyitem';
import Authcontext from '../context/context';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const styles = (theme) => ({
    ...theme.spreadThis
});

class Buynow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payment: '',
            error: '',
            order: '',
            orderSuccess: false
        }
    }

    static contextType = Authcontext;

    handleRadioChange = (e) => {
        this.setState({payment: e.target.value});
    }

    onPlaceOrder = () => {
        if (!this.state.payment) {
            this.setState({error: 'Select a valid Payment Option!!'})
        } else {
            console.log(this.props.location.state.products);
            var products = this.props.location.state.products.map((item) => {
                var _id = item._id;
                var qty = item.qty;
                var image = item.image;
                var name = item.name;
                var price = item.price;
                var total = item.total;
                return {_id, qty, image, name, price, total};
            })
            console.log(products);
            const totalValue = this.props.location.state.products.reduce((sum, item) => sum + item.total, 0);

            axios.post('http://127.0.0.1:5000/api/user/createorder', {
                products: products,
                value: totalValue,
                paymentmode: this.state.payment,
                cartpage: this.props.location.state.cartPage
            }, {
                headers: {
                    "auth-token": this.context.token
                }
            })
            .then((res) => {
                console.log(res.data);
                this.setState({order: res.data, orderSuccess: true, error: ''});
                if (this.props.location.state.cartPage === true) {
                    this.context.updateUserCart('', 'empty')
                }
            })
            .catch((err) => {
                console.log(err);
            })            
        }        
    }

    onContinueShopping = () => {
        this.props.history.push('/');
    }

    onGotoMyOrder = () => {
        this.props.history.push(`/orders/${this.context.user.userid}`);
    }

    render() {
        const { classes } = this.props;
        const buyItems = this.props.location.state.products.map((product, i, arr) => {
            return (<React.Fragment key={i}>
                    <Buyitem
                     key={product._id}
                     name={product.name}
                     qty={product.qty}
                     total={product.total}
                     image={product.image}
                    />
                    {((i !== arr.length-1) && <hr/>)}
                    </React.Fragment>)
        });

        const totalQty = this.props.location.state.products.reduce((sum, item) => sum + item.qty, 0);
        const totalAmount = this.props.location.state.products.reduce((sum, item) => sum + item.total, 0);

        return (
            <div className={classes.cartPage}>
                {!this.state.orderSuccess ? 
                (<React.Fragment>
                <Grid container spacing={4}>
                    <Grid item xs={9}>
                        <Paper elevation={5}>
                            <Typography variant="h5" className={classes.buynowHeader}>
                                Delivery Address
                            </Typography>
                            <div className={classes.buynowAddress}>
                                <Typography variant="h6" style={{fontWeight: "bold"}}>
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
                                <Typography variant="h6">
                                    Ph: {this.context.user.phone}
                                </Typography>
                            </div>                         
                        </Paper>
                        <Paper elevation={5} className={classes.buynowProductBox}>
                            <Typography variant="h5" className={classes.buynowHeader}>
                                Product Details
                            </Typography>
                            {buyItems}
                        </Paper>
                        <Paper elevation={5}>
                            <Typography variant="h5" className={classes.buynowHeader}>
                                Payment Detail
                            </Typography>
                            <div className={classes.buynowAddress}>
                                {this.state.error &&
                                (<Typography variant="h6" className={classes.errorMsg}>
                                    {this.state.error}
                                </Typography>)}
                                <FormControl component="fieldset">
                                    <FormLabel component="legend" classes={{root: classes.formLabel}}>Choose a payment option</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={this.state.payment} onChange={this.handleRadioChange}>
                                        <FormControlLabel classes={{label: classes.formRadioButton}} value="cod" control={<Radio />} label="Cash on Delivery" />
                                        <FormControlLabel classes={{label: classes.formRadioButton}} value="gpay" control={<Radio />} label="Google Pay" />
                                    </RadioGroup>
                                </FormControl>
                            </div>                         
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={5} className={classes.priceBox}>
                            <Typography variant="h5" className={classes.priceItems}>
                                Order Details
                            </Typography><hr/>
                            <div className={classes.priceTotalItems}>
                                <Typography variant="h6">
                                    Total Items
                                </Typography>
                                <Typography variant="h6">
                                    {totalQty}
                                </Typography>
                            </div>
                            <div className={classes.priceTotalItems}>
                                <Typography variant="h6">
                                    Price
                                </Typography>
                                <Typography variant="h6">
                                    ${totalAmount}
                                </Typography>
                            </div>
                            <div className={classes.priceTotalItems}>
                                <Typography variant="h6">
                                    Delivery Charge
                                </Typography>
                                <Typography variant="h6">
                                    Free
                                </Typography>
                            </div><hr/>
                            <div className={classes.priceTotalItems}>
                                <Typography variant="h5">
                                    Total Amount
                                </Typography>
                                <Typography variant="h5">
                                    ${totalAmount}
                                </Typography>
                            </div>
                            <div className={classes.priceItems}>
                            <Button variant="contained" color="secondary" size="large" onClick={this.onPlaceOrder} className={classes.orderButton}>
                                Place Order
                            </Button>
                            </div>   
                        </Paper>
                    </Grid>
                </Grid>
                </React.Fragment>) :
                (<React.Fragment>
                <div className={classes.orderMsgBox}>
                    <Typography variant="h4" color="primary">
                        Order Confirmation
                    </Typography><br/>
                    <Typography variant="h6" className={classes.orderSuccessMsg}>
                        Thanks for ordering from eKart!!! Your Order has been Placed Successfully!!
                    </Typography>
                    <Paper elevation={5} className={classes.orderSuccessBox}>
                        <Typography variant="h5" className={classes.orderSuccessNumber}>
                            Your Order Number is {this.state.order._id}
                        </Typography><br/>
                        <Typography variant="h6">
                           Order Date: {new Date(this.state.order.date).toLocaleDateString()}
                        </Typography><br/>
                        <Typography variant="h6">
                           You will receive an email on delivery of your order. Alternatively you can also check the status of your order here.
                        </Typography>
                        <Typography variant="h6">
                           You can also view your order in your order history.
                        </Typography><br/>
                        <div className={classes.orderActionBox}>
                            <Button color="primary" variant="outlined" onClick={this.onContinueShopping} className={classes.continueButton}>
                                Continue Shopping
                            </Button>
                            <Button color="secondary" variant="outlined" onClick={this.onGotoMyOrder} className={classes.continueButton}>
                                Go to My Orders
                            </Button>
                        </div>
                    </Paper>
                </div>
                </React.Fragment>)}
            </div>
        )
    }
}


export default withRouter(withStyles(styles)(Buynow));