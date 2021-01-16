const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const Schema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        
    },
    markdown: {
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    protectedHtml:{
        type:String,
        required: true
    }
})

Schema.pre('validate',function(next){
    if(this.title){
        this.slug = slugify(this.title,{lower: true,strict:true})
    }
    if(this.markdown){
        this.protectedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next()
})

module.exports = mongoose.model('Article',Schema)