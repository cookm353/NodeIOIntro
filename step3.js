const fs = require('fs')
const axios = require('axios')
let outputPath
let inputPath
const inputPaths = []

if (process.argv[2] == '--out') {
    outputPath = process.argv[3]
    inputPath =  process.argv[4]
} else {
    inputPath = process.argv[2]
}

function cat(inputPath) {
    fs.readFile(inputPath, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error: ${err}`)
            process.exit(1)
        } else {
            // Write to a new file
            if (outputPath) {
                writeFile(outputPath, data)
            // Just output to console
            } else {
                console.log(data)
            }
        }
    })
}

async function webCat(inputPath) {
    try {
        const resp = await axios.get(inputPath)
        if (outputPath) {
            writeFile(outputPath, resp.data)
        } else {
            console.log(resp.data)
        }
    } catch (err) {
        console.log(`Error retrieving ${inputPath}: ${err}`)
        process.exit(1)
    }
}

function writeFile(outputPath, data) {
    fs.writeFile(outputPath, data, 'utf8', err => {
        if (err) {
            console.log(`Error: ${err}`)
        } else {
            console.log(`Writing to ${outputPath}...`)
            console.log('Success!')
        }
    })
}


if (inputPath.includes('http')) {
    webCat(inputPath)
} else {
    cat(inputPath)
}