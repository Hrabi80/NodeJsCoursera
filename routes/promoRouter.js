const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const promo = require('../models/promotions');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next)=>{
    promo.find({})
    .then((pro)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(pro);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
    promo.create(req.body)
    .then((pro)=>{
        console.log('promotion added',pro);
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(pro)
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end("Sorry this operation is not allowed on promotions");
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    promo.remove({})
    .then((resp)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

promoRouter.route('/:promoId')
.get((req,res,next)=>{
   promo.findById(req.params.promoId)
   .then((pro)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(pro);
   },(err)=>next(err))
   .catch((err)=>next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation is not supported on /promotions/:'+req.params.promoId);
})
.put(authenticate.verifyUser,(req,res,next)=>{
    promo.findByIdAndUpdate(req.params.promoId,{$set: req.body},{new:true})
    .then((pro)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(pro);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    promo.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        if(res!=null){
            res.status.code=200;
            res.setHeader('Content-Type','application/json');
            res.json(json);
        }
        else{
            err = new Error('The promotion N°: '+req.param.promoId+' not found');
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = promoRouter;