import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };
    }
    
    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/admin/getcategory')
        .then((res) => {
            this.setState({categories: res.data})
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    render() {
        const { classes } = this.props;

        const renderedCategories = this.state.categories.map((item) => {
            return (
                <React.Fragment key={item._id}>
                <ListItem button key={item._id} onClick={this.props.onClick.bind(this, item.name)}>
                    <ListItemText primary={item.name} classes={{ primary: classes.listItemText }} />
                </ListItem>
                </React.Fragment>
            )
        });

        return (
            <div>
                <Drawer anchor="left" open={this.props.sidebar} onClose={this.props.onSidebarClose}>
                    <div
                        className={classes.list}
                        role="presentation"
                    >
                        <List
                          subheader={
                              <ListSubheader className={classes.listSubheader}>
                                  Browse By Category
                              </ListSubheader>
                          }
                        >
                            {renderedCategories}
                        </List>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Sidebar));