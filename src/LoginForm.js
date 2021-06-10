import { Button, TextField } from "@material-ui/core";
import { useState, useEffect } from 'react';
import { login, login_by_key } from './Api';


const LOGIN_KEY = 'LOGIN_KEY';

const LoginForm = (props) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    const getMyName = () => {
        if(props.isLoggedIn){
            login_by_key(localStorage.getItem(LOGIN_KEY))
            .then( _name => {
                setName(_name.name.split('@')[0]);
            })
        }        
    }

    const style = {
        marginBottom: '10px',
    }

    const onLogin = async (e) => {
        e.preventDefault();
        try{
            const { key } = await login(name, password);
            localStorage.setItem(LOGIN_KEY, key);
            props.onClick();
        } catch{
            failLogin();
        }
    }

    const Logout = () => {
        localStorage.removeItem(LOGIN_KEY);
        props.onClick();
    }

    const failLogin = () => {
        alert("아이디 혹은 비밀번호를 다시 확인해주세요!")
    }

    useEffect(() => {
        getMyName();
    }, [props.isLoggedIn])

    if(props.isLoggedIn){
        return (
            <div className="logout-form">
              <div style={style}>{name} 님 반가워요!</div>
              <Button type="submit" variant="contained" color="primary" size="large" onClick={ Logout }>Logout</Button>
            </div>
        );
    }
    else{
        return (
            <div>
                <form className="login-form" noValidate autoComplete="off" onSubmit={ onLogin }>
                    <TextField size="small" id="filled-basic" label="ID" variant="filled" onChange={e => setName(e.target.value)}/>
                    <TextField size="small" id="filled-basic" label="password" variant="filled" type="password" onChange={e => setPassword(e.target.value)}/>
                    <Button type="submit" variant="contained" color="primary" href="" size="large">Login</Button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
