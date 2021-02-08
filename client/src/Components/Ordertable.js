import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
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

const Ordertable = (props) => {
    const { classes } = props;

    return (
        <div className={classes.adminTable}>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="justify" >Order Id</TableCell>
                            <TableCell align="justify" >Order Date</TableCell>
                            <TableCell align="justify" >Value</TableCell>
                            <TableCell align="justify" >Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.recordsAfterPaging().map((row) => (
                            <TableRow key={row._id} onClick={props.onRowClick.bind(this, row)}>
                                <TableCell align="justify">{row._id}</TableCell>
                                <TableCell align="justify">{new Date(row.date).toDateString().split(' ').slice(1).join(' ')}</TableCell>
                                <TableCell align="justify">{row.value}</TableCell>
                                <TableCell align="justify">{row.status ? 'Delivered' : 'In Progress'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                className={classes.pagination}
                classes={{ toolbar: classes.paginationLabel, caption: classes.paginationLabel }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.orders.length}
                rowsPerPage={props.rowsPerPage}
                page={props.page}
                onChangePage={props.handleChangePage}
                onChangeRowsPerPage={props.handleChangeRowsPerPage}
            />
        </div>
    )
}

export default withStyles(styles)(Ordertable);