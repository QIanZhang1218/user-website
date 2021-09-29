import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom"
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
    MuiPickersUtilsProvider,
    // KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import ReserveFormStyle from "./ReserveForm.module.css";
let bookId;
export default function ReserveForm(props) {
    let history = useHistory();
    const hash = useLocation()
    const [borrowDate, setBorrowDate] = useState(new Date().setDate(new Date().getDate()+1));
    const reserveDate = moment().format('YYYY-MM-DD');
    const handleDateChange = (date) => {
        console.log(date);
        setBorrowDate(date);
    };
    bookId = hash.search.slice(4);
    function handleSubmit(event){
        event.preventDefault();
        var para = {
            bookId,borrowDate,reserveDate
        }
        console.log(para);
        axios({
            url: '/api/BookList/ReserveBooks',
            method: 'post',
            headers: {
                'deviceCode': 'A95ZEF1-47B5-AC90BF3'
            },
            contentType:'application/json'
            ,
            data: para
        }).then((res) => {
            console.log(res.data);
            if (res.data.success === false){
                if (res.data.message=="Have not sign in."){
                    history.push("/SignIn");
                }else if (res.data.message=="Sorry,can't reserve this book.You have overdue books"){
                    alert(res.data.message);
                    history.push("/BorrowRecord");
                }else if (res.data.message == "You have already reserve this book."){
                    alert(res.data.message);
                    history.push("/BorrowRecord");
                }
            }
            else{
                alert('Reserve Successful')
                history.push("/")
            }
        })
    }
    //date pick always start from tomorrow(compare to current time)
    var tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    return (
        <div className={ReserveFormStyle.containerDiv}>
            <h3>Please Select Pick Up Date</h3>
            <form onSubmit={handleSubmit}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Select Borrow Start Date"
                            format="MM/dd/yyyy"
                            minDate={tomorrow}
                            value={borrowDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <input className={ReserveFormStyle.submitBtn} type="submit" value = "Submit"/>
            </form>
        </div>

    );
}
