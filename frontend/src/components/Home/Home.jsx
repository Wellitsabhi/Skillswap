import { useEffect } from 'react'
import GetStartedBtn from './GetStartedBtn'
import { defaultUser } from '../utils/defaultUser'
import Axios from 'axios'
import { useAlert } from '../utils/AlertProvider'
import { checkToken } from '../utils/checkToken'
import { useUser } from '../utils/UserProvider'
import { useLoading } from '../utils/LoadingProvider'

export default function Home() {
    const { alert, setAlert } = useAlert()
    const { userData, setUserData } = useUser()
    const {setIsLoading} = useLoading()

    useEffect(() => {
        const logoutPrevUser = async () => {
            if (checkToken()) {
                setIsLoading(true)
                await Axios.post(`${import.meta.env.VITE_BACKEND_URL}user/logout`)
                setUserData({ ...defaultUser })
                setAlert({
                    message: "Previous user logged out.",
                    type: 'success'
                })
                console.log("Previous user logged out.")
                setIsLoading(true)
            }
        }

        logoutPrevUser()
    }, [])

return (
    <>
        <div className='space-around flex justify-center items-center'>
            <div className='min-w-80'>.</div>
            <div className="container">
                <GetStartedBtn />
            </div>
        </div>
    </>
)
}