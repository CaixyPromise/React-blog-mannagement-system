// 和用户相关的状态管理
import {createSlice} from "@reduxjs/toolkit";
import { request } from "@/utils/request";
import { setToken as _setToken, getToken , removeToken} from "@/utils";

const userStore = createSlice({
    name: "user",
    initialState: 
    {
        token: getToken() || '',
        userInfo: {}
    },
    // 修改方法
    reducers: 
    {
        setToken(state, action)
        {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action)
        {
            state.userInfo = action.payload
        },
        ClearUserInfo(state)
        {
            state.token = '';
            state.userInfo = {};
            removeToken();
        }
    }
})

const {setToken, setUserInfo, ClearUserInfo} = userStore.actions;
const userReducer = userStore.reducer;
const fetchLogin = (loginForm) => 
{
    return async (dispatch) => 
    {
        try {
            const response = await request.post("/login", loginForm);
            dispatch(setToken(response.data.access_token));
            return (response); 
        } 
        catch (error) 
        {
            console.error("Login error: ", error.response ? error.response.data : error.message);
            return Promise.reject({ error: error.response ? error.response.data : error.message }); 
        }
    }
}

export {
    setToken,
    fetchLogin,
    setUserInfo, 
    ClearUserInfo
};

export default userReducer;