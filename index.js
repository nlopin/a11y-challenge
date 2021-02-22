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
    tabActive: 'museum__tab__active',
    filterActive: 'exhibitions__filter__active',
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

const exhibitionFilters = Array.from(document.querySelectorAll('.exhibitions__filter'))
const exhibitionItems = Array.from(document.querySelectorAll('.exhibition__item'))

const museumTabs = Array.from(document.querySelectorAll('.museum__tab'))
const museumTabpanels = Array.from(document.querySelectorAll('.museum__tabpanel'))

openLoginModalButton.addEventListener('click', () => {
    [overlay, dialogWindow].forEach(el => el.classList.remove(CLASS.hidden))
    closeLoginModalButton.focus()
})
closeLoginModalButton.addEventListener('click', () => {
    [overlay, dialogWindow].forEach(el => el.classList.add(CLASS.hidden))
    openLoginModalButton.focus()
})

museumTabs.forEach(tab => tab.addEventListener('click', (e) => {
    e.preventDefault()
    activateTab(e.target)
}))

exhibitionFilters.forEach(filter => filter.addEventListener('click', (e) => {
    e.preventDefault()
    activateFilter(e.target)
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
            const tabIndex = museumTabs.indexOf(document.activeElement)
            if (tabIndex !== -1) {
                const nextIndex = tabIndex === 0 ? museumTabs.length - 1 : tabIndex - 1
                focusNextItem(museumTabs, nextIndex)
                break
            }

            const filterIndex = exhibitionFilters.indexOf(document.activeElement)
            if (filterIndex !== -1) {
                const nextIndex = filterIndex === 0 ? focusNextItem().length - 1 : filterIndex - 1
                focusNextItem(exhibitionFilters, nextIndex)
                break
            }

            break
        }
        case key.RIGHT: {
            const tabIndex = museumTabs.indexOf(document.activeElement)
            if (tabIndex !== -1) {
                const nextIndex = tabIndex === museumTabs.length - 1 ? 0 : tabIndex + 1
                focusNextItem(museumTabs, nextIndex)
                break
            }

            const filterIndex = exhibitionFilters.indexOf(document.activeElement)
            if (filterIndex !== -1) {
                const nextIndex = filterIndex === exhibitionFilters.length - 1 ? 0 : filterIndex + 1
                focusNextItem(exhibitionFilters, nextIndex)
                break
            }

            break
        }
        case key.HOME: {
            const tabIndex = museumTabs.indexOf(document.activeElement)
            if (tabIndex > 0) {
                focusNextItem(museumTabs, 0)
                break
            }

            const filterIndex = exhibitionFilters.indexOf(document.activeElement)
            if (filterIndex > 0) {
                focusNextItem(exhibitionFilters, 0)
                break
            }

            break
        }
        case key.END: {
            const tabIndex = museumTabs.indexOf(document.activeElement)
            if (tabIndex >= 0) {
                focusNextItem(museumTabs, museumTabs.length - 1)
                break
            }

            const filterIndex = exhibitionFilters.indexOf(document.activeElement)
            if (filterIndex >= 0) {
                focusNextItem(exhibitionFilters, exhibitionFilters.length - 1)
                break
            }
            break
        }
        case key.SPACE:
        case key.ENTER: {
            const tabIndex = museumTabs.indexOf(document.activeElement)
            if (tabIndex !== -1) {
                activateTab(museumTabs[tabIndex])
                break
            }

            const filterIndex = exhibitionFilters.indexOf(document.activeElement)
            if (filterIndex !== -1) {
                activateFilter(exhibitionFilters[filterIndex])
                break
            }

            break
        }
    }
})

function focusNextItem(items, index) {
    items.forEach(item => {
        item.setAttribute('tabindex', '-1')
    })
    items[index].setAttribute('tabindex', '0')
    items[index].focus()
}

function activateTab(tab) {
    const controlledPanelId = tab.getAttribute('aria-controls')
    const panelToActivate = document.getElementById(controlledPanelId)

    museumTabs.forEach(tab => {
        tab.classList.remove(CLASS.tabActive)
        tab.setAttribute('aria-selected', 'false')
    })
    museumTabpanels.forEach(panel => panel.classList.remove(CLASS.tabpanelActive))

    tab.classList.add(CLASS.tabActive)
    tab.setAttribute('aria-selected', 'true')
    panelToActivate.classList.add(CLASS.tabpanelActive)
}

function activateFilter(filter) {
    exhibitionFilters.forEach(tab => {
        tab.classList.remove(CLASS.filterActive)
        tab.setAttribute('aria-selected', 'false')
    })
    exhibitionItems.forEach(item => {
        const filterBy = filter.dataset.tag
        const tags = item.dataset.tags.split(',')
        if (filterBy === 'all' || tags.includes(filterBy)) {
            item.classList.remove(CLASS.hidden)
        } else {
            item.classList.add(CLASS.hidden)
        }
    })

    filter.classList.add(CLASS.filterActive)
    filter.setAttribute('aria-selected', 'true')
}