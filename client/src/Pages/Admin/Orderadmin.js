import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Tabpanel from '../../Components/Tabpanel';
import Ordertable from '../../Components/Ordertable';
import Authcontext from '../../context/context';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Orderadmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 5,
            activeOrders: [],
            completedOrders: [],
            tabValue: 0,
            rowsPerPage1: 5,
            page1: 0
        };
    }

    static contextType = Authcontext;

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/admin/listorders', {
            headers: {
                "auth-token": this.context.token
            }
        })
        .then((res) => {
            console.log(res.data);
            const activeOrders = res.data.filter((order) => {
                return order.status === false;
            });

            const completedOrders = res.data.filter((order) => {
                return order.status === true;
            });

            this.setState({activeOrders: activeOrders, completedOrders: completedOrders});
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleChange = (event, newValue) => {
        this.setState({tabValue: newValue});
      };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10), page: 0});
    }

    handleChangePage1 = (event, newPage) => {
        this.setState({page1: newPage});
    }

    handleChangeRowsPerPage1 = (event) => {
        this.setState({rowsPerPage1: parseInt(event.target.value, 10), page1: 0});
    }

    recordsAfterPaging = () => {
        return this.state.activeOrders.slice(this.state.page * this.state.rowsPerPage, (this.state.page + 1) * this.state.rowsPerPage)
    }

    recordsAfterPaging1 = () => {
        return this.state.completedOrders.slice(this.state.page1 * this.state.rowsPerPage1, (this.state.page1 + 1) * this.state.rowsPerPage1)
    }

    onRowClick = (order) => {
        this.props.history.push({
            pathname: `/admin/order/${order._id}`,
            state: { order: {...order} }
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.adminContainer}>
                <Paper elevation={6} className={classes.adminPaper}>
                    <div className={classes.adminHeaderContainer}>
                        <Typography variant="h4" className={classes.adminHeaderText}>
                            Orders
                        </Typography>
                        <Typography variant="body1" className={classes.adminHeaderSubText}>
                            List of all orders in eKart
                        </Typography>
                    </div>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.tabValue}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                            style={{height: '60px'}}
                        >
                            <Tab label="Active Orders" className={classes.tabText}/>
                            <Tab label="Completed Orders" className={classes.tabText}/>
                        </Tabs>
                    </AppBar>
                    <Tabpanel value={this.state.tabValue} index={0}>
                        <Ordertable 
                         rowsPerPage={this.state.rowsPerPage}
                         page={this.state.page}
                         recordsAfterPaging={this.recordsAfterPaging}
                         orders={this.state.activeOrders}
                         handleChangePage={this.handleChangePage}
                         handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                         onRowClick={this.onRowClick}
                        />
                    </Tabpanel>
                    <Tabpanel value={this.state.tabValue} index={1}>
                    <Ordertable 
                         rowsPerPage={this.state.rowsPerPage1}
                         page={this.state.page1}
                         recordsAfterPaging={this.recordsAfterPaging1}
                         orders={this.state.completedOrders}
                         handleChangePage={this.handleChangePage1}
                         handleChangeRowsPerPage={this.handleChangeRowsPerPage1}
                         onRowClick={this.onRowClick}
                        />
                    </Tabpanel>
                </Paper>
            </div>
        )
    }
}


export default withRouter(withStyles(styles)(Orderadmin));