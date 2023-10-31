import React from 'react'
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'


export default function AuthRouter({children}) 
{
    const token = getToken()
    if (token)
    {
        return <>{children}</>
    }
    else{
        return <Navigate to='/login' replace />
    }
}
