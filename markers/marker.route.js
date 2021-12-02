const router=require('express').Router();
const markerService= require('../markers/marker.service')();

router.get('/',async function(req,res){
    let result=await markerService.getAllMarkers();
    res.json(result);
 })

 router.post('/',async function(req,res){
   
     let result = await markerService.addMarker(req.body);
     res.json(result);
 })
 

 router.get('/:id', async function(req,res)
 {
   let response = await markerService.getOneMarker(req.params.id);
   res.json(response);

 })

 router.put('/:id', async function(req,res)
 { 
  let response = await markerService.updateMarker(req.params.id,req.body);
   res.json(response);

 })
 router.delete('/:id', async function(req,res)
 {
   let response = await markerService.DeleteMarker(req.params.id);
   res.json(response);

 })

 module.exports=router;   