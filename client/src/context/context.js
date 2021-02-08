import React from 'react';

export default React.createContext({
    token: null,
    user: {},
    loginDialog: false,
    onLoginDialogOpen: () => {},
    onLoginDialogClose: () => {},
    login: () => {},
    logout: () => {},
    updateUserCart: () => {}
})