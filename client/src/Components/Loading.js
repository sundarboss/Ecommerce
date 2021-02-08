import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.spreadThis
});

const Loading = (props) => {
    const { classes } = props;

    return (
        <div className={classes.loadingPosition}>
            <CircularProgress size="10rem" />
        </div>
    )
}

export default withStyles(styles)(Loading);