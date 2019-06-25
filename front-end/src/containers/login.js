import React, { Component } from "react";
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

export default function Login() {
    const classes = useStyles();
    const [user, setUser] = React.useState(
        { account: '', password: '' }
    );

    const change = name => e => {
        setUser({...user, [name]: e.target.value });
        // if(name === 'account')
        //     setUser({...user, account: e.target.value });
        // else
        //     setUser({...user, password: e.target.value });
    };

    const login = () => {
        axios.post("http://localhost:3002/api/putUser", {
            account: user.account,
            password: user.account,
        });
        
        // setAccount({ account: '' });
        // setPassword({ password: '' });
    }

    const register = () => {
        setUser({ account: '', password: '' });
        console.log(user);
    }

    return (
        <div className="login">
            <div className="login-header">
                <header><h1 style={{ color: '#ffffff', textAlign: 'center', fontSize: '50px' }}><b>Welcome To Music Converter</b></h1></header>
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
                    <span className="login-button"><Button variant="contained" onClick={register}><b>註冊</b></Button></span>
                </div>
            </div>
        </div>
    )
}