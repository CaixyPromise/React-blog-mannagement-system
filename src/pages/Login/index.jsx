import "./index.scss"
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";
import { encryption } from "@/utils/encryptionUtils";
import { useNavigate } from 'react-router-dom';
import { HaveToken } from "@/utils";
import { Alert } from "antd";

const Login = () =>
{
    const [Login, setLogin] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);
    // const accountRef = useRef(null);
    const accountRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (HaveToken())
        {
            navigate('/home');
        }
    }, [navigate]);
    useEffect(() => {
        const account = localStorage.getItem("account");
        if (account)
        {
            accountRef.current.value = account;
        }
    }, []);
    const dispatch = useDispatch();
    console.log(HaveToken())
    
    


    const makeLogin = async (event) =>
    {
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        event.preventDefault(); 
        const account = accountRef.current.value;
        const password = passwordRef.current.value;
        

        if (account === "" || password === "")
        {
            alert("请输入账号密码");
            return;
        }
        if (!isValidEmail(account)) 
        {
            alert("请输入正确的邮箱账号");
            return;
        }
        if (password.length < 8 || password.length > 50) 
        {
            alert("密码长度应该在8到50个字符之间");
            return;
        }
        const encryptedBody = await encryption(account, password);
        try {
            const response = await dispatch(fetchLogin(encryptedBody))
            console.log(response);
            console.log(response.status);
            if (response.code === '200')
            {
                localStorage.setItem("account", account);
                navigate("/home")
                console.log("登录成功");
                // setLogin(true);
            }
        }
        catch (error)
        {
            const errorMsg = error && error.response && error.response.data ? error.response.data : "An unknown error occurred";
            setErrorMessage(errorMsg);
        }
    }

    const handleKeyDown = (event) => {
        console.log(event.key);
        if (event.key === "Enter") {
            makeLogin(event);
        }
    };

    return (
        <div className="loginPage">
            {errorMessage && <Alert message="Error" description={errorMessage} type="error" />}
            <div className="login">
            <h2>用户登录</h2>
            <div className="login_box">
                <input type="text" required ref={accountRef}/><label>邮箱</label>
            </div>
            <div className="login_box">
                <input type="password" required="required" ref={passwordRef}/><label>密码</label>
            </div>
            <button className="loginButton" onClick={makeLogin} onKeyDown={handleKeyDown}>
                登录
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
            </div>
        </div>
    )
}

export default Login