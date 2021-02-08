import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Product from '../Components/Product';
import Loading from '../Components/Loading';

import Grid from '@material-ui/core/Grid';


class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            loading: true
        }
    }


    componentDidMount() {
        axios.get('api/admin/getproducts')
        .then((res) => {
            this.setState({ products: res.data, loading: false })
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    render() {
        const searchArr = this.props.location.state.query.toLowerCase().split(" ");

        const filteredProducts = this.state.products.filter((product) => {
            var productFound = false;
            searchArr.forEach((word) => {
                if (product.name.toLowerCase().includes(word)) {
                    productFound = true;
                }
            })
            return productFound ? product : null;
        });

        const renderedProducts = filteredProducts.map((product) => {
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

export default withRouter(Search);