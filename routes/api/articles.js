const express = require('express');
const router = express.Router();
const Article = require('../../models/article.js')

//functionality of app
//1. get all saved article "/"
//2. post article "/"
//3. delete by id saved article "/:id"


//1.
router.get("/",(req,res)=>{
    Article.find().sort({date:-1})
    .then(article => res.json(article))
});

//2.
router.post("/",(req,res)=>{
    const newArticle = new Article({
        title:req.body.title,
        data:req.body.date,
        url:req.body.url
    })
    newArticle.save()
    .then(article=>res.json(article))
});

//3
router.delete("/:id",(req,res)=>{
    Article.findById(req.params.id)
    .then(article => {
        article.remove()
        .then(()=>res.json({success:true}))
    })
    .catch(err=> res.status(404).json({sucess:false}))
})

module.exports = router;