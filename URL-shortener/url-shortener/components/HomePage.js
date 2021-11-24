import { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [originalUrl, setOriginalUrl] = useState();
    const [url, setUrl] = useState();

    const createurl = () => {
        axios.post('http://localhost:3000/create-short-url', { originalUrl }).then((res) => setUrl(res.data.shortUrl)).catch(err => console.log(err))
    }

    return (
        <div className="">
            <h1>Enter URL to shorten</h1>
            <input type="text" className="border" onChange={(e) => setOriginalUrl(e.target.value)} /> <button onClick={createurl} className="cursor-pointer border-2 bg">Shorten</button>

            <p>Your shortened url Is: <a href={url}>{url}</a> </p>
        </div>
    )
}

export default HomePage
