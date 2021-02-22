const SELECTOR = {
    openLoginModalButton: '.login',
    overlay: '#overlay',
    loginModal: '#dialog',
    closeLoginModalButton: '.dialog__button-close',
    submitLoginButton: '.dialog__form-button'
}

const CLASS = {
    hidden: 'hidden'
}

const key = {
    ESC: 'Escape',
    TAB: 'Tab',
}

const openLoginModalButton = document.querySelector(SELECTOR.openLoginModalButton)
const closeLoginModalButton = document.querySelector(SELECTOR.closeLoginModalButton)
const overlay = document.querySelector(SELECTOR.overlay)
const dialogWindow = document.querySelector(SELECTOR.loginModal)
const submitLoginButton = document.querySelector(SELECTOR.submitLoginButton)

openLoginModalButton.addEventListener('click', () => {
    [overlay, dialogWindow].forEach(el => el.classList.remove(CLASS.hidden))
    dialogWindow.focus()
})
closeLoginModalButton.addEventListener('click', () => {
    [overlay, dialogWindow].forEach(el => el.classList.add(CLASS.hidden))
    openLoginModalButton.focus()
})

window.addEventListener('keydown', (e) => {
    const { code, shiftKey } = e
    switch (code) {
        case key.ESC: {
            if (!overlay.classList.contains(CLASS.hidden)) {
                [overlay, dialogWindow].forEach(el => el.classList.add(CLASS.hidden))
                openLoginModalButton.focus()
            }
            break;
        }
        case key.TAB: {
            if (shiftKey && document.activeElement === closeLoginModalButton) {
                e.preventDefault()
                submitLoginButton.focus()
            } else if (!shiftKey && document.activeElement === submitLoginButton) {
                e.preventDefault()
                closeLoginModalButton.focus()
            }
            break;
        }
    }
})