import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 5,
            rows: []
        };
    }

    componentDidMount() {
        axios.get('api/admin/getproducts')
        .then((res) => {
            console.log(res.data);
            this.setState({rows: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10), page: 0});
    }

    recordsAfterPaging = () => {
        return this.state.rows.slice(this.state.page * this.state.rowsPerPage, (this.state.page + 1) * this.state.rowsPerPage)
    }

    onRowClick = (prod) => {
        this.props.history.push({
            pathname: `/admin/product/${prod._id}`,
            state: { product: {...prod} }
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.adminContainer}>
                <Paper elevation={6} className={classes.adminPaper}>
                    <div className={classes.adminHeaderContainer}>
                        <Typography variant="h4" className={classes.adminHeaderText}>
                            Products
                        </Typography>
                        <Typography variant="body1" className={classes.adminHeaderSubText}>
                            List of all products in eKart
                        </Typography>
                    </div>
                    <Button variant="outlined" color="primary" component={Link} to="/admin/addproduct" className={classes.adminAddButton} startIcon={<AddIcon />}>
                        Add Product
                    </Button>
                    <div className={classes.adminTable}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="justify" >Product Name</TableCell>
                                        <TableCell align="justify" >Category</TableCell>
                                        <TableCell align="justify" >Price</TableCell>
                                        <TableCell align="justify" >Stock</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.recordsAfterPaging().map((row) => (
                                        /*<TableRow key={row.name} component={Link} to={`/admin/product/${row._id}`}>*/
                                        <TableRow key={row.name} onClick={this.onRowClick.bind(this, row)}>
                                            <TableCell align="justify">{row.name}</TableCell>
                                            <TableCell align="justify">{row.category}</TableCell>
                                            <TableCell align="justify">{row.price}</TableCell>
                                            <TableCell align="justify">{row.stock}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                         className={classes.pagination}
                         classes={{toolbar: classes.paginationLabel, caption: classes.paginationLabel}}
                         rowsPerPageOptions={[5, 10, 25]}
                         component="div"
                         count={this.state.rows.length}
                         rowsPerPage={this.state.rowsPerPage}
                         page={this.state.page}
                         onChangePage={this.handleChangePage}
                         onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </div>
                </Paper>
            </div>
        )
    }
}


export default withRouter(withStyles(styles)(Admin));