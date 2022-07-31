import React, { useEffect } from "react"

const Home = () => {
    useEffect(() => {
        if (localStorage.length == 0) {
            window.open(origin + '/sign', '_self')
        }
    })
    return (
        <div className="home-page">
            <h1>Selamat datang</h1>
        </div>
    )
}
export default Home