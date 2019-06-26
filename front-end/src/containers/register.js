import React from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/login.css';
import '../styles/convertion.css';

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

export default function Register(props) {
    const classes = useStyles();
    const [user, setUser] = React.useState(
        { account: '', password: '', email: '', name: '' }
    );

    const [waiting, setWaiting] = React.useState(false);

    const change = name => e => {
        setUser({...user, [name]: e.target.value });
    };

    const register = async () => {
        await setWaiting(true);

        let data = { name: user.name, account: user.account, password: user.password, email: user.email };
        await fetch('http://localhost:3002/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => { return res.json() })
        .then(res => {
            if(res.success){
                setTimeout(() => {
                    setWaiting(false);
                    props.history.push('/login')
                }, 1500);
            }
            else {
                setTimeout(() => {
                    setWaiting(false);
                    setUser({ account: '', password: '', email: '', name: '' });
                    alert('Fail.');
                }, 1500);
            }
        })
        .catch((err) => {
            console.error(err);
            setTimeout(() => {
                setWaiting(false);
                setUser({ account: '', password: '', email: '', name: '' });
                alert('Fail.');
            }, 1500);
        });
        // props.history.push('/login');
    }

    return (
        <div className="login">
            <div className="register-header">
                <header><h1 style={{ color: '#ffffff', textAlign: 'center', fontSize: '50px' }}><b>歡迎註冊</b></h1></header>
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
                    <div className="login-box"><span style={{ color: '#ffffff' }}>請輸入信箱</span></div>
                    <div className="login-box">
                    <CssTextField
                        id="email"
                        label="信箱"
                        type="email"
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
                        value={user.email}
                        onChange={change('email')}
                        autoComplete="off"
                    />
                    </div>
                </div>
                <div className="login-subinput">
                    <div className="login-box"><span style={{ color: '#ffffff' }}>請輸入姓名</span></div>
                    <div className="login-box">
                    <CssTextField
                        id="name"
                        label="姓名"
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
                        value={user.name}
                        variant="outlined"
                        margin="normal"
                        onChange={change('name')}
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
                    <span className="login-button"><Button variant="contained" onClick={register}><b>註冊</b></Button></span>
                    <span className="login-button"><Button variant="contained" onClick={() => props.history.goBack()}><b>返回</b></Button></span>
                </div>
            </div>
            {waiting ? <div className="spinning"><CircularProgress size={80} thickness={5} /></div> : null}
        </div>
    )
}
