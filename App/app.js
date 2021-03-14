const items = document.getElementById('items')
const templateItems = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
let buy = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

items.addEventListener('click', e => {
    addBuy(e)
})

const fetchData = async() => {
    try {
        const res = await fetch('../Api/api.json')
        const data = await res.json()
        console.log(data)
        renderItems(data)
    } catch (error) {
        console.log(error)
    }
}

const renderItems = data => {
    data.forEach(producto => {
        templateItems.querySelector('h5').textContent = producto.title
        templateItems.querySelector('p').textContent = producto.precio
        templateItems.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        templateItems.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateItems.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}

const addBuy = e => {
    if(e.target.classList.contains('btn-dark')) {
        setBuy(e.target.parentElement)
    }
    e.stopPropagation()
}

const setBuy = object => {
    const product = {
        id: object.querySelector('.btn-dark').dataset.id,
        title: object.querySelector('h5').textContent,
        price: object.querySelector('p').textContent
    }
    buy.appendChild(product)
}
