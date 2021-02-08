import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    ...theme.spreadThis
});

const Tabpanel = (props) => {
    const { classes } = props;

    return (
        <div
         role="tabpanel"
         hidden={props.value !== props.index}
         id={`full-width-panel-${props.index}`}
        >
            {props.value === props.index && 
            (<div className={classes.tab}>
                {props.children}
             </div>)}
        </div>
    )
}

export default withStyles(styles)(Tabpanel);