const FunLocalStorage = {
    get: (key) => {
        try {
            if (window.localStorage) {
                window.localStorage.getItem(key)
            } else {
                console.log('window.localStorage is is Error')
            }
        } catch (err) {
            console.log('FunLocalStorage.get is Error :', err)
        }
    },
    set: (key, value) => {
        try {
            if (window.localStorage) {
                window.localStorage.setItem(key, value)
            } else {
                console.log('window.localStorage is is Error')
            }
        } catch (err) {
            console.log('FunLocalStorage.set is Error :', err)
        }
    },
    length: () => {
        try {
            if (window.localStorage) {
                return window.localStorage.length
            } else {
                console.log('window.localStorage is is Error')
            }
        } catch (err) {
            console.log('FunLocalStorage.set is Error :', err)
        }
    }
}
export default FunLocalStorage