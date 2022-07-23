import React from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
    const inter = setInterval(() => {
        if (document.querySelector('.navbar') !== null) {
            clearInterval(inter)
            fun()
        }
    }, 0)
    const fun = () => {
        const links = document.querySelectorAll('.navbar .navbar-link')
        links.forEach(link => {
            link.addEventListener('click', () => {
                for (const li of links) {
                    li.classList.remove('on')
                }
                link.classList.add('on')
            })
        });
    }
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
                <h6>Me</h6>
            </Link>
        </nav>
    )
}
export default Nav