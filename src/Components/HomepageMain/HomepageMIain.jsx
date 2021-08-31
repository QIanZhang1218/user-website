import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import HomepageMain from './HomepageMain.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },

}));

export default function AlignItemsList() {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    useEffect(() => {
        axios.get( "/api/BookList/GetBookLIst",).then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);
    if (isLoading) {
        return <div className={HomepageMain.listUl}>Loading...</div>;
    }
    return (
        <List className={HomepageMain.listUl}>
            {data.map(item => (
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
            ))}
        </List>
);
}