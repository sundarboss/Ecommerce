import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Addcategory from '../../Components/Addcategory';
import Authcontext from '../../context/context';
import Alert from '../../Components/Alert';

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

class Categoryadmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            page: 0,
            rowsPerPage: 5,
            addCategory: false,
            categoryName: '',
            error: '',
            addCategorySuccess: false,
            successMsg: ''
        };
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

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10), page: 0});
    }

    recordsAfterPaging = () => {
        return this.state.categories.slice(this.state.page * this.state.rowsPerPage, (this.state.page + 1) * this.state.rowsPerPage)
    }

    onAddCategoryClick = () => {
        this.setState({addCategory: true});
    }

    onAddCategoryClose = () => {
        this.setState({addCategory: false});
    }

    onCategorySuccessClose = () => {
        this.setState({addCategorySuccess: false, successMsg: ''});
    }

    onCategoryChange = (e) => {
        this.setState({categoryName: e.target.value});
    }

    onAddCategory = () => {
        axios.post('http://127.0.0.1:5000/api/admin/addcategory', {
            name: this.state.categoryName
        }, {
            headers: {
                "auth-token": this.context.token
            }
        })
        .then((res) => {
            this.setState(prevState => {
                const updatedCategories = [...prevState.categories];
                updatedCategories.push(res.data);
                return {
                    categories: updatedCategories,
                    addCategory: false,
                    error: '',
                    categoryName: '', 
                    addCategorySuccess: true, 
                    successMsg: `${res.data.name} category added successfully!`,
                };
            })
        })
        .catch(err => {
            this.setState({error: err.response.data});
        })
    }

    onRowClick = (category) => {
        this.props.history.push({
            pathname: `/admin/category/${category.name}`,
            state: { category: {...category} }
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.adminContainer}>
                <Paper elevation={6} className={classes.adminPaper}>
                    <div className={classes.adminHeaderContainer}>
                        <Typography variant="h4" className={classes.adminHeaderText}>
                            Categories
                        </Typography>
                        <Typography variant="body1" className={classes.adminHeaderSubText}>
                            List of all categories in eKart
                        </Typography>
                    </div>
                    <div className={classes.adminCategoryTable}>
                    <Button variant="outlined" color="primary" onClick={this.onAddCategoryClick} className={classes.adminCategoryAddButton} startIcon={<AddIcon />}>
                        Add Category
                    </Button>
                    </div>
                    <div className={classes.adminCategoryTable}>
                        <TableContainer component={Paper}>
                            <Table className={classes.categoryTable}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" >Category</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.recordsAfterPaging().map((row) => (
                                        <TableRow key={row._id} onClick={this.onRowClick.bind(this, row)}>
                                            <TableCell align="left">{row.name}</TableCell>
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
                         count={this.state.categories.length}
                         rowsPerPage={this.state.rowsPerPage}
                         page={this.state.page}
                         onChangePage={this.handleChangePage}
                         onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </div>
                </Paper>
                <Addcategory 
                 openStatus={this.state.addCategory}
                 onDialogClose={this.onAddCategoryClose}
                 category={this.state.categoryName}
                 onCategoryChange={this.onCategoryChange}
                 onAddCategory={this.onAddCategory}
                 error={this.state.error}
                />
                <Alert 
                 title="Category Success"
                 content={this.state.successMsg}
                 buttonText="Continue"
                 openStatus={this.state.addCategorySuccess}
                 onDialogClose={this.onCategorySuccessClose}
                 onButtonClick={this.onCategorySuccessClose}
                 cancelButton={false}
                />
            </div>
        )
    }
}


export default withRouter(withStyles(styles)(Categoryadmin));