import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import HomepageMain from "../HomepageMain/HomepageMain.module.css";
import Button from "@material-ui/core/Button";
import BR from "../BorrowRecord/BorrowRecord.module.css";

const columns = [
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
        id: 'status',
        label: 'Status',
        minWidth: 100,
        format:(value) => {
          if (value == 0){
              return ("On hold");
          }else if(value == 1){
              return ("Return");
          }
        },
    },
    { id: 'penalty', label: 'Penalty', minWidth: 80 },
    {
        id: 'button',
        align:'center',
        label: 'Extend',
        minWidth: 100,
    },

];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isLoading, setLoading] = useState(true);
    const [data,setData] = React.useState();

    useEffect(() => {
        axios.get( "/api/BookList/GetBorrowRecords",).then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);
    if (isLoading) {
        return <div className={HomepageMain.listUl}>Loading...</div>;
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function handleExtendClick(event){
        event.preventDefault();
        console.log(event.target.id);
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
                                        const currentDate = new Date().getTime();
                                        const returnDate = new Date(data.returnDate).getTime();
                                        // console.log(data.returnDate);
                                        if(currentDate > returnDate){
                                            if (column.id ==="button"){
                                                return (
                                                    <td className={BR.extendTd}><button id={data.recordId} className={BR.disableBtn} disabled="disabled">Overdue</button></td>
                                                );
                                            }
                                        }
                                        else if( data.status == true){
                                            if (column.id ==="button"){
                                                return (
                                                    <td className={BR.extendTd}><button id={data.recordId} className={BR.disableBtn} disabled="disabled">Returned</button></td>
                                                );
                                            }
                                        }
                                        else {
                                            if (column.id ==="button"){
                                                return (
                                                    <td className={BR.extendTd}><button id={data.recordId} className={BR.extendBtn} onClick={handleExtendClick}>EXTEND</button></td>
                                                );
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
        </Paper>
    );
}