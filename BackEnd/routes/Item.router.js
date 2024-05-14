const express = require("express");
const router = express.Router();


const itemRouter= (itemController)=>{
    
    router.get('/:id',async (req,res)=>{
        try{
            const item= await itemController.GetItemById(req.params.id);
            res.status(200).json({success: true, data : item});
        }catch(error){
            res.status(500).json({success : false , message : error.message});
        }
    });
    router.get('/search/:key',async (req,res)=>{
        try{
            const searched= await itemController.search(req.params.key);
            res.status(200).json({success: true, data : searched})
        }catch(error){
            res.status(500).json({success : false , message : error.message});
        }
    })
    return router;
}


module.exports = itemRouter;
