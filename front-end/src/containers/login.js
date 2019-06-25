import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import '../styles/login.css';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
      }
    }
})(TextField);

const useStyles = makeStyles(theme => ({
    textField: {
        color: '#ffffff',
    },
    label: {
        color: 'white',
        '&$focused': {
          color: '#ffffff'
        }
    },
    focused: {},
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            }
        }
    },
    outlinedInput: {
        '&$focused $notchedOutline': {
        border: '1px solid #ffffff'
        }
    },
    notchedOutline: {}
}));

export default function Login(props) {
    const classes = useStyles();
    const [user, setUser] = React.useState(
        { account: '', password: '' }
    );
    let userFromDB = [];
    
    const getUserFromDb = async () => {
        await fetch("http://localhost:3002/api/getUser")
        .then(res => { return res.json() })
        .then(res => ( userFromDB = res.data) );
        //console.log(userFromDB[0].account);
    };

    const change = name => e => {
        setUser({...user, [name]: e.target.value });
    };

    const login = async () => {
        let successLogIn = false;
        let registered = false;
        let passwordRight = false;

        await getUserFromDb();
        userFromDB.forEach(dat =>{
            if (dat.account === user.account) {
                registered = true;
                if (dat.password === user.password) {
                    passwordRight = true;
                    localStorage.setItem('name', 'dat.name');
                }
            }
        })

        if (registered === false) {
            alert("this account is not registered");
        }
        else {
            if (passwordRight === false)
                alert("wrong password");
            else {
                alert("log in success");
                successLogIn = true;
            }
        }
        
        userFromDB = [];
        await setUser({ account: '', password: '' });
        if(passwordRight)
            props.login();
        //console.log(userFromDB[0].account)
        //console.log(userFromDB[0].account);
        // axios.post("http://localhost:3002/api/putUser", {
        //     account: user.account,
        //     password: user.password,
        // });
    }

    return (
        <div className="login">
            <div className="login-header">
                <header><h1 style={{ color: '#ffffff', textAlign: 'center', fontSize: '50px' }}><b>歡迎來到 Music Converter</b></h1></header>
            </div>
            <div className="login-input">
                <div className="login-subinput">
                    <div className="login-box"><span style={{ color: '#ffffff' }}>請輸入帳號</span></div>
                    <div className="login-box">
                    <CssTextField
                        id="account"
                        label="帳號"
                        InputLabelProps={{
                            classes: {
                              root: classes.label,
                              focused: classes.focused,
                            },
                        }}
                        InputProps={{
                            root: classes.outlinedInput,
                            focused: classes.focused,
                            className: classes.textField
                        }}
                        value={user.account}
                        variant="outlined"
                        margin="normal"
                        onChange={change('account')}
                        autoComplete="off"
                    />
                    </div>
                </div>
                <div className="login-subinput">
                    <div className="login-box"><span style={{ color: '#ffffff' }}>請輸入密碼</span></div>
                    <div className="login-box">
                    <CssTextField
                        id="password"
                        label="密碼"
                        type="password"
                        InputLabelProps={{
                            classes: {
                              root: classes.label,
                              focused: classes.focused
                            },
                        }}
                        InputProps={{
                            root: classes.outlinedInput,
                            focused: classes.focused,
                            className: classes.textField
                        }}
                        variant="outlined"
                        margin="normal"
                        value={user.password}
                        onChange={change('password')}
                        autoComplete="off"
                    />
                    </div>
                </div>
                <div className="login-actions">
                    <span className="login-button"><Button variant="contained" onClick={login}><b>登入</b></Button></span>
                    <span className="login-button"><NavLink to="/register" style={{ textDecoration: 'none' }}><Button variant="contained"><b>註冊</b></Button></NavLink></span>
                </div>
            </div>
        </div>
    )
}
