const express = require('express')
const mongoose = require("mongoose")
const app = express()
const articleRouter = require('./routes/articles')

mongoose.connect("mongodb://localhost/blog",{ useNewUrlParser: true,useUnifiedTopology: true })

app.set('view engine','ejs')


app.use(express.urlencoded({extended:false}))

app.get('/',(req,res) => {
    const articles = [{
        title: 'test article',
        createdAt: new Date(),
        description: "test description"
    },
    {
        title: 'test article',
        createdAt: new Date(),
        description: "test description"
    }
    ]
    res.render('articles/index',{articles})
})
app.use('/articles',articleRouter)

app.listen(5000)