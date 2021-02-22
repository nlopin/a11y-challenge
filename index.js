const SELECTOR = {
    openLoginModalButton: '.login',
    overlay: '#overlay',
    loginModal: '#dialog',
    closeLoginModalButton: '.dialog__button-close'
}

const CLASS = {
    hidden: 'hidden'
}

const key = {
    ESC: 'Escape'
}

const openLoginModalButton = document.querySelector(SELECTOR.openLoginModalButton)
const closeLoginModalButton = document.querySelector(SELECTOR.closeLoginModalButton)
const overlay = document.querySelector(SELECTOR.overlay)
const dialogWindow = document.querySelector(SELECTOR.loginModal)
openLoginModalButton.addEventListener('click', () => {
    [overlay, dialogWindow].forEach(el => el.classList.remove(CLASS.hidden))
    dialogWindow.focus()
})
closeLoginModalButton.addEventListener('click', () => {
    [overlay, dialogWindow].forEach(el => el.classList.add(CLASS.hidden))
    openLoginModalButton.focus()
})

window.addEventListener('keyup', ({ code }) => {
    switch (code) {
        case key.ESC: {
            if (!overlay.classList.contains(CLASS.hidden)) {
                [overlay, dialogWindow].forEach(el => el.classList.add(CLASS.hidden))
                openLoginModalButton.focus()
            }
        }
    }
})