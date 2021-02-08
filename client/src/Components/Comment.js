import React from 'react';

import Authcontext from '../context/context';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editedComment: '',
            edit: false
        }
    }

    static contextType = Authcontext;

    onEditCommentChange = (e) => {
        this.setState({editedComment: e.target.value});
    }

    onEditClick = () => {
        this.setState({editedComment: this.props.comment, edit: true});
    }

    onCommentCancel = () => {
        this.setState({editedComment: '', edit: false});
    }

    onCommentSubmit = () => {
        this.props.onEditComment(this.state.editedComment, this.props.id);
        this.setState({editedComment: '', edit: false});
    }

    onCommentDelete = () => {
        this.props.onDeleteComment(this.props.id);
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid item xs={12}>
                {this.state.edit ?
                (<TextField
                    id="comment"
                    InputProps={{classes: {input: classes.textFieldSize, adornedEnd: classes.adornedEnd}, 
                                  endAdornment: (
                                    <React.Fragment>
                                        <IconButton color="primary" onClick={this.onCommentSubmit}>
                                            <CheckCircleIcon fontSize="large" />
                                        </IconButton>
                                        <IconButton className={classes.commentCancel} onClick={this.onCommentCancel}>
                                            <CancelIcon fontSize="large" />
                                        </IconButton>
                                    </React.Fragment>  
                                  ),
                                }}
                    placeholder="Enter your comment here..."
                    value={this.state.editedComment}
                    onChange={this.onEditCommentChange}
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />) :
                (<React.Fragment>
                <div className={classes.commentHeader}>
                    <h3 className={classes.commentName}>{this.props.username}</h3>
                    {((this.context.token) && (this.props.userid === this.context.user.userid)) &&
                    (<div className={classes.commentActions}>
                        <IconButton color="primary" onClick={this.onEditClick}>
                            <EditIcon />
                        </IconButton>
                        <IconButton className={classes.commentActionDelete} onClick={this.onCommentDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </div>)}
                </div>
                <p className={classes.commentBody}>{this.props.comment}</p>
                </React.Fragment>)}               
                <hr />
            </Grid>
        )
    }    
}

export default withStyles(styles)(Comment);