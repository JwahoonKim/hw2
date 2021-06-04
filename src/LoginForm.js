import { Button, TextField } from "@material-ui/core";
import { useEffect, useState } from 'react';
import { login, loginByKey } from './Api';
import Assets from "./Assets";

const LOGIN_KEY = 'LOGIN_KEY';

const LoginForm = (props) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const ID = localStorage.getItem(LOGIN_KEY)
    const userName = ID ? ID.split('@')[0] : null

    const onLogin = async (e) => {
        e.preventDefault();
        const { key } = await login(name, password);
        localStorage.setItem(LOGIN_KEY, key);
        props.onClick();
    }

    const Logout = () => {
        localStorage.removeItem(LOGIN_KEY);
        props.onClick();
    }

    if(props.isLoggedIn){
        return (
            <>
              <div>{userName} 님 반가워요!</div>
              <Button type="submit" variant="contained" color="primary" onClick={ Logout }>Logout</Button>
              <div className="assets">
                <Assets/>
              </div>
            </>
        );
    }
    else{
        return (
            <div>
            <h3>로그인을 해주세요.</h3>
            <form className="login-form" noValidate autoComplete="off" onSubmit={ onLogin }>
                <TextField size="small" id="filled-basic" label="ID" variant="filled" onChange={e => setName(e.target.value)}/>
                <TextField size="small" id="filled-basic" label="password" variant="filled" type="password" onChange={e => setPassword(e.target.value)}/>
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </form>
            </div>
        );
    }
}

export default LoginForm;
