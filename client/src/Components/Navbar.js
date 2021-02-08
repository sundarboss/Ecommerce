import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';

import Popup from './Popup';
import Sidebar from './Sidebar';
import Authcontext from '../context/context';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArchiveIcon from '@material-ui/icons/Archive';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Badge from '@material-ui/core/Badge';


const styles = (theme) => ({
    ...theme.spreadThis
});

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            sidebar: false,
            searchTerm: ''
        }
    }
    
    static contextType = Authcontext;

        onSigninClick = () => {
        this.context.onLoginDialogOpen();
    }

    handleMenuOpen = (event) => {
        this.setState({anchorEl: event.currentTarget})
    }

    handleMenuClose = () => {
        this.setState({anchorEl: null});
    }

    handleOrders = () => {
        this.handleMenuClose();
        this.props.history.push(`/orders/${this.context.user.userid}`);
    }

    handleLogout = () => {
        this.handleMenuClose();
        this.context.logout();
        this.props.history.push('/');
    }

    handleAdminLogout = () => {
        this.context.logout();
        this.props.history.push('/');
    }

    handleCart = () => {
        if (!this.context.token) {
            this.context.onLoginDialogOpen();
        } else {
            this.props.history.push(`/cart/${this.context.user.userid}`);
        }
    }

    handleSidebarOpen = () => {
        this.setState({ sidebar: true });
    }

    handleSidebarClose = () => {
        this.setState({ sidebar: false });
    }

    onListItemClick = (category) => {
        this.props.history.push(`/category/${category}`);
        this.handleSidebarClose();
    }

    onSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    }

    onSearchClick = () => {
        if (this.state.searchTerm.length > 0) {
            this.props.history.push({
                pathname: '/search',
                state: { query: this.state.searchTerm }
            });
        }       
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
            <AppBar>
                {this.context.user.isAdmin ? 
                (<Toolbar className={classes.navcontainer}>
                    <div className={classes.navheader}>
                        <Typography variant="h4" noWrap>
                            eKart Admin
                        </Typography>
                    </div>
                    <div className={classes.navitemsAdmin}>
                        <Button className={classes.button} component={Link} to="/admin">Products</Button>
                        <Button className={classes.button} component={Link} to="/admin/category">Categories</Button>
                        <Button className={classes.button} component={Link} to="/admin/order">Orders</Button>
                        <Button className={classes.button} onClick={this.handleAdminLogout}>Logout</Button>
                    </div>
                </Toolbar>) :
                (<Toolbar className={classes.navcontainer}>
                    <div className={classes.navheader}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleSidebarOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to={'/'} className="link">
                            <Typography variant="h5" noWrap>
                                eKart
                            </Typography>
                        </Link>
                        <div className={classes.search}>
                        <IconButton onClick={this.onSearchClick}>
                            <SearchIcon className={classes.searchitem} style={{color: 'white'}} />
                        </IconButton>
                        <InputBase
                            className={classes.searchitemText}
                            placeholder="Search.."
                            inputProps={{ 'aria-label': 'search' }}
                            value={this.state.searchTerm}
                            onChange={this.onSearchChange}
                        />
                        </div>
                    </div>
                    <div className={classes.navitems}>
                        {!this.props.location.pathname.includes('/cart/', 0) &&
                        (<Button className={classes.button} 
                        onClick={this.handleCart}
                        startIcon={
                        <React.Fragment>
                            <Badge badgeContent={(this.context.user.cart && this.context.user.cart.length) ? this.context.user.cart.length : null} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </React.Fragment>
                        }>Cart</Button>)}
                        {this.context.token ? 
                        (<div>
                        <Button className={classes.button} aria-haspopup="true" onClick={this.handleMenuOpen}>
                            {this.context.user.name}
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={this.state.anchorEl}
                          getContentAnchorEl={null}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
                          transformOrigin={{ vertical: 'top', horizontal: 'center'}}
                          open={Boolean(this.state.anchorEl)}
                          onClose={this.handleMenuClose}
                          PaperProps={{
                              style: {
                                  marginTop: '1rem'
                              }
                          }}
                        >
                            <MenuItem onClick={this.handleOrders} className={classes.menuItem}>
                                <ArchiveIcon fontSize="small" className={classes.menuIcon}/>My Orders
                            </MenuItem>
                            <MenuItem onClick={this.handleLogout} className={classes.menuItem}>
                                <PowerSettingsNewIcon fontSize="small" className={classes.menuIcon}/>Logout
                            </MenuItem>
                        </Menu>
                        </div>)
                        :
                        (<Button className={classes.button} onClick={this.onSigninClick}>Signin</Button>)}
                    </div>
                </Toolbar>)}
            </AppBar>
            <Popup />
            <Sidebar 
             sidebar={this.state.sidebar}
             onSidebarClose={this.handleSidebarClose} 
             onClick={this.onListItemClick}
            />
            </React.Fragment>
        )
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Navbar));