const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
const leader = require('../models/leaders');

leaderRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>{
    leader.find({})
    .then((lead)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(lead);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    leader.create(req.body)
    .then((lead)=>{
        console.log('leader added to database',lead)
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(lead);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end("Sorry this operation is not allowed on leaders");
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    leader.remove({})
    .then((resp)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));  
});

leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>{
    leader.findById(req.params.leaderId)
    .then((lead)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(lead);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation is not supported on /leaders/:'+req.params.leaderId);
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    leader.findByIdAndUpdate(req.params.leaderId,{$set:req.body},{new:true})
    then((lead)=>{
        res.status.code=200;
        res.setHeader('Content-Type','application/json');
        res.json(lead);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    leader.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.status.Code=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


module.exports = leaderRouter;