const router=require('express').Router();
 const commentService= require('../comments/comments.service')();
 var multer  = require('multer');
 const Comments=require ('../comments/Comments');

 router.post('/',async function(req, res, next){
  let {...post} = req.body
    let response = await commentService.addComment(post);
    res.json(response);
})


 router.get('/',async function(req,res,next){
    let result=await commentService.getAllComments();
    res.json(result);
 })

 router.post('/addUser/:id',async function(req,res){
   let id = req.params.id;

    let result = await commentService.addUserComment(id,req.body);
    res.json(result);
 })


 router.get('/:id', async function(req,res)
 {
   let id=req.params.id;
   let response = await commentService.getOneComment(id);
   res.json(response);

 })

 router.put('/:id', async function(req,res)
 {
  let id = req.params.id;
  let {...comment} = req.body
  let response = await commentService.updateComment(id,comment);
   res.json(response);


 })
 router.delete('/:id', async function(req,res)
 {
   let id=req.params.id;
   let response = await commentService.DeleteComment(id);
   res.json(response);

 })

 module.exports=router;
