import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Link,Route} from 'react-router-dom';
import HomepageMain from '../HomepageMain/HomepageMIain';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import BookDetails from '../BookDetails/BookDetails';
import BorrowRecord from '../BorrowRecord/BorrowRecord';
import AboutLibrary from "../AboutLibrary/AboutLibrary";
import Header from "../Header/Header.module.css"
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(12),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
        grow: {
            flexGrow: 1,
        },

        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
}));

//Log out clear cookie
function handleLogOut(){
    let cookie = document.cookie;
    if(window.confirm("Are you sure to log out?")){
        if(cookie != null){
            document.cookie = "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            //document.cookie= "user_token"+"="+cookie+";expires="+exp.toGMTString();
            window.location.href="/";
        }

    }
}

//Open Signin page
function openSignin(){
    window.location.href="../SignIn"
}

let userName;
export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        console.log(this);
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    if(document.cookie == ""){
        userName = <button className={Header.headerButton} onClick={openSignin}>Sign In</button>
    }else{
        userName = <button className={Header.headerButton} onClick={handleLogOut}>Log Out</button>
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Library
                    </Typography>
                    {/*User Name*/}
                    <div className={Header.buttonBox}>
                        <h6>{userName}</h6>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem component={Link} to="/AboutLibrary" button>
                        <ListItemIcon>
                            <InfoOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="About Library" />
                    </ListItem>
                    <ListItem component={Link} to="/" button>
                        <ListItemIcon>
                            <HomeOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem component={Link} to="/signin" button>
                        <ListItemIcon>
                            <LockOpenIcon />
                        </ListItemIcon>
                        <ListItemText primary="SignIn" />
                    </ListItem>
                    <ListItem component={Link} to="/signup" button>
                        <ListItemIcon>
                            <ExitToAppOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="SignUp" />
                    </ListItem>
                    <ListItem component={Link} to="/BorrowRecord" button>
                        <ListItemIcon>
                            <ListAltOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Borrow Record" />
                    </ListItem>
                    <ListItem onClick={handleLogOut} button>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="LogOut" />
                    </ListItem>
                    
                </List>
                <Divider />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >

                <Route path="/" component={HomepageMain} exact/>
                <Route path="/AboutLibrary" component={AboutLibrary} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/BorrowRecord" component={BorrowRecord}/>
                <Route path="/BookDetails/:id"  component={BookDetails}/>
            </main>
        </div>
    );
}
