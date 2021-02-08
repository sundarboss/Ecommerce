import React from 'react';
import axios from 'axios';

import Orderitem from '../Components/Orderitem';
import Loading from '../Components/Loading';
import Authcontext from '../context/context';

import withStyles from '@material-ui/core/styles/withStyles';


const styles = (theme) => ({
    ...theme.spreadThis
});

class Order extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            loading: true
        };
    }

    static contextType = Authcontext;

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/user/getorder', {
            headers: {
                "auth-token": this.context.token
            }
        })
        .then((res) => {
            this.setState({orders: res.data, loading: false});
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        const { classes } = this.props;

        var renderedOrders = [];

        this.state.orders.forEach((order) => {
            order.details.forEach((item, i) => {
                renderedOrders.push(
                    <Orderitem
                     key={order._id + i}
                     image={item.image}
                     orderDate={order.date}
                     name={item.name}
                     price={item.price * item.qty}
                     status={order.status}
                     deliveryDate={order.status ? order.deliverydate : ''}
                     id={order._id} 
                    />
                )
            })
        });

        return (
            <div className={classes.ordersContainer}>
                {this.state.loading ? (<Loading />) : renderedOrders }
            </div>
        )
    }
}

export default withStyles(styles)(Order);