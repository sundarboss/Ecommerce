import React from 'react';
import axios from 'axios';

import Product from '../Components/Product';
import Loading from '../Components/Loading';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            loading: true
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/admin/getproducts')
        .then((res) => {
            this.setState({ products: res.data, loading: false })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const filteredProducts = this.state.products.filter((product) => {
            return product.category === this.props.match.params.categoryname
        });

        var renderedProducts;

        if (filteredProducts.length > 0) {
            renderedProducts = filteredProducts.map((product) => {
                return (
                    <Product 
                     key={product._id}
                     title={product.name}
                     image={product.image}
                     specs={product.specs}
                     price={product.price}
                     id={product._id}
                    />)
            });
        } else {
            renderedProducts = (
            <Typography variant="h4" color="secondary">
                No products in this category
            </Typography>
            )
        }
        

        return (
            <div className="home-container">
                {this.state.loading ? (<Loading />) :
                (<Grid container spacing={5}>
                    {renderedProducts}             
                </Grid>)}
            </div>
        )
    }
}

export default Category;