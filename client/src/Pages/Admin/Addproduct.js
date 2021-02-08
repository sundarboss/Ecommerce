import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

import Authcontext from '../../context/context';
import Alert from '../../Components/Alert';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import dummy from '../../dummy.jpg';
import Button from '@material-ui/core/Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import Tooltip from '@material-ui/core/Tooltip';


const styles = (theme) => ({
    ...theme.spreadThis
});

class Addproduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayImage: dummy,
            image: '',
            categories: [],
            selectedCategory: '',
            spec: '',
            specifications: [],
            productName: '',
            price: 0,
            stock: 0,
            dialogOpen: false,
            product: ''
        }
    }

    static contextType = Authcontext;

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/admin/getcategory')
        .then((res) => {
            this.setState({categories: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }

    onInputImageChange = (event) => {
        this.setState({
            displayImage: URL.createObjectURL(event.target.files[0]),
            image: event.target.files[0]
        });
    }

    onProductNameChange = (event) => {
        this.setState({productName: event.target.value});
    }

    onPriceChange = (event) => {
        this.setState({price: event.target.value});
    }

    onStockChange = (event) => {
        this.setState({stock: event.target.value});
    }

    onCategoryChange = (event) => {
        this.setState({selectedCategory: event.target.value});
    }

    onSpecChange = (event) => {
        this.setState({spec: event.target.value});
    }

    onSpecificationAdd = () => {
        if (this.state.spec) {
            this.setState(prevState => {
                const updatedSpecifications = [...prevState.specifications];
                updatedSpecifications.push(this.state.spec);
                return {specifications: updatedSpecifications, spec: ''}
            });
        } 
    }

    onSpecificationRemove = (id) => {
        this.setState(prevState => {
            const updatedSpecifications = prevState.specifications.filter((item, i) => {
                return i !== id
            });
            return {specifications: updatedSpecifications}
        });
    }

    onAddProduct = () => {
        const formData = new FormData();
        formData.append('image', this.state.image);
        formData.append('name', this.state.productName);
        formData.append('price', this.state.price);
        formData.append('stock', this.state.stock);
        formData.append('category', this.state.selectedCategory);
        this.state.specifications.forEach((spec) => {
            formData.append('specs[]', spec)
        })

        axios.post('http://127.0.0.1:5000/api/admin/addproduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'auth-token': this.context.token
            }
        })
        .then((res) => {
            this.setState({
                displayImage: dummy,
                image: '', 
                selectedCategory: '',
                spec: '',
                specifications: [],
                productName: '',
                price: 0,
                stock: 0,
                dialogOpen: true,
                product: res.data.productname
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    onDialogClose = () => {
        this.setState({dialogOpen: false, product: ''});
        this.props.history.push('/admin')
    }

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.adminContainer}>
                <Paper elevation={6} className={classes.adminPaper}>
                    <div className={classes.adminHeaderContainer}>
                        <Typography variant="h4" className={classes.adminHeaderText}>
                            New Product
                        </Typography>
                        <Typography variant="body1" className={classes.adminHeaderSubText}>
                            Add a new product to eKart
                        </Typography>
                    </div>
                    <div className={classes.productForm}>
                        <Grid container spacing={4}>
                            <Grid item xs={4} container justify="center">
                                <img src={this.state.displayImage} alt="productImage" className={classes.productImage}/>
                                <input 
                                 className={classes.imageInput}
                                 type="file" 
                                 id="image-input"
                                 onChange={this.onInputImageChange}
                                />
                                <label htmlFor="image-input">
                                    <Button variant="contained" color="primary" component="span" className={classes.uploadButton} startIcon={<CameraAltIcon />}>
                                        Upload Image
                                    </Button>
                                </label> 
                            </Grid>
                            <Grid item xs={8}>
                                <form>
                                    <div className={classes.productFieldPair}>
                                        <TextField
                                         required
                                         id="productname"
                                         label="Product Name"
                                         variant="outlined"
                                         InputProps={{classes: {input: classes.textFieldSize}}}
                                         className={classes.productTextfield}
                                         value={this.state.productName}
                                         onChange={this.onProductNameChange}
                                        />
                                        <TextField
                                         required
                                         id="price"
                                         label="Price (USD)"
                                         variant="outlined"
                                         InputProps={{classes: {input: classes.textFieldSize}}}
                                         className={classes.productTextfield}
                                         value={this.state.price ? this.state.price : ''}
                                         onChange={this.onPriceChange}
                                        />
                                    </div>
                                    <div className={classes.productFieldPair}>
                                        <TextField
                                         required
                                         id="stock"
                                         label="Stock"
                                         variant="outlined"
                                         InputProps={{classes: {input: classes.textFieldSize}}}
                                         className={classes.productTextfield}
                                         value={this.state.stock ? this.state.stock : ''}
                                         onChange={this.onStockChange}
                                        />
                                        <FormControl variant="outlined" className={classes.productTextfield}>
                                            <InputLabel id="category">Category</InputLabel>
                                            <Select
                                                labelId="category"
                                                id="select-category"
                                                label="Category"
                                                value={this.state.selectedCategory}
                                                onChange={this.onCategoryChange}
                                            >
                                                {this.state.categories.map((category) => {
                                                    return (
                                                        <MenuItem value={category.name} key={category._id}>{category.name}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className={classes.productSpecPair}>
                                        <TextField
                                         required
                                         id="specifications"
                                         label="Specifications"
                                         variant="outlined"
                                         value={this.state.spec}
                                         onChange={this.onSpecChange}
                                         className={classes.productSpecification}
                                         InputProps={{classes: {input: classes.textFieldSize}}}
                                        />
                                        <Button variant="contained" color="primary" onClick={this.onSpecificationAdd} className={classes.productSpecAddButton}>
                                            <AddIcon />
                                        </Button>
                                    </div>
                                    {this.state.specifications.length > 0 && 
                                    (<div>
                                        <ul className={classes.specificationListItem}>
                                            {this.state.specifications.map((spec, i) => {
                                                return (
                                                    <li key={i}>
                                                        <div className={classes.specListPair}>
                                                            <Tooltip title="Remove" placement="top" classes={{tooltip: classes.specListTooltip}}>
                                                                <IconButton className={classes.commentCancel} onClick={this.onSpecificationRemove.bind(this, i)}>
                                                                    <RemoveIcon />
                                                                </IconButton>
                                                            </Tooltip>                                                       
                                                            <Typography className={classes.specListItemText}>
                                                                {spec}
                                                            </Typography>                                         
                                                        </div>                                                    
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>)}
                                    <div className={classes.productActionPair}>
                                        <Button variant="contained" color="secondary" component={Link} to="/admin" className={classes.productActionButton}>
                                            Go Back
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={this.onAddProduct} className={classes.productActionButton}>
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
                <Alert 
                 title="Product Confirmation"
                 content={`${this.state.product} added successfully!`}
                 buttonText="Continue"
                 openStatus={this.state.dialogOpen}
                 onDialogClose={this.onDialogClose}
                 onButtonClick={this.onDialogClose}
                 cancelButton={false}
                />
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Addproduct));