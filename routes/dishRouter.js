const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode= 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will send all dishes to yaa !');
})
.post((req,res,next)=>{
    res.end('will add to dish: '+ req.body.name + 'with details: '+ req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req,res,next)=>{
    res.end('Delete all the dishes!');
});

dishRouter.route('/:dishID')
.get((req,res,next)=>{
    res.end('I will send details of the dish'+req.params.dishID)
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/:'+req.params.dishID);
})
.put((req,res,next)=>{
    res.write('updating the dish '+req.params.dishID + '\n');
    res.end('will update the dish: '+ req.body.name + ' with details: '+req.body.description);
})
.delete((req,res,next)=>{
    res.end('Delete the dish: '+ req.params.dishID);
});

module.exports = dishRouter;