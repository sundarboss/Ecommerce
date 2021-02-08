import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Cartitem from '../Components/Cartitem';
import Loading from '../Components/Loading';
import Authcontext from '../context/context';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


const styles = (theme) => ({
    ...theme.spreadThis
});

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            loading: true
        }
    }

    static contextType = Authcontext;

    onIncrement = (productid) => {
        const updatedCart = this.state.cart;
        updatedCart.forEach((item) => {
            if (item._id === productid) {
                item.qty = item.qty + 1;
                item.total = item.qty * item.price;
            }
        });
        this.setState({cart: updatedCart})
    }

    onDecrement = (productid) => {
        const updatedCart = this.state.cart;
        updatedCart.forEach((item) => {
            if (item._id === productid) {
                item.qty = item.qty - 1;
                item.total = item.qty * item.price;
            }
        });
        this.setState({cart: updatedCart})
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/user/cartdetails', {
            headers: {
                "auth-token": this.context.token
            }
        })
        .then((res) => {
            console.log(res.data)
            const tempCart = res.data.cart;
            tempCart.forEach(product => {
                if (product.stock > 0) {
                    product.qty = 1;
                    product.total = product.qty * product.price;
                } else {
                    product.qty = 0;
                    product.total = 0;
                }
            });
            console.log(tempCart)
            this.setState({cart: tempCart, loading: false})
        })
        .catch(err => {
            console.log(err);
        })
    }

    onRemoveCart = (productid) => {
        axios.put('http://127.0.0.1:5000/api/user/removefromcart', {
            productId: productid
        }, {
            headers: {
                "auth-token": this.context.token
            }
        })
        .then((res) => {
            this.setState(prevState => {
                const tempCart = [...prevState.cart];
                const updatedCart = tempCart.filter((product) => {
                    return product._id !== productid
                });
                return {cart: updatedCart}
            });
            this.context.updateUserCart(productid, 'remove');
        })
        .catch(err => {
            console.log(err);
        })
    }

    onPlaceOrder = () => {
        var prodDetail = this.state.cart.filter((item) => {
            return item.stock > 0;
        });
        this.props.history.push({
            pathname: '/buynow',
            state: { products: [...prodDetail], cartPage: true }
        });
    }

    render() {
        const { classes } = this.props;

        const cartlist = this.state.cart.map((product) => {
            return (<Cartitem
                     key={product._id}
                     id={product._id}
                     name={product.name}
                     price={product.price}
                     stock={product.stock}
                     image={product.image}
                     qty={product.qty}
                     total={product.total}
                     onIncrement={this.onIncrement}
                     onDecrement={this.onDecrement}
                     onRemoveCart={this.onRemoveCart} 
                    />)
        });

        const totalQty = this.state.cart.reduce((sum, item) => sum + item.qty, 0);
        const totalAmount = this.state.cart.reduce((sum, item) => sum + item.total, 0);

        return (
            <div className={classes.cartPage}>
                {this.state.loading ? (<Loading />) : 
                (<Grid container spacing={4}>
                    <Grid item xs={9}>
                        <Typography variant="h5" className={classes.mycart}>
                            My Cart ({this.state.cart.length})
                        </Typography>
                        {cartlist}
                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={5} className={classes.priceBox}>
                            <Typography variant="h5" className={classes.priceItems}>
                                Cart Details
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
                                    {`$${totalAmount}`}
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
                                    {`$${totalAmount}`}
                                </Typography>
                            </div>
                            <div className={classes.priceItems}>
                            <Button variant="contained" color="secondary" size="large" onClick={this.onPlaceOrder} className={classes.orderButton} disabled={this.state.cart.length > 0 ? false : true}>
                                Place Order
                            </Button>
                            </div>   
                        </Paper>
                    </Grid>
                </Grid>)}
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Cart));