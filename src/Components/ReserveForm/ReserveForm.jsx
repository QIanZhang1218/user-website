import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom"
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    // KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
// import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
// import SignIn from "../SignIn/SignIn";
let bookId;
// var token =document.cookie.split(";")[0].split("=")[1];
export default function ReserveForm(props) {
    let history = useHistory();
    // let userId = '1';
    // const { register, handleSubmit } = useForm<FormValues>();
    const hash = useLocation()
    const [borrowDate, setBorrowDate] = useState(new Date());
    const [userId,setUserId] = useState();
    // const [userId,setUserId] = useState();

    const handleDateChange = (date) => {
        setBorrowDate(date);
    };
    bookId = hash.search.slice(4);
    function handleSubmit(event){
        event.preventDefault();
        var para = {
            bookId,userId,borrowDate
        }
        // let signInStatus;
        // console.log(para);
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
                }else if (res.data.message=="You have overdue books or unpaid fines"){
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
    // const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

    return (
        <form onSubmit={handleSubmit}>
            {/*<label>UserId: </label><input  />*/}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Select Borrow Start Date"
                        format="MM/dd/yyyy"
                        value={borrowDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <input type="submit" />
        </form>
    );
}
