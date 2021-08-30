import React, {useState} from 'react';
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
     const classes = useStyles();
     const [name,setName] = useState('');
     const [email,setEmail]=useState('');
     const [password,setPassword]=useState('');
     function handleSubmit(event){
         event.preventDefault();
         var para = {
             name,email,password
         }
         console.log(para);
         axios({
             url: '/api/SignUp/PushSignUps',
             method: 'post',
             headers: {
                 'deviceCode': 'A95ZEF1-47B5-AC90BF3'
             },
             contentType:'application/json'
             ,
             data: {
                 name: para.name,
                 email: para.email,
                 password:para.password
             }})
     }

    return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField onInput={ e=>setName(e.target.value)}
                            autoComplete="rname"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="readerName"
                            label="Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onInput={ e=>setEmail(e.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onInput={ e=>setPassword(e.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="../SignIn/SignIn.jsx" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
        {/*<Box mt={5}>*/}
        {/*    <Copyright />*/}
        {/*</Box>*/}
    </Container>)
}