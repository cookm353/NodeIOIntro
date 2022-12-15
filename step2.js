const fs = require('fs')
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error: ${err}`)
            process.exit(1)
        } else {
            console.log(data)
        }
    })
}

async function webCat(path) {
    try {
        const resp = await axios.get(path)
        console.log(resp.data)
    } catch (err) {
        console.log(`Error retrieving ${path}: ${err}`)
        process.exit(1)
    }
}

const path = process.argv[2]

if (path.includes('http')) {
    webCat(path)
} else {
    cat(path)
}

module.exports = {
    cat: cat,
    webCat: webCat
}