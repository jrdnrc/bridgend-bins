'use strict'

const axios = require('axios')
const { JSDOM } = require('jsdom')

const api = process.env.API_URL
const address = JSON.parse(process.env.ADDRESS)

const convertRowToJson = row => {
    return {
        collection: row.children.item(0).querySelector('a.toggle-events').textContent,
        nextService: new Date(row.children.item(3).textContent.slice(-10)),
    }
}

const mapRows = callback => rows => Array.from(rows).map(callback)

const getCollectionDetails = callback => {
    axios.get(api, {params: {aj: true, search_property: address.slice(-1).pop()}})
        .then(res => JSDOM.fragment(res.data.result))
        .then(document => {
            const url = Array.from(document.querySelector('ul').children)
                .map(el => JSDOM.fragment(el.innerHTML))
                .map(item => {
                    return {
                        link: item.querySelector('a').getAttribute('href'),
                        address: item.textContent.split(', '),
                    }
                })
                .filter(set => set.address.slice(-1).pop() === address.slice(-1).pop())
                .filter(set => set.address[0] === address[0])
                .map(set => api.concat(set.link))
                .pop()

            axios.get(url)
                .then(res => (new JSDOM(res.data)).window.document.body)
                .then(body => body.querySelectorAll('tr[class^="service-id-"]'))
                .then(mapRows(convertRowToJson))
                .then(callback)
        })
}

module.exports = { getCollectionDetails }
