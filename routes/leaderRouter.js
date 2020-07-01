const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('i will send all leaders to ya <3');
})
.post((req,res,next)=>{
    res.end('I will add one leader: '+req.body.name+' with details : '+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end("Sorry this operation is not allowed on leaders");
})
.delete((req,res,next)=>{
    res.end("we are going to delete all the leaders");
});

leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    res.end('We are going to send the leader n : '+ req.params.leaderId);
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation is not supported on /leaders/:'+req.params.leaderId);
})
.put((req,res,next)=>{
    res.write('updating the leader '+req.params.leaderId + '\n');
    res.end('will update the leader: '+ req.body.name + ' with details: '+req.body.description);
})
.delete((req,res,next)=>{
    res.end('Delete the leader: '+ req.params.leaderId);
});


module.exports = leaderRouter;