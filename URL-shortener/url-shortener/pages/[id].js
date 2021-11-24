import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'

const redirect = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log(id)

    useEffect(() => {
        if (id) {
            axios.post(`http://localhost:3000/get-short-url`, { urlId: id }).then((res) => window.location.href = res.data.originalUrl).catch(err => console.log(err))
        }
    }, [id])

    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    )
}

export default redirect
