const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path');


const host = '127.0.0.1'
const port = 7000

const tempPage = fs.readFileSync(`${__dirname}/public/index.html`, 'utf-8') 

const tempCard = fs.readFileSync(`${__dirname}/public/card-temp.html`, 'utf-8') 

const data = fs.readFileSync(`${__dirname}/public/products.json`, 'utf-8') 

const dataObj = JSON.parse(data) 


const replaceTemplate = ((temp, product) => {
    let output = temp.replace(/{%TITLE%}/g, product.title)
    output = output.replace(/{%PRODUCTID%}/g, product.productId)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    output = output.replace(/{%CODE%}/g, product.code)
    output = output.replace(/{%PRIMARYIMAGEURL%}/g, product.primaryImageUrl)
    output = output.replace(/{%ASSOCPRODUCTS%}/g, product.assocProducts)
    output = output.replace(/{%WEIGHT%}/g, product.weight)
    output = output.replace(/{%UNIT%}/g, product.unit)
    output = output.replace(/{%UNITFULL%}/g, product.unitFull)
    output = output.replace(/{%UNITRATIO%}/g, product.unitRatio)
    output = output.replace(/{%UNITALT%}/g, product.unitAlt)
    output = output.replace(/{%UNITRATIOALT%}/g, product.unitRatioAlt)
    output = output.replace(/{%UNITFULLALT%}/g, product.unitFullAlt)
    output = output.replace(/{%PRICERETAIL%}/g, product.priceRetail)
    output = output.replace(/{%PRICEGOLD%}/g, product.priceGold)
    output = output.replace(/{%PRICEGOLDALT%}/g, product.priceGoldAlt)
    output = output.replace(/{%PRICERETAILALT%}/g, product.priceRetailAlt)
    output = output.replace(/{%BONUSAMOUNT%}/g, product.bonusAmount)
    output = output.replace(/{%HASALTERNATEUNIT%}/g, product.hasAlternateUnit)
    output = output.replace(/{%ISACTIVE%}/g, product.isActive)
    output = output.replace(/{%MODIFIED%}/g, product.modified)
    return output
})


const public = path.join(__dirname, 'public');



app.get('/', function(req, res) {
    res.writeHead(200, {
        'Content-type': 'text/html '
    })
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("")
    const output = tempPage.replace('{%CARDS%}', cardsHtml)

     res.sendFile(path.join(public, output)) 
     res.end(output) 
});

app.use('/', express.static(public));

app.listen(port, host, function () {
    console.log(`Сервер:  http://${host}:${port}`)
})