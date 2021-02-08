import React from 'react';
import axios from 'axios';

import Product from '../Components/Product';
import Loading from '../Components/Loading';

import Grid from '@material-ui/core/Grid';


class Home extends React.Component {
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
        const renderedProducts = this.state.products.map((product) => {
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

export default Home;