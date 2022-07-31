import React, { useState } from "react"
import FunLocalStorage from "../function/localstorage"
const Sign = () => {
    const [leftNumberBgon, setLeftNumberBgon] = useState('6px')
    const [signUpOrLogIn, setSignUpOrLogIn] = useState('signup')
    const GenerateInp = () => {
        if (signUpOrLogIn === 'signup') {
            return (
                <div name="signup" className="form-input">
                    <div className="first">
                        <label htmlFor="inputName">Masukan nama kamu</label><br />
                        <input type="text" name="name" id="inputName" placeholder="Boleh nama panggilan aja kok" onKeyUp={(e) => formInpHandleKeyUp(e)} required /><br />
                        <label htmlFor="inputUsername">Buat Username</label><br />
                        <input type="text" name="username" id="inputUsername" placeholder="Jangan pake spasi dan simbol tertentu yak" onKeyUp={(e) => formInpHandleKeyUp(e)} required /><br />
                        <div className="signup-btn next" onClick={(e) => nextOrBackBtnHandleClick(e, 'next')} disabled>Lanjut</div>
                    </div>
                    <div className="second" style={{ display: 'none' }}>
                        <label htmlFor="inputEmail">Masukan Email kamu</label><br />
                        <input type="email" name="email" id="inputEmail" placeholder="Tenang aku gak akan spam" onKeyUp={(e) => formInpHandleKeyUp(e)} required /><br />
                        <label htmlFor="inputPassword">Buat Password</label><br />
                        <input type="password" contenttype="password" name="password" id="inputPassword" placeholder="Password buat Web ini" onKeyUp={(e) => formInpHandleKeyUp(e)} required />
                        <div className="viewPass" parent="signup" onClick={(e) => viewPassHandleClick(e)}><i className="material-symbols-rounded sm">visibility</i></div>
                        <br />
                        <label htmlFor="inputPasswordValidIn">Tulis ulang passwordnya</label><br />
                        <input type="password" contenttype="password" name="passwordvalidin" id="inputPasswordValidIn" placeholder="Biar inget" onKeyUp={(e) => formInpHandleKeyUp(e)} required />
                        <div className="viewPass" parent="signup" onClick={(e) => viewPassHandleClick(e)}><i className="material-symbols-rounded sm">visibility</i></div>
                        <br />
                        <button className="signup-btn" id="signup-submit" type="submit" disabled>Daftar</button>
                        <div className="undo" onClick={(e) => nextOrBackBtnHandleClick(e, 'undo')}>Kembali</div>
                    </div>
                </div>
            )
        } else if (signUpOrLogIn === 'login') {
            return (
                <div name="login" className="form-input">
                    <label htmlFor="login-inputUsername">Masukan Email</label><br />
                    <input type="text" name="username" id="login-inputUsername" placeholder="Username" onKeyUp={(e) => formInpHandleKeyUp(e)} required /><br />
                    <label htmlFor="login-inputPassword">Masukan Password</label><br />
                    <input type="password" contenttype="password" name="password" id="login-inputPassword" placeholder="Passwordnya" onKeyUp={(e) => formInpHandleKeyUp(e)} required />
                    <div className="viewPass" parent="login" onClick={(e) => viewPassHandleClick(e)}><i className="material-symbols-rounded sm">visibility</i></div>
                    <br />
                    <button id="login-btn-submit" type="submit" disabled>Masuk</button>
                </div>
            )
        }
    }
    const isUserNameValid = (username) => {
        /* 
          Usernames can only have: 
          - Lowercase Letters (a-z) 
          - Numbers (0-9)
          - Dots (.)
          - Underscores (_)
        */
        const res = /^[a-z0-9_.]+$/.exec(username);
        const valid = !!res;
        return valid;
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const id = +new Date()
            const d = new Date()
            const date = ("00" + d.getDate()).slice(-2)
                + "/" + ("00" + (d.getMonth() + 1)).slice(-2)
                + "/" + d.getFullYear() + " "
                + ("00" + d.getHours()).slice(-2) + ":"
                + ("00" + d.getMinutes()).slice(-2)
                + ":" + ("00" + d.getSeconds()).slice(-2)

            if (signUpOrLogIn === 'signup') {
                const name = document.querySelector('.sign #inputName').value
                const username = document.querySelector('.sign #inputUsername').value
                const email = document.querySelector('.sign #inputEmail').value
                const password = document.querySelector('.sign #inputPassword').value
                FunLocalStorage.set('kamu', JSON.stringify({ id, name, username, email }))
                fetch('../../signup', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, name, username, email, password, date })
                }).then(res => res.json()).catch(err => console.log('Fetch in handleSubmit Error :', err))
            } else {
                const username = document.querySelector('.sign #login-inputUsername').value
                const password = document.querySelector('.sign #login-inputPassword').value
                fetch('../../login', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                }).then(res => res.json()).then(data => {
                    FunLocalStorage.set('kamu', JSON.stringify(data))
                    window.open(window.location.origin + '/', '_self')
                }).catch(err => console.log('Fetch in handleSubmit Error :', err))
            }
        } catch (err) {
            console.log('Try in handleSubmit Error :', err)
        }
    }
    const upOrInInpRadioHandleChange = (e) => {
        if (e.target.id === 'up') {
            setSignUpOrLogIn('signup')
            setLeftNumberBgon('6px')
        } else if (e.target.id === 'in') {
            setSignUpOrLogIn('login')
            setLeftNumberBgon('50%')
        }
        GenerateInp()
        validator()
    }
    const nextOrBackBtnHandleClick = (e, type) => {
        e.preventDefault()
        try {
            if (document.querySelector('.sign')) {
                if (type === 'next' && !e.target.getAttribute('disabled')) {
                    document.querySelector('.sign .first').style.display = 'none'
                    document.querySelector('.sign .second').style.display = 'block'
                } else if (type === 'undo') {
                    document.querySelector('.sign .first').style.display = 'block'
                    document.querySelector('.sign .second').style.display = 'none'
                }
            }
        } catch (err) {
            console.log('Try in nextOrBackBtnHandleClick Error :', err)
        }
    }
    const formInpHandleKeyUp = (e) => {
        if (e.target.name === 'username') {
            e.target.value = e.target.value.toLowerCase()
        }
        validator()
    }
    const validator = () => {
        try {
            if (document.querySelector('.sign') && signUpOrLogIn === 'signup') {
                if (
                    document.querySelector('.sign #inputName').value !== '' &&
                    document.querySelector('.sign #inputUsername').value !== '' &&
                    isUserNameValid(document.querySelector('.sign #inputUsername').value)
                ) {
                    document.querySelector('.sign .next').removeAttribute('disabled')
                } else document.querySelector('.sign .next').setAttribute('disabled', true)
                if (
                    document.querySelector('.sign .second').style.display === 'block' &&
                    document.querySelector('.sign #inputEmail').value.includes('@') &&
                    document.querySelector('.sign #inputPassword').value !== '' &&
                    document.querySelector('.sign #inputPasswordValidIn').value === document.querySelector('.sign #inputPassword').value
                ) {
                    document.querySelector('.sign #signup-submit').removeAttribute('disabled')
                } else document.querySelector('.sign #signup-submit').setAttribute('disabled', true)
            } else if (document.querySelector('.sign') && signUpOrLogIn === 'login') {
                if (
                    document.querySelector('.sign #login-inputUsername').value !== '' &&
                    document.querySelector('.sign #login-inputPassword').value !== ''
                ) {
                    document.querySelector('.sign #login-btn-submit').removeAttribute('disabled')
                } else document.querySelector('.sign #login-btn-submit').setAttribute('disabled', true)
            }
        } catch (err) {
            console.log('Try in validator Error :', err)
        }
    }
    const viewPassHandleClick = (e) => {
        if (e.target !== document.querySelector('.sign .viewPass')) {
            e.target = e.target.offsetParent
        } else {
        }
        try {
            if (document.querySelector('.sign')) {
                const childernsOfSign = document.querySelectorAll('.sign *')
                childernsOfSign.forEach((children, i) => {
                    if (children === e.target) {
                        if (e.target.classList.length === 2) {
                            childernsOfSign[i - 1].setAttribute('type', 'password')
                        } else childernsOfSign[i - 1].setAttribute('type', 'text')
                    }
                })
                if (e.target.classList.length === 2) {
                    e.target.classList.remove('on')
                } else e.target.classList.add('on')
            }
        } catch (err) {
            console.log('Try in viewPassHandleClick Error :', err)
        }
    }
    return (
        <div className="sign">
            <h1>Selamat datang di <span>React App</span></h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="con-upOrIn">
                    <label htmlFor="up"><input type="radio" name="upOrIn" id="up" onChange={(e) => upOrInInpRadioHandleChange(e)} defaultChecked /><span>Daftar</span></label>
                    <label htmlFor="in"><input type="radio" name="upOrIn" id="in" onChange={(e) => upOrInInpRadioHandleChange(e)} /><span>Masuk</span></label>
                    <div className="bgon" style={{ left: leftNumberBgon }}></div>
                </div>
                <GenerateInp />
            </form>
        </div>
    )
}
export default Sign