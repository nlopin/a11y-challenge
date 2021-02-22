const SELECTOR = {
    openLoginModalButton: '.login',
    overlay: '#overlay',
    loginModal: '#dialog',
    closeLoginModalButton: '.dialog__button-close',
    submitLoginButton: '.dialog__form-button'
}

const CLASS = {
    hidden: 'hidden',
    tabpanelActive: 'museum__tabpanel__active',
    tabActive: 'museum__tab__active'
}

const key = {
    ESC: 'Escape',
    TAB: 'Tab',
    SPACE: 'Space',
    ENTER: 'Enter',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
}

const openLoginModalButton = document.querySelector(SELECTOR.openLoginModalButton)
const closeLoginModalButton = document.querySelector(SELECTOR.closeLoginModalButton)
const overlay = document.querySelector(SELECTOR.overlay)
const dialogWindow = document.querySelector(SELECTOR.loginModal)
const submitLoginButton = document.querySelector(SELECTOR.submitLoginButton)

const tabs = Array.from(document.querySelectorAll('.museum__tab'))
const tabpanels = Array.from(document.querySelectorAll('.museum__tabpanel'))

openLoginModalButton.addEventListener('click', () => {
    [overlay, dialogWindow].forEach(el => el.classList.remove(CLASS.hidden))
    closeLoginModalButton.focus()
})
closeLoginModalButton.addEventListener('click', () => {
    [overlay, dialogWindow].forEach(el => el.classList.add(CLASS.hidden))
    openLoginModalButton.focus()
})

tabs.forEach(tab => tab.addEventListener('click', (e) => {
    e.preventDefault()
    const controlledPanelId = e.target.getAttribute('aria-controls')
    const panelToActivate = document.getElementById(controlledPanelId)

    tabpanels.forEach(panel => panel.classList.remove(CLASS.tabpanelActive))
    panelToActivate.classList.add(CLASS.tabpanelActive)
}))

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
            break
        }
        case key.LEFT: {
            const tabIndex = tabs.indexOf(document.activeElement)
            if (tabIndex !== -1) {
                const nextIndex = tabIndex === 0 ? tabs.length - 1 : tabIndex - 1
                activate(tabs, nextIndex, CLASS)
            }
            break
        }
        case key.RIGHT: {
            const tabIndex = tabs.indexOf(document.activeElement)
            if (tabIndex !== -1) {
                const nextIndex = tabIndex === tabs.length - 1 ? 0 : tabIndex + 1
                activate(tabs, nextIndex, CLASS)
            }
            break
        }
        case key.HOME: {
            //TODO check the key name
            const tabIndex = tabs.indexOf(document.activeElement)
            if (tabIndex > 0) {
                activate(tabs, 0, CLASS)
            }
            break
        }
        case key.END: {
            //TODO check the key name
            const tabIndex = tabs.indexOf(document.activeElement)
            if (tabIndex >= 0) {
                activate(tabs, tabs.length - 1, CLASS)
            }
            break
        }
        case key.SPACE:
        case key.ENTER: {
            const tabIndex = tabs.indexOf(document.activeElement)
            if (tabIndex !== -1) {
                const tab = tabs[tabIndex]
                const controlledPanelId = tab.getAttribute('aria-controls')
                const panelToActivate = document.getElementById(controlledPanelId)

                tabs.forEach(tab => tab.classList.remove(CLASS.tabActive))
                tabpanels.forEach(panel => panel.classList.remove(CLASS.tabpanelActive))

                tab.classList.add(CLASS.tabActive)
                panelToActivate.classList.add(CLASS.tabpanelActive)
            }
            break
        }
    }
})

function activate(items, index) {
    items.forEach(item => {
        item.setAttribute('tabindex', '-1')
    })
    items[index].setAttribute('tabindex', '0')
    items[index].focus()
}