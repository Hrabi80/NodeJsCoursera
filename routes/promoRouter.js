const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('i will send all promotions to ya ');
})
.post((req,res,next)=>{
    res.end('I will add to promotions: '+req.body.name+' with description : '+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end("Sorry this operation is not allowed on promotions");
})
.delete((req,res,next)=>{
    res.end("we are going to delete all the promotions");
});

promoRouter.route('/:promoId')
.get((req,res,next)=>{
    res.end('We are going to send the promotion n : '+ req.params.promoId);
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation is not supported on /promotions/:'+req.params.promoId);
})
.put((req,res,next)=>{
    res.write('updating the promotion '+req.params.promoId + '\n');
    res.end('will update the promotion: '+ req.body.name + ' with details: '+req.body.description);
})
.delete((req,res,next)=>{
    res.end('Delete the promotion: '+ req.params.promoId);
});

module.exports = promoRouter;