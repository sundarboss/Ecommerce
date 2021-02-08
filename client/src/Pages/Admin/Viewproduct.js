import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

import Alert from '../../Components/Alert';
import Editproduct from '../../Components/Editproduct';
import Authcontext from '../../context/context';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Viewproduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            deleteConfirm: false,
            deleteSuccess:false,
            productEdit: false,
            productEditSuccess: false
        }
    }

    static contextType = Authcontext;

    componentDidMount() {
        this.setState({product: this.props.location.state.product});
    }

    onDeleteClick = () => {
        this.setState({deleteConfirm: true});
    }

    onDeleteConfirmClose = () => {
        this.setState({deleteConfirm: false});
    }

    onDeleteProduct = () => {
        axios.delete(`http://127.0.0.1:5000/api/admin/deleteproduct/${this.state.product._id}`, {
            headers: {
                "auth-token": this.context.token
            }
        })
        .then((res) => {
            this.setState({deleteConfirm: false, deleteSuccess: true});
        })
        .catch(err => {
            console.log(err);
            this.setState({deleteConfirm: false});
        }) 
    }

    onDeleteSuccess = () => {
        this.setState({deleteSuccess: false});
        this.props.history.push('/admin');
    }

    onEditCancelClick = () => {
        this.setState({productEdit: false});
    }

    onEditClick = () => {
        this.setState({productEdit: true});
    }

    onEditProduct = (data) => {
        const formData = new FormData();

        for (let key in data) {
            if (key === "specs") {
                data[key].forEach((spec) => {
                    formData.append('specs[]', spec)
                });
            } else {
                formData.append(key, data[key]);
            }
        }

        axios.put(`http://127.0.0.1:5000/api/admin/editproduct/${this.state.product._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'auth-token': this.context.token
            }
        })
        .then((res) => {
            this.setState({product: res.data, productEdit: false, productEditSuccess: true})
        })
        .catch(err => {
            console.log(err);
        })
    }

    onEditSuccessDialogClose = () => {
        this.setState({productEditSuccess: false});
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.adminContainer}>
                {this.state.productEdit ? 
                (<React.Fragment>
                    <Editproduct
                     product={this.state.product}
                     onCancel={this.onEditCancelClick}
                     onUpdate={this.onEditProduct} 
                    />
                </React.Fragment>) : 
                (<React.Fragment>
                    <Paper elevation={6} className={classes.adminPaper}>
                    <div className={classes.adminHeaderContainer}>
                        <Typography variant="h4" className={classes.adminHeaderText}>
                            Product Detail
                        </Typography>
                        <Typography variant="body1" className={classes.adminHeaderSubText}>
                            View details of the product
                        </Typography>
                    </div>
                    <div className={classes.productForm}>
                        <Grid container spacing={4}>
                            <Grid item xs={4} container justify="center">
                                <img src={`/${this.state.product.image}`} alt="dummy" className={classes.productImage} />
                            </Grid>
                            <Grid item xs={8}>
                                    <div className={classes.productFieldPair}>
                                        <div className={classes.productTextfield}>
                                            <Typography variant="h5">
                                                Product Name
                                            </Typography>
                                            <Typography variant="h6" className={classes.productDetailText}>
                                                {this.state.product.name}
                                            </Typography>
                                        </div>
                                        <div className={classes.productTextfield}>
                                            <Typography variant="h5">
                                                Price
                                            </Typography>
                                            <Typography variant="h6" className={classes.productDetailText}>
                                                ${this.state.product.price}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className={classes.productFieldPair}>
                                        <div className={classes.productTextfield}>
                                            <Typography variant="h5">
                                                Stock
                                            </Typography>
                                            <Typography variant="h6" className={classes.productDetailText}>
                                                {this.state.product.stock}
                                            </Typography>
                                        </div>
                                        <div className={classes.productTextfield}>
                                            <Typography variant="h5">
                                                Category
                                            </Typography>
                                            <Typography variant="h6" className={classes.productDetailText}>
                                                {this.state.product.category}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className={classes.productSpecPair}>
                                        <Typography variant="h5">
                                            Specifications
                                        </Typography>
                                    </div>
                                    <div>
                                        <ul className={classes.specificationListItem}>
                                            {this.state.product.specs && this.state.product.specs.map((spec, i) => {
                                                return (
                                                    <li key={i}>
                                                        <Typography variant="h6" className={classes.productDetailText}>
                                                            {spec}
                                                        </Typography>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                            </Grid>
                        </Grid>
                        <div className={classes.productDetailButtons}>
                            <div>
                                <Button variant="contained" color="secondary" component={Link} to="/admin" className={classes.productActionButton}>
                                    Go Back
                                </Button>
                            </div>
                            <div>
                                <Button variant="contained" color="primary" onClick={this.onEditClick} className={classes.productActionButton}>
                                    Edit
                                </Button>
                                <Button variant="contained" onClick={this.onDeleteClick} className={`${classes.productActionButton} ${classes.productDetailDeleteButton}`}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </Paper>
                </React.Fragment>)}
                <Alert
                 title="Delete Confirmation"
                 content="Confirm if you want to delete the product?"
                 buttonText="Confirm"
                 openStatus={this.state.deleteConfirm}
                 onDialogClose={this.onDeleteConfirmClose}
                 onButtonClick={this.onDeleteProduct}
                 cancelButton={true}
                 onCancelClick={this.onDeleteConfirmClose}
                />
                <Alert
                 title="Delete Success"
                 content={`${this.state.product.name} deleted successfully!`}
                 buttonText="Continue"
                 openStatus={this.state.deleteSuccess}
                 onDialogClose={this.onDeleteSuccess}
                 onButtonClick={this.onDeleteSuccess}
                 cancelButton={false}
                />
                <Alert
                 title="Update Success"
                 content={`${this.state.product.name} updated successfully!`}
                 buttonText="Continue"
                 openStatus={this.state.productEditSuccess}
                 onDialogClose={this.onEditSuccessDialogClose}
                 onButtonClick={this.onEditSuccessDialogClose}
                 cancelButton={false}
                />
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Viewproduct));

