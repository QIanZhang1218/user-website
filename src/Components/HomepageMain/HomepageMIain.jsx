import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import {alpha, makeStyles} from '@material-ui/core/styles';
// import ResponsiveCarousel from "../ResponsiveCarousel/ResponsiveCarousel"
import HomepageMain from './HomepageMain.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            width: '50%',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
export default function AlignItemsList() {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    //search tab
    const [currentTab, setCurrentTab] = useState('tab1');
    const tabList = [
        {
            name: 'tab1',
            label: 'Book',
            content: (
                <div className="tab-content">
                    <div className={classes.search}>
                        <label>Search: </label>
                        <input className={HomepageMain.inputSearch}
                               type="text"
                               placeholder="  Search Book Name"
                               classes={{
                                   root: classes.inputRoot,
                                   input: classes.inputInput,
                               }}
                               onChange={(event) =>handleOnChangeTitle(event)}
                        />
                    </div>
                </div>
            )
        },
        {
            name: 'tab2',
            label: 'Author',
            content: (
                <div className="tab-content">
                    <div className={classes.search}>
                        <label>Search: </label>
                        <input className={HomepageMain.inputSearch}
                               type="text"
                               placeholder="  Search Author Name"
                               classes={{
                                   root: classes.inputRoot,
                                   input: classes.inputInput,
                               }}
                               onChange={(event) =>handleOnChangeAuthor(event)}
                        />
                    </div>
                </div>
            )
        },
    ];
    //searchbar
    const [allData,setAllData] = useState([]);
    const [filteredData,setFilteredData] = useState(allData);
    useEffect(() => {
        axios.get( "/api/BookList/GetBookLIst",).then(response => {
            // setData(response.data);
            setAllData(response.data);
            setFilteredData(response.data);
            setLoading(false);
        });
    }, []);
    if (isLoading) {
        return <div className={HomepageMain.listUl}>Loading...</div>;
    }
    const handleOnChangeTitle = (event) => {
        event.preventDefault();
        // setInput(event.target.value);
        let value = event.target.value;
        console.log(value);
        let result = [];
        result = allData.filter((data) => {
            return data.bookName.toLowerCase().search(value) != -1;
        });
        console.log(result);
        setFilteredData(result);
    }
    const handleOnChangeAuthor = (event) => {
        event.preventDefault();
        // setInput(event.target.value);
        let value = event.target.value;
        console.log(value);
        let result = [];
        result = allData.filter((data) => {
            return data.bookAuthor.toLowerCase().search(value) != -1;
        });
        console.log(result);
        setFilteredData(result);
    }

    return (
        <div className={HomepageMain.mainBox}>
            {/*<CaroselTest/>*/}
            <div className={HomepageMain.searchBox}>
                <h1>XXXXXLibrary</h1>
                <h1>Kia ora, what are you looking for?</h1>
                <div className={HomepageMain.tabBox}>
                    {
                        tabList.map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentTab(tab.name)}
                                className={HomepageMain.tabBtn}>
                                {/*className={(tab.name === currentTab) ? 'active' : ''}>*/}
                                {tab.label}
                            </button>
                        ))
                    }
                </div>
                {
                    tabList.map((tab, i) => {
                        if(tab.name === currentTab) {
                            return <div key={i}>{tab.content}</div>;
                        } else {
                            return null;
                        }
                    })
                }
            </div>
            <List className={HomepageMain.listUl}>
            {filteredData.map((item,index ) => {
                return(
                <ListItem
                component ={Link}
                button
                to={"./BookDetails/BookDetails.jsx?id="+item.bookId}
                alignItems="flex-start" className={HomepageMain.listLi} key={item.bookId}
                >
                <ListItemAvatar>

                <img className={HomepageMain.bookImg} src={item.bookImg}  alt={'Image failed to load'}/>
                </ListItemAvatar>
                <div className={HomepageMain.bookInfoBox}>
                <ListItemText className={HomepageMain.bookInfo}
                primary={item.bookName}
                secondary={
                <React.Fragment>
            {item.bookAuthor}<br/>
            {item.bookPublishing}<br/>
                <Typography
                component="span"
                variant="body2"
                fontWeight="fontWeightBold"
                className={classes.inline}
                color="textPrimary"
                >
            {"Summary: "}
                </Typography>
                <Typography
                component="span"
                variant="body2"
                className={HomepageMain.summaryInfo}
                >
            {item.bookSummary}
                </Typography>
                </React.Fragment>
            }
                />
                <div className={HomepageMain.bookLocation}>
                <p>Location：{item.bookLocation}</p>
                <p>Available：{item.bookCurrentAmount}</p>
                </div>
                </div>
                </ListItem>
                )
            }

            )}
        </List>
        </div>
);
}