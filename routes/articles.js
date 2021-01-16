const express = require('express')
const router = express.Router()
const Article = require('./../Models/article')

router.get('/new',(req,res) => {
    res.render('articles/new',{article: new Article()})
})

router.get("/:id",(req,res) => {

})

router.post('/',async(req,res) => {
    let article = new Article({
      title: req.body.title  ,
      description: req.body.description,
      markdown: req.body.markdown
    })
    try {
     article = await article.save()
     res.redirect(`/articles/${article.id}`)
    } catch (error) {
      res.render('articles/new',{article})  
    }
    
})
module.exports = router