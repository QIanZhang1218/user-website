import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Modal} from 'react-bootstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import HomepageMain from "../HomepageMain/HomepageMain.module.css";
import BR from "../BorrowRecord/BorrowRecord.module.css";
import {useHistory} from "react-router-dom";
import PayPenalty from "../PayPnealty/PayPenalty";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const columns = [
    {
        id: 'reserveDate',
        label: 'Reserve Date',
        minWidth: 150,
        format: (value) => value.substring(0, 10),
    },
    { id: 'bookName', label: 'Boook Name', minWidth: 170 },
    {
        id: 'borrowDate',
        label: 'Borrow Date',
        minWidth: 150,
        format: (value) => value.substring(0, 10),
    },
    {
        id: 'returnDate',
        label: 'Return Date',
        minWidth: 150,
        format:(value) => value.substring(0, 10),
    },
    {
        id: 'borrowStatus',
        label: 'Status',
        minWidth: 100,
        // format:(value) => {
        //   if (value == 0){
        //       return ("On hold");
        //   }else if(value == 1){
        //       return ("Return");
        //   }
        // },
    },
    { id: 'penalty', label: 'Penalty', minWidth: 80 },
    {
        id: 'button',
        align:'center',
        label: 'Extend',
        minWidth: 100,
    },
    {
        id: 'penaltyStatus',
        label: 'Pay Penalty',
        align:'center',
        minWidth: 80
    }

];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});
// let payPenaltyBtn;
export default function StickyHeadTable() {
    let history = useHistory();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isLoading, setLoading] = useState(true);
    const [record,setRecord] = useState(true);
    const [data,setData] = useState();
    const [item,setItem] = useState("");
    //react bootstrap modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        //event.preventDefault();
        //console.log(data);
        setItem(data);
         setShow(true);
    }
    const promise = loadStripe("pk_test_51JfBnYBuZCt7GKI5c6lgOY1ZoLrzBa5qwzqpQ10tEfCbjqMiGL7QrA3aAvR8Tyyhp0Paj7HYAwDIro42TjFGdEii00BAtVHilN");

    useEffect(() => {
        axios.get( "/api/BookList/GetBorrowRecords",).then(response => {
            if(response.data.message === "No records"){
               setRecord(false);
            }
            if(response.data.success){
                setData(response.data.bookList);
                setLoading(false);
            }else{
                history.push("SignIn");
            }
        })
    }, []);
    if (isLoading) {
        return <div className={HomepageMain.listUl}>Loading...</div>;
    }
    if(!record){
        return <div className={HomepageMain.listUl}>No relative records</div>;
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    function handleExtendClick(event){
        event.preventDefault();
        const recordId = event.target.id;
        var para = {
            recordId
        }
        console.log(recordId);
        axios({
            url: '/api/BookList/ExtendBorrowTime',
            method: 'post',
            headers: {
                'deviceCode': 'A95ZEF1-47B5-AC90BF3'
            },
            contentType:'application/json'
            ,
            data: {
                recordId: para.recordId
            }}).then(response => {
                alert(response.data.message);
                window.location.href="/BorrowRecord";
            }
        )

    }
    function handlePay(event){
        console.log(event.target);
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={data.code}>
                                    {columns.map((column) => {
                                        const value = data[column.id];
                                        // change status display
                                        if (column.id ==="borrowStatus"){
                                            const penalty = data.penalty;
                                            const penaltyStatues = data.penaltyStatus;
                                            switch(data.borrowStatus) {
                                                case 10:
                                                    return (<td className={BR.statusTd}>Reserved</td>);
                                                case 20:
                                                    if(penalty > 0 && penaltyStatues==0){
                                                        return(<td className={BR.statusTd} style={{ color: 'red',fontWeight : 600 }}>Overdue</td>)
                                                    }
                                                    return (<td className={BR.statusTd}>On hold</td>)
                                                case 30:
                                                    return(<td className={BR.statusTd}>Returned</td>)
                                                case 40:
                                                    return(<td className={BR.statusTd} style={{ color: 'red',fontWeight : 600 }}>Overdue</td>)
                                                case 99:
                                                    return(<td className={BR.statusTd} style={{ color: 'dimgrey' }}>Cancelled</td>)
                                                default:
                                                    return (<td className={BR.statusTd}>Null</td>);
                                            }
                                        }
                                        //button style control.
                                        //If expired return date but still not return book then display overdue button.
                                        //If the book was return on time then display returned button
                                        //If the book is still on hold and not expire the return date then display extend button which allows reader to extend borrow period 7 days a time.
                                        if( data.borrowStatus == 10){
                                            if (column.id ==="button"){
                                                    return (
                                                        <td className={BR.extendTd}><button id={data.recordId} className={BR.extendBtn} onClick={handleExtendClick}>EXTEND</button></td>
                                                    );
                                                }
                                        }else if(data.borrowStatus == 20){
                                            if (data.penalty >0 && data.penaltyStatus == 0){
                                                if (column.id ==="button"){
                                                    return (
                                                            <td className={BR.extendTd}></td>
                                                    );
                                                }}
                                            else {
                                                if(column.id ==="button"){
                                                    return (
                                                        <td className={BR.extendTd}><button id={data.recordId} className={BR.extendBtn} onClick={handleExtendClick}>EXTEND</button></td>
                                                    );
                                                }
                                            }
                                       }else if( data.borrowStatus == 30){
                                            if (column.id ==="button"){
                                                    return (
                                                        <td className={BR.extendTd}></td>
                                                    );
                                            }
                                       }else if (data.borrowStatus == 40){
                                            if (column.id ==="button"){
                                                    return (
                                                        <td className={BR.extendTd}></td>
                                                    );
                                            }
                                       }else if( data.borrowStatus == 99){
                                            if (column.id ==="button"){
                                                    return (
                                                        <td className={BR.extendTd}></td>
                                                    );
                                            }
                                       }else{
                                            if (column.id ==="button"){
                                                return (
                                                    <td className={BR.extendTd}><button id={data.recordId} className={BR.extendBtn} onClick={handleExtendClick}>EXTEND</button></td>
                                                );
                                            }
                                      }
                                        //change the color of penalty amount
                                        if (column.id === "penalty") {
                                            if (data.penalty >0){
                                                return(
                                                    <td className={BR.penaltyAmount}>{data.penalty}</td>
                                                )
                                            }
                                        }
                                        //If unpaid
                                        if (column.id === "penaltyStatus"){
                                            if (data.penalty >0 && data.penaltyStatus == false && data.borrowStatus ==30){
                                                return(
                                                    <td className={BR.extendTd}><button id={data.recordId} className={BR.payBtn} onClick={()=>handleShow(data)}>Pay</button></td>
                                                )
                                            }else if(data.penalty > 0  && data.penaltyStatus == true){
                                                return(
                                                    <td className={BR.extendTd}>Paid</td>
                                                )
                                            }
                                        }

                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {/*{column.format && typeof value === 'number' ? column.format(value) : value}*/}
                                                {column.format  ? column.format(value) : value}
                                            </TableCell>

                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/*<div>{payPenaltyBtn}</div> */}
            {/*react bootstrap modal*/}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Pay penalty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Elements stripe={promise}>
                        <PayPenalty record= {item} />
                    </Elements>
                </Modal.Body>
            </Modal>
        </Paper>
    );
}