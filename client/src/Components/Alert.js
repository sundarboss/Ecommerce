import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) => ({
    ...theme.spreadThis
});

const Alert = (props) => {

    const { classes } = props;

    return (
        <Dialog
            open={props.openStatus}
            onClose={props.onDialogClose}
            PaperProps={{ style: { width: '600px', maxHeight: 'auto' } }}
        >
            <DialogTitle id="form-dialog-title" classes={{ root: classes.adminDialogTitle }} disableTypography>
                <Typography variant="h5">
                    {props.title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.adminDialogText}>
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.cancelButton && 
                (<Button variant="contained" onClick={props.onCancelClick} className={classes.adminDialogCancelButton}>
                    Cancel
                </Button>)
                }                
                <Button variant="contained" onClick={props.onButtonClick} color="primary" className={classes.adminDialogButton}>
                    {props.buttonText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(Alert);