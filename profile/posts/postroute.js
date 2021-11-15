const router=require('express').Router();
 const postService= require('../posts/post.service')();
 var multer  = require('multer');
 const Post=require ('../posts/Post');

 router.post('/',async function(req, res, next){
  let {...post} = req.body
    let response = await postService.addPost(post);
    res.json(response);
})


 router.get('/',async function(req,res,next){
    let result=await postService.getAllPosts();
    res.json(result);
 })

 router.post('/addUser/:id',async function(req,res){
   let id = req.params.id;

    let result = await postService.addUserPost(id,req.body);
    res.json(result);
 })


 router.get('/:id', async function(req,res)
 {
   let id=req.params.id;
   let response = await postService.getOnePost(id);
   res.json(response);

 })

 router.put('/:id', async function(req,res)
 {
  let id = req.params.id;
  let {...post} = req.body
  let response = await postService.updatePost(id,post);
   res.json(response);


 })
 router.delete('/:id', async function(req,res)
 {
   let id=req.params.id;
   let response = await postService.DeletePost(id);
   res.json(response);

 })

 module.exports=router;
