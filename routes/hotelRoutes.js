import express from 'express';
const router = express.Router();
import {Hotel} from '../models/index.js';


//Add Hotel
router.post('/add',(req,res)=>{
    let newPost = new  Hotel(req.body);
    newPost.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            
            success: "Add hotel details Successfully"
        });
    });
});

//Read Hotel

router.get('/read',(req,res)=>{
    Hotel.find().exec((err,HotelReq)=>{
        if(err){
            return res.status(400).json({
                error:err
            });

        }
        return res.status(200).json({
            success:true,
            existingPosts:HotelReq
        });
    });
});

//Update Products
router.put('/update/:id',(req,res)=>{
    Hotel.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err,updatePrp)=>{
            
                if(err){
                    return res.status(400).json({error:err});
                }
                return res.status(200).json({
                    success:"Updated Hotel"
                });
            }
        
    );
});


//Delete Hotel
router.delete('/delete/:id',(req,res)=>{
    Hotel.findByIdAndRemove(req.params.id).exec((err,deleteHotel)=>{
        if(err) return res.status(400).json({
            message:"Deleted Unsuccess",err
        });
        return res.json({
            message:"Delete success",deleteHotel
        });
    });
});

//One Hotel
router.route("/get/:id").get(async(req,res)=>{
    let hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId)
    .then((hotel)=>{
        res.status(200).send({status: "Hotel fetched", hotel})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get tour package", error: err.message});
    })
})

export default router;