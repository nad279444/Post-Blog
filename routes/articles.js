const express = require('express')
const router = express.Router()
const Article = require('./../Models/article')

router.get('/new',(req,res) => {
  res.render('articles/new',{article: new Article()})
})

router.get('/edit/:id',async (req,res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit',{article: article})
})

router.get("/:slug",async(req,res) => {
    const article = await Article.findOne({slug:req.params.slug})
    if(article == null) res.redirect('/')
    res.render('articles/show',{article})
})

router.post('/',async(req,res) => {
    let article = new Article({
      title: req.body.title  ,
      description: req.body.description,
      markdown: req.body.markdown
    })
    try {
     article = await article.save()
     res.redirect(`/articles/${article.slug}`)
    } catch (error) {
      res.render('articles/new',{article})  
    }
    
})

router.post('/', async(req,res,next) => {
  req.article = await Article()
  next()
},saveArticle('new'))


router.put("/:id",async (req,res,next) => {
  req.article = await Article.findById(req.params.id)
  next()
},saveArticle('edit'))



router.delete("/:id", async(req,res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})
function saveArticle (path){
  return async(req,res) => {
    let article = req.article
      article.title = req.body.title  
      article.description= req.body.description
      article.markdown = req.body.markdown
    try {
     article = await article.save()
     res.redirect(`/articles/${article.slug}`)
    } catch (error) {
      res.render(`articles/${path}`,{article})  
    }
  }
}
module.exports = router