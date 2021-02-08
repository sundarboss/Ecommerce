export default {
    palette: {
        primary: {
          light: '#5472d3',
          main: '#0d47a1',
          dark: '#002171',
          contrastText: '#ffffff'
        },
        secondary: {
          light: '#ff6333',
          main: '#ff3d00',
          dark: '#b22a00',
          contrastText: '#fff'
        }
      },
      spreadThis: {
        navcontainer: {
            margin: '0 10rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '80px'
        },

        navheader: {
            display: 'flex',
            alignItems: 'center'
        },

        navitems: {
            display: 'flex',
            justifyContent: 'space-around',
            width: '30rem',
        },

        navitemsAdmin: {
            display: 'flex',
            justifyContent: 'space-around',
            width: '60rem',
        },

        search: {
            position: 'relative',
            marginLeft: '5rem',
            width: '30rem',
            display: 'flex',
            border: '1px solid #5472d3',
            borderRadius: '0.5rem',
            backgroundColor: '#5472d3',
            color: 'white',
            alignItems: 'center'
        },

        searchitem: {
            marginLeft: '1rem'
        },

        searchitemText: {
            marginLeft: '1rem',
            fontSize: '1.3rem',
            color: 'white'
        },

        button: {
            color: 'white',
            fontSize: '1.2rem',
            '&:hover': {
                backgroundColor: '#0d47a1'
            }
        },

        cardPrice: {
            marginTop: "1rem"
        },

        cardMedia: {
            height: 400
        },

        productDetails: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginLeft: "3rem",
            marginTop: "2rem"
        },

        productPage: {
            marginLeft: "2rem",
            marginRight: "2rem"
        },

        line: {
            width: "500px"
        },

        commentNumber: {
            color: '#666769'
        },

        deliveryDate: {
            fontStyle: "italic",
            fontWeight: "bold"
        },

        qtyDetails: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start"
        },

        qtyItem: {
            marginLeft: "0.6rem"
        },

        inStock: {
            color: 'green'
        },

        outStock: {
            color: 'red',
            fontSize: '2.5rem'
        },

        specListItem: {
            marginTop: '1rem'
        },

        qtyBox: {
            border: '1px solid black',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem'
        },

        detailBox: {
            border: '1px solid black',
            width: '15rem',
            maxHeight: '40%',
            textAlign: 'center',
            paddingTop: '2rem',
            paddingBotton: '1rem',
            marginTop: '3rem',
            borderRadius: '1.5rem'
        },

        cartButton: {
            marginTop: '3rem',
            fontWeight: 'bold',
            width: '90%'
        },

        buyButton: {
            marginTop: '1rem',
            fontWeight: 'bold',
            width: '90%'
        },

        commentBox: {
            width: '90%',
            margin: '2rem auto'
        },

        commentName: {
            fontSize: '1.7rem',
            color: '#8c8a89'
        },

        commentBody: {
            fontSize: '1.5rem'
        },

        commentHeader: {
            display: 'flex',
            justifyContent: 'space-between'
        },

        commentActions: {
            display: 'flex',
            alignItems: 'center'
        },

        commentActionDelete: {
            margin: '0rem 1rem',
            color: 'red'
        },

        dialogTitle: {
            padding: '1.5rem 0',
            marginBottom: '1.5rem',
            textAlign: 'center',
            backgroundColor: '#0d47a1',
            color: 'white',
            fontWeight: 'bold'
        },

        dialogTitleText: {
            fontSize: '1.8rem'
        },

        loginForm: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        textBox: {
            width: '90%',
            marginBottom: '1.3rem'
        },

        textFieldSize: {
            fontSize: '1.2rem'
        },

        loginButton: {
            width: '90%',
            marginTop: '3rem',
            fontSize: '1.2rem',
            fontWeight: 'bold'
        },

        registerButton: {
            width: '90%',
            marginTop: '1rem',
            fontSize: '1.2rem',
            fontWeight: 'bold'
        },

        toLoginButton: {
            width: '90%',
            marginTop: '1rem',
            marginBottom: '3rem',
            fontSize: '1.2rem',
            fontWeight: 'bold'
        },

        registerText: {
            fontWeight: 'bold',
            fontSize: '1.2rem',
            marginTop: '10rem',
            marginBottom: '2rem',
            textTransform: 'none'
        },

        dropdownBox: {
            display: 'flex',
            marginTop: '1.5rem',
            marginBottom: '2rem',
            width: '90%',
            justifyContent: 'space-between'
        },

        dropdownField: {
            width: '40%',
            fontSize: '1.2rem',
            height: '2rem',
        },

        errorText: {
            color: 'red',
            marginBottom: '1.3rem'
        },

        menuItem: {
            fontSize: '1.2rem',
            margin: '0.5rem'
        },

        menuIcon: {
            color: 'black',
            marginRight: '1rem'
        },

        logoutLink: {
            color: 'black'
        },

        adornedEnd: {
            alignItems: 'flex-end'
        },

        commentCancel: {
            color: 'red'
        },

        cartPage: {
            marginLeft: "3rem",
            marginRight: "3rem",
            marginTop: "6rem"
        },

        priceBox: {
            paddingTop: '0.5rem',
            position: "fixed",
            width: "400px"
        },

        priceItems: {
            margin: "1rem 2rem"
        },

        priceTotalItems: {
            display: "flex",
            justifyContent: "space-between",
            margin: "1rem 2rem"
        },

        orderButton: {
            margin: "1rem 0rem",
            width: "100%",
            fontSize: '1.2rem',
            fontWeight: 'bold'
        },

        productBox: {
            border: '1px solid black'
        },

        mycart: {
            margin: "1rem 2rem",
        },

        cartImageBox: {
            width: "250px",
            height: "250px",
            margin: "1rem"
        },

        cartNameBox: {
            margin: "1rem"
        },

        cartNameBoxStock: {
            display: "flex",
            margin: "1rem"
        },

        cartNameBoxStockMargin: {
            marginRight: "2rem"
        },

        cartNameBoxPrice: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "1rem",
            marginLeft: "1rem",
            width: "80%"
        },

        removeButton: {
            width: '100%',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            backgroundColor: "#e30b0b",
            color: "white",
            '&:hover': {
                backgroundColor: "#e30b0b",
                color: "white"
            }
        },

        buynowHeader: {
            padding: "1rem",
            backgroundColor: '#0d47a1',
            color: 'white'
        },

        buynowAddress: {
            padding: "1rem"
        },

        buynowProductBox: {
            margin: "1rem 0rem"
        },

        buynowProductItem: {
            margin: "1rem 0rem"
        },

        formLabel: {
            fontSize: '1.4rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: 'black',
            '&.Mui-focused': {
                color: "black"
            }
        },

        formRadioButton: {
            fontSize: '1.2rem',
            color: 'black'
        },

        errorMsg: {
            color: 'red',
            marginBottom: '1rem'
        },

        orderMsgBox: {
            width: '80%',
            margin: 'auto'
        },

        orderSuccessMsg: {
            fontStyle: 'italic',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#8a8888',
            marginBottom: '1rem'
        },

        orderSuccessBox: {
            padding: '1rem',
            backgroundColor: '#dcdedc'
        },

        orderSuccessNumber: {
            color: '#0c961c',
            fontWeight: 'bold'
        },

        orderActionBox: {
            display: 'flex',
            justifyContent: 'flex-end'
        },

        continueButton: {
            margin: "1rem 1rem",
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textTransform: 'none',
        },

        ordersContainer: {
            width: '80%',
            margin: '6rem auto'
        },

        orderBox: {
            padding: '1rem',
            margin: '1rem auto'
        },

        orderImageBox: {
            width: "150px",
            height: "150px"
        },

        orderBoxDelivery: {
            display: 'flex',
            marginBottom: '1rem'
        },

        orderBoxDeliveryIcon: {
            marginTop: '0.2rem',
            marginRight: '0.5rem'
        },

        deliveryTick: {
            color: 'green',
            marginTop: '0.2rem',
            marginRight: '0.5rem'
        },

        orderDetailGrid: {
            padding: "1rem"
        },

        orderItemPrice: {
            fontStyle: 'italic',
            color: '#7a7a7a'
        },

        barHeader: {
            width: '80%',
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1rem 0rem'
        },

        barHeaderText: {
            fontWeight: 'bold'
        },

        stepperBar: {
            marginLeft: '2.5rem'
        },

        deliveryStatusText: {
            marginLeft: '2rem'
        },

        list: {
            width: '350px'
        },

        listSubheader: {
            fontSize: '2rem',
            padding: '1rem',
            fontWeight: 'bold',
            backgroundColor: '#ff3d00',
            color: 'white',
            marginBottom: '1rem'
        },

        listItemText: {
            fontSize: '1.7rem',
            marginLeft: '0.5rem'
        },

        loadingPosition: {
            position: 'absolute',
            left: '43%',
            top: '35%'
        },

        adminHeaderContainer: {
            backgroundColor: '#ff3d00',
            height: '5rem',
            paddingTop: '1rem',
            paddingLeft: '1rem'
        },

        adminContainer: {
            width: '70%',
            margin: ' 6rem auto'
        },

        adminHeaderText: {
            color: 'white',
            fontWeight: 'bold'
        },

        adminHeaderSubText: {
            color: '#c9c5c5',
            fontStyle: 'italic'
        },

        adminPaper: {
            paddingBottom: '2rem'
        },

        adminAddButton: {
            margin: '2rem 2rem',
            fontWeight: 'bold',
            fontSize: '1.4rem'
        },

        adminTable: {
            width: '96%',
            margin: 'auto'
        },

        table: {
            '& thead th': {
                fontSize: '1.4rem',
                fontWeight: 'bold',
                backgroundColor: '#ababab',
                color: '#0d47a1'
            },
            '& tbody td': {
                fontSize: '1.2rem'
            },
            '& tbody tr:hover': {
                backgroundColor: '#786e6e',
                cursor: 'pointer'
            },
            '& a:hover': {
                backgroundColor: '#786e6e'
            }
        },

        pagination: {
            marginTop: '1.5rem'
        },

        paginationLabel: {
            fontSize: '1.4rem'
        },

        productForm: {
            margin: '2rem auto',
            width: '96%'
        },

        productImage: {
            width: '300px',
            height: '350px'
        },

        imageInput: {
            display: 'none'
        },

        uploadButton: {
            marginTop: '1rem',
        },

        productFieldPair: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '3rem'
        },

        productSpecPair: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
        },

        productTextfield: {
            width: '350px',
            marginRight: '1.5rem'
        },

        productSpecification: {
            width: '650px',
            marginRight: '1.5rem'
        },

        productSpecAddButton: {
            marginRight: '1.5rem'
        },

        specificationListItem: {
            listStyleType: 'none',
            padding: 0,
            margin: 0
        },

        specListItemText: {
            fontSize: '1.3rem'
        },

        specListPair: {
            display: 'flex',
            alignItems: 'center'
        },

        specListTooltip: {
            fontSize: '1.2rem',
            color: 'white',
            backgroundColor: 'red'
        },

        productActionPair: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '3.5rem'
        },

        productActionButton: {
            width: '200px',
            fontSize: '1.2rem',
            marginRight: '1.5rem',
            marginLeft: '1.5rem'
        },

        adminDialogText: {
            fontSize: '1.5rem',
            color: 'black'
        },

        adminDialogTitle: {
            marginBottom: '1.5rem',
            backgroundColor: '#0d47a1',
            color: 'white',
            fontWeight: 'bold'
        },

        adminDialogButton: {
            margin: '1rem',
            width: '10rem'
        },

        adminDialogCancelButton: {
            margin: '1rem',
            color: 'white',
            backgroundColor: '#d11d1d',
            '&:hover': {
                backgroundColor: '#ed1515'
            }
        },

        productDetailText: {
            fontStyle: 'italic'
        },

        productDetailButtons: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '4rem'
        },

        productDetailDeleteButton: {
            color: 'white',
            backgroundColor: '#d11d1d',
            '&:hover': {
                backgroundColor: '#ed1515'
            }
        },

        adminCategoryTextBox: {
            width: '350px',
            margin: '1rem auto'
        },

        categoryError: {
            marginBottom: '1.5rem',
            color: 'red',
            textAlign: 'center'
        },

        adminCategoryTable: {
            width: '60%',
            margin: 'auto'
        },

        categoryTable: {
            '& thead th': {
                fontSize: '1.4rem',
                fontWeight: 'bold',
                backgroundColor: '#ababab',
                color: '#0d47a1'
            },
            '& tbody td': {
                fontSize: '1.2rem'
            },
            '& tbody tr:hover': {
                backgroundColor: '#786e6e',
                cursor: 'pointer'
            },
            '& a:hover': {
                backgroundColor: '#786e6e'
            }
        },

        adminCategoryAddButton: {
            margin: '2rem auto',
            fontWeight: 'bold',
            fontSize: '1.4rem'
        },

        adminCategoryListText: {
            marginTop: '1.5rem',
            marginBottom: '1rem'
        },

        categoryProductTable: {
            '& thead th': {
                fontSize: '1.4rem',
                fontWeight: 'bold',
                backgroundColor: '#ababab',
                color: '#0d47a1'
            },
            '& tbody td': {
                fontSize: '1.2rem'
            }
        },

        tab: {
            marginTop: '4rem'
        },

        tabText: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            height: '60px'
        },

        orderFieldPair: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '3rem'
        },

        orderTextfield: {
            width: '350px',
            marginRight: '1.5rem',
            marginLeft: '1.5rem'
        },

        orderGrid: {
            marginRight: '1.5rem',
            marginLeft: '1.5rem'
        },

        orderCard: {
            display: 'flex',
        },

        orderCardMedia: {
            width: 150,
            height: 160
        },

        orderContentText: {
            marginBottom: '0.5rem'
        },

        orderPendingText: {
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: 'red'
        },

        orderCompletedText: {
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: 'green'
        }
    }   
};