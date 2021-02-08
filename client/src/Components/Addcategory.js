import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) => ({
    ...theme.spreadThis
});

const Addcategory = (props) => {

    const { classes } = props;

    return (
        <Dialog
            open={props.openStatus}
            onClose={props.onDialogClose}
            PaperProps={{ style: { width: '600px', maxHeight: 'auto' } }}
        >
            <DialogTitle id="form-dialog-title" classes={{ root: classes.adminDialogTitle }} disableTypography>
                <Typography variant="h5">
                    Create New Category
                </Typography>
            </DialogTitle>
            <DialogContent>
                {props.error && 
                (<Typography variant="h6" className={classes.categoryError}>
                    Category already exist. Try a different one.
                </Typography>)}
                <div className={classes.adminCategoryTextBox}>
                    <TextField
                        required
                        id="categoryname"
                        label="Category Name"
                        variant="outlined"
                        InputProps={{ classes: { input: classes.textFieldSize } }}
                        className={classes.productTextfield}
                        value={props.category}
                        onChange={props.onCategoryChange}
                    />
                </div>
            </DialogContent>
            <DialogActions>              
                <Button variant="contained" onClick={props.onDialogClose} color="secondary" className={classes.adminDialogButton}>
                    Cancel
                </Button>                
                <Button variant="contained" onClick={props.onAddCategory} color="primary" className={classes.adminDialogButton}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(Addcategory);