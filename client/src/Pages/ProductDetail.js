import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Comment from '../Components/Comment';
import Loading from '../Components/Loading';
import Authcontext from '../context/context';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import ShopIcon from '@material-ui/icons/Shop';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const styles = (theme) => ({
    ...theme.spreadThis
});

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            quantity: 1,
            comment: '',
            loading: true
        }
    }

    static contextType = Authcontext;

    componentDidMount() {
        axios.get(`/api/admin/getproduct/${this.props.match.params.productid}`)
        .then((res) => {
            console.log(res.data);
            this.setState({ product: res.data, loading: false })
        })
        .catch(err => {
            console.log(err);
        })
    }

    getDeliveryDate = () => {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        return deliveryDate.toDateString();
    }

    onIncrement = () => {
        const updatedValue = this.state.quantity + 1;
        this.setState({ quantity: updatedValue });
    }

    onDecrement = () => {
        const updatedValue = this.state.quantity - 1;
        this.setState({ quantity: updatedValue });
    }

    onCommentChange = (e) => {
        this.setState({comment: e.target.value});
    }

    onAddComment = () => {
        axios.post(`http://127.0.0.1:5000/api/user/product/comment/${this.state.product._id}`, {
            comment: this.state.comment
        }, {
            headers: {
                "auth-token": this.context.token
            }
        })
        .then(res => {
            this.setState(prevState => {
                const updatedProduct = {...prevState.product};
                updatedProduct.comments.push(res.data);
                return {product: updatedProduct, comment: ''};
            });
        })
        .catch(err => {
            console.log(err)
        })
    }

    onEditComment = (editedcomment, commentid) => {
        axios.put(`http://127.0.0.1:5000/api/user/product/comment/${commentid}`, {
            comment: editedcomment
        }, {
            headers: {
                "auth-token": this.context.token
            }
        })
        .then(res => {
            this.setState(prevState => {
                const updatedProduct = {...prevState.product};
                updatedProduct.comments.forEach(item => {
                    if (item._id === res.data._id) {
                        item.comment = res.data.comment;
                    }
                });
                return {product: updatedProduct};
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    onDeleteComment = (commentid) => {
        axios.delete(`http://127.0.0.1:5000/api/user/product/comment/${commentid}`, {
            headers: {
                "auth-token": this.context.token
            }
        })
        .then(res => {
            this.setState(prevState => {
                const updatedProduct = {...prevState.product};
                const updatedProdComments = updatedProduct.comments.filter((item) => {
                    return item._id !== commentid
                });
                updatedProduct.comments = updatedProdComments;
                return {product: updatedProduct}
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    onAddtoCart = () => {
        if (!this.context.token) {
            this.context.onLoginDialogOpen();
        } else {
            axios.put('http://127.0.0.1:5000/api/user/addtocart', {
                productId: this.props.match.params.productid
            }, {
                headers: {
                    "auth-token": this.context.token
                }
            })
            .then(res => {
                this.context.updateUserCart(this.props.match.params.productid, 'add');
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    onBuyNow = () => {
        if (!this.context.token) {
            this.context.onLoginDialogOpen();
        } else {
            var prodDetail = {...this.state.product};
            prodDetail.qty = this.state.quantity;
            prodDetail.total = this.state.quantity * this.state.product.price;
            this.props.history.push({
                pathname: '/buynow',
                state: { products: [prodDetail], cartPage: false }
            });
        }
    }

    onGoToCart = () => {
        this.props.history.push(`/cart/${this.context.user.userid}`);
    }


    render() {
        const { classes } = this.props;

        var specList = [];

        var commentList;

        if (this.state.product.comments) {
            commentList = this.state.product.comments.map((comment) => {
                return (
                    <Comment 
                     key={comment._id}
                     id={comment._id}
                     username={comment.userid.name}
                     userid={comment.userid._id}
                     comment={comment.comment}
                     onEditComment={this.onEditComment}
                     onDeleteComment={this.onDeleteComment}
                    />
                )
            })
        } else {
            commentList = 'No comments'
        }
        

        if (this.state.product.specs) {
            specList = this.state.product.specs.map((item, i) => {
                return (
                    <li className={classes.specListItem} key={i}>
                        <Typography variant="h6">
                            {item}
                        </Typography>
                    </li>
                )
            });
        }

        return (
            <React.Fragment>
            {this.state.loading ? (<Loading />) : 
            (<Grid container className={classes.productPage}>
                <Grid container spacing={6} item xs={12}>
                    <Grid item xs={4} container justify="center">
                        <img className="product-image" src={'/' + this.state.product.image} alt={this.state.product.name}></img>
                    </Grid>
                    <Grid item xs={4} container>
                        <div className={classes.productDetails}>
                            <Typography variant="h4">
                                {this.state.product.name}
                            </Typography>
                            <a href="#commentSection">
                            <Typography variant="body1" className={classes.commentNumber}>
                                {this.state.product.comments && `${this.state.product.comments.length} comments`}
                            </Typography>
                            </a>
                            <hr className={classes.line}/>
                            <Typography variant="h2">
                                {this.state.product.price && `$${this.state.product.price}`}
                            </Typography>
                            {(this.state.product.stock && this.state.product.stock > 0) ?
                            (<React.Fragment>
                            <Typography variant="h6" gutterBottom className={classes.inStock}>
                                In Stock
                            </Typography><hr/>
                            <Typography variant="h6">
                                Delivery By: <span className={classes.deliveryDate}>{this.getDeliveryDate()}</span>
                            </Typography><hr/>
                            <div className={classes.qtyDetails}>
                                <Typography variant="h6">
                                    Select quantity:
                                </Typography>
                                <IconButton size="small" className={classes.qtyItem} onClick={this.onDecrement} color="primary" disabled={this.state.quantity > 1 ? false : true}>
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5" className={classes.qtyItem}>
                                    {this.state.quantity}
                                </Typography>
                                <IconButton size="small" className={classes.qtyItem} onClick={this.onIncrement} color="primary" disabled={this.state.quantity < this.state.product.stock ? false : true}>
                                    <AddIcon />
                                </IconButton>  
                            </div><hr/>
                            </React.Fragment>) : 
                            (<React.Fragment>
                            <hr/>
                            <Typography variant="h6" gutterBottom className={classes.outStock}>
                                Out of Stock
                            </Typography><hr/>
                            </React.Fragment>)}
                            <hr className={classes.line}/><hr/>
                            <Typography variant="h5">
                                Specifications:
                            </Typography>
                            <ul>
                                {specList}
                            </ul><hr className={classes.line}/>
                        </div>
                    </Grid>
                    <Grid item xs={4} container justify="center">
                        {(this.state.product.stock && this.state.product.stock > 0) ?
                        (<div className={classes.detailBox}>
                            <Typography variant="h6">
                                Quantity: <span className={classes.qtyBox}>{this.state.quantity}</span>
                            </Typography><br/>
                            <Typography variant="h6">
                                Total Price: <span className={classes.deliveryDate}>${this.state.quantity *  this.state.product.price}</span>
                            </Typography>
                            {((this.context.token) && (this.context.user.cart.includes(this.props.match.params.productid))) ? 
                            (<Button variant="contained" color="secondary" size="large" onClick={this.onGoToCart} className={classes.cartButton} startIcon={<ShoppingCartIcon />}>
                                Go To Cart
                             </Button>) :
                            (<Button variant="contained" color="secondary" size="large" onClick={this.onAddtoCart} className={classes.cartButton} startIcon={<ShoppingCartIcon />}>
                                Add To Cart
                            </Button>)}
                            <Button variant="contained" color="primary" size="large" onClick={this.onBuyNow} className={classes.buyButton} startIcon={<ShopIcon />}>
                                Buy Now
                            </Button>
                        </div>) : 
                        (<React.Fragment></React.Fragment>)}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.commentBox} id="commentSection">
                    <h1>Comments</h1>
                        {this.context.token && 
                        (<TextField
                            id="comment"
                            InputProps={{classes: {input: classes.textFieldSize, adornedEnd: classes.adornedEnd}, 
                                          endAdornment: (
                                            <IconButton color="primary" onClick={this.onAddComment}>
                                                <AddCircleIcon fontSize="large" />
                                            </IconButton>
                                          ),
                                        }}
                            label="Enter your comment here..."
                            placeholder="Enter your comment here..."
                            value={this.state.comment}
                            onChange={this.onCommentChange}
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />)}
                    <Grid container>
                        <Grid item xs={12}>
                            {commentList}
                        </Grid>
                    </Grid>
                    </div>
                </Grid>
            </Grid>)}
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(ProductDetail));