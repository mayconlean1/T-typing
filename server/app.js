const express = require('express')
const app = express()
const translate = require('@vitalets/google-translate-api')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/', async (req,res)=>{
    const data = {
        text : req.body.text,
        from : req.body.from === undefined ? 'en' :  req.body.from,
        to: req.body.to === undefined ? 'pt' :  req.body.to,
    }
    const translated = await translate(data.text, { from: data.from, to: data.to })
    const text = translated.text
    
    return res.send({translated_text: text})
})

module.exports = app