const express = require("express");
const router = express.Router();

const middlewaresChain = (req,res) => {
    let middlewaresChain = [];
    for(let i=0;i<req.body.middlewares.length;i++) {
        let current = require(`./${req.body.middlewares[i]}`);
        let next = i<req.body.middlewares.length-1 ? require(`./${req.body.middlewares[i+1]}`):null;
        middlewaresChain.push(current(req,res,next));
    }
    return middlewaresChain;
};

const executeMiddlewaresChain = (req,res,chain) => {
    for(let mw of chain) {
        mw(req,res);
    }
};

router.post("/api/registerRoute", (req, res) => {
    //console.log("register route");
    // req is JSON in form:
    // {"method":"POST/PUT/GET",routePath:"api/routePathGoesHere","middlewares":["middleware1","middleware2","middleware3"]}
    try {
        const chain = middlewaresChain(req,res);
        switch (req.body.method) {
            case "POST":
                console.log("registering POST route");
                router.post(req.body.routePath, (req,res)=>{
                    
                    executeMiddlewaresChain(req,res,chain);
                    res.send("finished executing middlewares");
                });
                break;
            case "GET":
                console.log("registering GET route");
                router.get(req.body.routePath, (req,res)=>{
                    executeMiddlewaresChain(req,res,chain);
                    res.send("finished executing middlewares");
                });
                break;
            case "PUT":
                console.log("registering PUT route");
                router.put(req.body.routePath, (req,res)=>{
                    
                    executeMiddlewaresChain(req,res,chain);
                    res.send("finished executing middlewares");
                });
                break;
            default:
                throw Error(`method ${req.body.method} is not supported`);
        }
        res.status(200).json({
            success: false,
            message: `registered ${req.body.method} ${req.body.routePath} with ${middlewaresChain.length} middleware(s)`
        })
    }
    catch (e) {
        res.status(500).json({
            success: false,
            error: e.message,
        });
    }
});

module.exports = router;
