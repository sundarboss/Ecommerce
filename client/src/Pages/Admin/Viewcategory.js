import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

import Alert from '../../Components/Alert';
import Authcontext from '../../context/context';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
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

class Viewcategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            category: {},
            page: 0,
            rowsPerPage: 5,
            deleteDialog: false,
            deleteSuccess: false
        }
    }

    static contextType = Authcontext;

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/api/admin/getproducts/${this.props.match.params.categoryname}`)
        .then((res) => {
            this.setState({products: res.data, category: this.props.location.state.category})
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
        return this.state.products.slice(this.state.page * this.state.rowsPerPage, (this.state.page + 1) * this.state.rowsPerPage)
    }

    onDeleteButtonClick = () => {
        this.setState({deleteDialog: true});
    }

    onDeleteDialogClose = () => {
        this.setState({deleteDialog: false});
    }

    onDeleteCategory = () => {
        axios.delete(`/api/admin/deletecategory/${this.state.category._id}`, {
            headers: {
                "auth-token": this.context.token
            }
        })
        .then((res) => {
            this.setState({deleteDialog: false, deleteSuccess: true})
        })
        .catch(err => {
            console.log(err);
            this.setState({deleteDialog: false});
        })
    }

    onDeleteSuccessClose = () => {
        this.setState({deleteSuccess: false});
        this.props.history.push('/admin/category');
    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.adminContainer}>
                    <Paper elevation={6} className={classes.adminPaper}>
                    <div className={classes.adminHeaderContainer}>
                        <Typography variant="h4" className={classes.adminHeaderText}>
                            Category Detail
                        </Typography>
                        <Typography variant="body1" className={classes.adminHeaderSubText}>
                            View details of the category
                        </Typography>
                    </div>
                    <div className={classes.productForm}>
                        <Typography variant="h4" color="primary">
                            {this.props.match.params.categoryname}
                        </Typography>
                        <Typography variant="h5" className={classes.adminCategoryListText}>
                            List of Products
                        </Typography>
                        <div>
                        <TableContainer component={Paper}>
                            <Table className={classes.categoryProductTable}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="justify" >Product Name</TableCell>
                                        <TableCell align="justify" >Price</TableCell>
                                        <TableCell align="justify" >Stock</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.recordsAfterPaging().map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell align="justify">{row.name}</TableCell>
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
                         count={this.state.products.length}
                         rowsPerPage={this.state.rowsPerPage}
                         page={this.state.page}
                         onChangePage={this.handleChangePage}
                         onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </div>
                        <div className={classes.productActionPair}>
                            <Button variant="contained" color="secondary" component={Link} to="/admin/category" className={classes.productActionButton}>
                                Go Back
                            </Button>
                            <Button variant="contained" onClick={this.onDeleteButtonClick} className={`${classes.productActionButton} ${classes.productDetailDeleteButton}`}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </Paper>
                <Alert 
                 title="Delete Confirmation"
                 content={`Deleting ${this.state.category.name} category will delete all the products listed under it. Confirm if you still want to delete it?`}
                 buttonText="Confirm"
                 openStatus={this.state.deleteDialog}
                 onDialogClose={this.onDeleteDialogClose}
                 onButtonClick={this.onDeleteCategory}
                 cancelButton={true}
                 onCancelClick={this.onDeleteDialogClose}
                />
                <Alert 
                 title="Delete Success"
                 content={`${this.state.category.name} category deleted successfully!`}
                 buttonText="Continue"
                 openStatus={this.state.deleteSuccess}
                 onDialogClose={this.onDeleteSuccessClose}
                 onButtonClick={this.onDeleteSuccessClose}
                 cancelButton={false}
                />
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Viewcategory));