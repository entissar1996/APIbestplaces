const router=require('express').Router();
 const postService= require('../posts/post.service')();
 var multer  = require('multer');
 const Post=require ('../posts/Post');
 const User=require ('../../auth/user-schema');
 var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });


 router.post('/',upload.array('img', 12),async function(req, res, next){
 // let {...post} = req.body


  var array1 = [""];
  var j=0;
  for(var i=0;i< req.files.length;i++){
    //for(var j=0;j< req.files.length;j++){
     array1[j]=req.files[i].path;
    j++;

  }
  const post=new Post({
    body:req.body.body,
    user:req.body.user,
    likes:req.body.likes,
    img:array1

  })
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
