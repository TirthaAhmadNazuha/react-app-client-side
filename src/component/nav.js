import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
    useEffect(() => {
        if (window.location.href === window.location.origin + '/sign') {
            document.querySelector('.navbar').style.display = 'none'
        } else document.querySelector('.navbar').style.display = 'flex'
        const links = document.querySelectorAll('.navbar .navbar-link')
        links.forEach(link => {
            link.addEventListener('click', () => {
                for (const li of links) {
                    li.classList.remove('on')
                }
                link.classList.add('on')
            })
        })
    })
    return (
        <nav className='navbar'>
            <Link to='/' className='navbar-link home on'>
                <i className='material-symbols-rounded md'>
                    home
                </i>
                <h6>beranda</h6>
            </Link>
            <Link to='/explore' className='navbar-link explore'>
                <i className='material-symbols-rounded md'>
                    explore
                </i>
                <h6>eksplorasi</h6>
            </Link>
            <Link to='/nontification' className='navbar-link nontifications'>
                <i className='material-symbols-rounded md'>
                    notifications
                </i>
                <h6>notifikasi</h6>
            </Link>
            <Link to='/user' className='navbar-link user'>
                <i className='material-symbols-rounded md'>
                    account_circle
                </i>
                <h6>Saya</h6>
            </Link>
        </nav>
    )
}
export default Nav