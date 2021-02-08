import React from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Authcontext from '../context/context';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signin: true,
            name: '',
            email: '',
            password: '',
            address: '',
            country: '',
            region: '',
            phone: '',
            error: ''
        }
    }

    static contextType = Authcontext;

    onNameChange = (e) => {
        this.setState({name: e.target.value});
    }

    onEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    onAddressChange = (e) => {
        this.setState({address: e.target.value});
    }

    onCountryChange = (val) => {
        this.setState({country: val});
    }

    onRegionChange = (val) => {
        this.setState({region: val});
    }

    onPhoneChange = (e) => {
        this.setState({phone: e.target.value});
    }

    onSigninSubmit = () => {
        axios.post('http://127.0.0.1:5000/api/user/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            console.log(res.data);
            this.onDialogClose();
            this.context.login(res.data);
            if (res.data.isAdmin) {
                this.props.history.push('/admin')
            }
        })
        .catch(err => {
            this.setState({error: err.response.data});
        })
    }

    onRegisterSubmit = () => {
        axios.post('http://127.0.0.1:5000/api/user/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            admin: false,
            address: this.state.address,
            state: this.state.region,
            country: this.state.country,
            phone: this.state.phone
        })
        .then(res => {
            console.log(res.data);
            this.onDialogClose();
            this.context.login(res.data);
        })
        .catch(err => {
            this.setState({error: err.response.data});
        })
    }


    onRegisterClick = () => {
        this.setState({
            signin: false,
            email: '',
            password: '',
            error: ''
        })
    }

    onLoginClick = () => {
        this.setState({
            signin: true,
            name: '',
            email: '',
            password: '',
            address: '',
            country: '',
            region: '',
            phone: '',
            error: ''
        })
    }

    onDialogClose = () => {
        this.setState({
            signin: true,
            name: '',
            email: '',
            password: '',
            address: '',
            country: '',
            region: '',
            phone: '',
            error: ''
        });
        this.context.onLoginDialogClose();
    }

    render() {

        const { classes } = this.props;

        return (
            <Dialog open={this.context.loginDialog} onClose={this.onDialogClose} aria-labelledby="form-dialog-title"
            PaperProps={{style: {width: '600px', maxHeight: 'auto'}}} maxWidth='md' fullWidth
            >
                <DialogTitle id="form-dialog-title" classes={{root: classes.dialogTitle}} disableTypography>
                    <Typography variant="h5" className={classes.dialogTitleText}>
                        {this.state.signin ? 'Login' : 'Create an Account'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {this.state.error && 
                    (<Typography variant="h6" align="center" className={classes.errorText}>
                        {this.state.error}
                    </Typography>)}
                    {this.state.signin ?
                    (<form className={classes.loginForm} >
                        <TextField
                            id="email"
                            label="Email Address"
                            type="email"
                            value={this.state.email}
                            onChange={this.onEmailChange}
                            fullWidth
                            required
                            size="medium"
                            InputProps={{classes: {input: classes.textFieldSize}}}
                            InputLabelProps={{classes: {root: classes.textFieldSize}}}
                            className={classes.textBox}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                            fullWidth
                            required
                            size="medium"
                            InputProps={{classes: {input: classes.textFieldSize}}}
                            InputLabelProps={{classes: {root: classes.textFieldSize}}}
                            className={classes.textBox}
                        />
                        <Button variant="contained" color="primary" size="large" onClick={this.onSigninSubmit} className={classes.loginButton}>
                            Login
                        </Button>
                        <Button color="secondary" size="large" className={classes.registerText} onClick={this.onRegisterClick}>
                            New to eKart? Create an account
                        </Button>
                    </form>)
                    :
                    (<form className={classes.loginForm}>
                        <TextField
                            id="name"
                            label="Enter Your Name"
                            type="text"
                            value={this.state.name}
                            onChange={this.onNameChange}
                            fullWidth
                            required
                            size="medium"
                            InputProps={{classes: {input: classes.textFieldSize}}}
                            InputLabelProps={{classes: {root: classes.textFieldSize}}}
                            className={classes.textBox}
                        />
                        <TextField
                            id="email"
                            label="Email Address"
                            type="email"
                            value={this.state.email}
                            onChange={this.onEmailChange}
                            fullWidth
                            required
                            size="medium"
                            InputProps={{classes: {input: classes.textFieldSize}}}
                            InputLabelProps={{classes: {root: classes.textFieldSize}}}
                            className={classes.textBox}
                        />
                        <TextField
                            id="password"
                            label="Enter a password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                            fullWidth
                            required
                            size="medium"
                            InputProps={{ classes: { input: classes.textFieldSize } }}
                            InputLabelProps={{ classes: { root: classes.textFieldSize } }}
                            className={classes.textBox}
                        />
                        <TextField
                            id="address"
                            label="Enter Your Address"
                            value={this.state.address}
                            onChange={this.onAddressChange}
                            type="text"
                            fullWidth
                            required
                            size="medium"
                            InputProps={{ classes: { input: classes.textFieldSize } }}
                            InputLabelProps={{ classes: { root: classes.textFieldSize } }}
                            className={classes.textBox}
                        />
                        <div className={classes.dropdownBox}>
                            <CountryDropdown
                                defaultOptionLabel="Select a Country"
                                value={this.state.country}
                                onChange={(val) => this.onCountryChange(val)}
                                className={classes.dropdownField}
                                required
                            />
                            <RegionDropdown
                                blankOptionLabel="No country selected"
                                defaultOptionLabel="Select a Region"
                                country={this.state.country}
                                value={this.state.region}
                                onChange={(val) => this.onRegionChange(val)}
                                className={classes.dropdownField}
                            />
                        </div>
                        <TextField
                            id="phone-number"
                            label="Enter Your Phone Number"
                            type="number"
                            value={this.state.phone}
                            onChange={this.onPhoneChange}
                            fullWidth
                            required
                            size="medium"
                            InputProps={{ classes: { input: classes.textFieldSize } }}
                            InputLabelProps={{ classes: { root: classes.textFieldSize } }}
                            className={classes.textBox}
                        />
                        <Button variant="contained" color="primary" size="large" onClick={this.onRegisterSubmit} className={classes.registerButton}>
                            Register
                        </Button>
                        <Button variant="contained" color="secondary" size="large" onClick={this.onLoginClick} className={classes.toLoginButton}>
                            Existing User? Login Now
                        </Button>
                    </form>)}
                </DialogContent>
            </Dialog>
        )
    }
}


export default withRouter(withStyles(styles)(Popup));