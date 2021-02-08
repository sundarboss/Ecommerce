import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core';

import './index.css';

import themeObject from './Theme/Theme';
import Home from './Pages/Home';
import Category from './Pages/Category';
import Admin from './Pages/Admin/Admin';
import Addproduct from './Pages/Admin/Addproduct';
import Viewproduct from './Pages/Admin/Viewproduct';
import Categoryadmin from './Pages/Admin/Categoryadmin';
import Viewcategory from './Pages/Admin/Viewcategory';
import Orderadmin from './Pages/Admin/Orderadmin';
import Vieworder from './Pages/Admin/Vieworder';
import Order from './Pages/Order';
import OrderDetail from './Pages/OrderDetail';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Navbar from './Components/Navbar';
import Buynow from './Pages/Buynow';
import Search from './Pages/Search';
import Authcontext from './context/context';


const theme = createMuiTheme(themeObject);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            token: '',
            loginDialog: false
        }
    }

    login = (user) => {
        this.setState({
            token: user.token,
            user: user
        });
    }

    logout = () => {
        this.setState({
            token: '',
            user: {}
        });
    }

    onLoginDialogOpen = () => {
        this.setState({loginDialog: true});
    }

    onLoginDialogClose = () => {
        this.setState({loginDialog: false});
    }

    updateUserCart = (productid, type) => {
        if (type === 'add') {
            this.setState(prevState => {
                const updatedUser = {...prevState.user};
                updatedUser.cart.push(productid);
                return {user: updatedUser};
            });
        } else if (type === 'remove') {
            this.setState(prevState => {
                const updatedUser = {...prevState.user};
                const updatedUserCart = updatedUser.cart.filter((product) => {
                    return product !== productid
                });
                updatedUser.cart = updatedUserCart;
                return {user: updatedUser};
            });
        } else {
            this.setState(prevState => {
                const updatedUser = {...prevState.user};
                updatedUser.cart = [];
                return {user: updatedUser};
            });
        }       
    }


    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Authcontext.Provider value={{
                        token: this.state.token,
                        user: this.state.user,
                        loginDialog: this.state.loginDialog,
                        onLoginDialogOpen: this.onLoginDialogOpen,
                        onLoginDialogClose: this.onLoginDialogClose,
                        login: this.login,
                        logout: this.logout,
                        updateUserCart: this.updateUserCart
                    }}>
                        <Navbar/>
                        <div className="container">
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/admin" exact component={Admin} />
                                <Route path="/admin/addproduct" exact component={Addproduct} />
                                <Route path="/admin/product/:productid" exact component={Viewproduct} />
                                <Route path="/admin/category" exact component={Categoryadmin} />
                                <Route path="/admin/category/:categoryname" exact component={Viewcategory} />
                                <Route path="/admin/order" exact component={Orderadmin} />
                                <Route path="/admin/order/:orderid" exact component={Vieworder} />
                                <Route path="/category/:categoryname" exact component={Category} />
                                <Route path="/product/:productid" exact component={ProductDetail} />
                                {!this.state.token && (<Redirect from="/orders/:userid" to="/" exact />)}
                                {this.state.token && (<Route path="/orders/:userid" exact component={Order} />)}
                                {!this.state.token && (<Redirect from="/order/:orderid" to="/" exact />)}
                                {this.state.token && (<Route path="/order/:orderid" exact component={OrderDetail} />)}
                                {!this.state.token && (<Redirect from="/cart/:userid" to="/" exact />)}
                                {this.state.token && (<Route path="/cart/:userid" exact component={Cart} />)}
                                {this.state.token && (<Route path="/buynow" exact component={Buynow} />)}
                                {!this.state.token && (<Redirect from="/buynow" to="/" exact />)}
                                <Route path="/search" exact component={Search} />
                            </Switch>
                        </div>
                    </Authcontext.Provider>
                </BrowserRouter>
            </MuiThemeProvider>   
        );
    }
}

export default App;