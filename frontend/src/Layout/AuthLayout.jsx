import {Outlet} from 'react-router-dom'; 

const AuthLayout=()=>{
    return(
        <>
            <main className='bg-white dark:bg-gray-900'>
                <Outlet/>
        </main>
        </>
    )
}

export default AuthLayout;