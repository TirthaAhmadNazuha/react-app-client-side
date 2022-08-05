import React from "react"
// import FunLocalStorage from "../function/localstorage"

const Home = () => {
    // const openLocalStorage = () => {
    //     const dataInLS = FunLocalStorage.get('kamu')
    //     if (dataInLS.readySetImgProfile) {

    //     }
    // }
    // const ifReadySetImgProfileComponent = () => {
    //     return (
    //         <div className="set-img-profile">
    //             <input type="file" name="img" id="avatarImg" />
    //             <canvas></canvas>
    //         </div>
    //     )
    // }
    const InputImgHandleChange = (e) => {
        const img = e.target.files[0]
        try {
            if (document.querySelector('.home-page')) {
                const eleImg = document.createElement('img')
                eleImg.src = URL.createObjectURL(img)
                eleImg.style.width = '100%'
                eleImg.alt = 'Gambar gak tampil'
                eleImg.classList.add('imgAvatarTag')
                document.querySelector('.home-page').append(eleImg)
                const imgTag = document.querySelector('.imgAvatarTag')

                const canvas = document.getElementById('myCanvas')
                canvas.width = imgTag.offsetWidth
                canvas.setAttribute('height', imgTag.offsetHeight)
                const c = canvas.getContext('2d')
                class CropImg {
                    constructor() {
                        this.width = 0
                        this.height = 0
                        this.position = { x: 0, y: 0 }
                    }
                    draw() {
                        c.drawImage(imgTag, this.position.x, this.position.y)
                        c.fillRect(this.position.x, this.position.y, this.width, this.height)
                    }
                }
                const cropImg = new CropImg()
                cropImg.draw()
                const DisplayCanvasImg = () => {
                    requestAnimationFrame(DisplayCanvasImg)
                    c.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
                    cropImg.draw()
                }
                DisplayCanvasImg()
            }
        } catch (err) {
            console.error('Try in InputImgHandleChange Error ', err)
        }
    }
    return (
        <div className="home-page">
            <h1>Selamat datang</h1>
            <input type="file" name="img" id="inputImg" onChange={(e) => InputImgHandleChange(e)} />
            <canvas id="myCanvas" width="400px" height="400px"></canvas>
        </div>
    )
}
export default Home