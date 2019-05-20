/* eslint-disable no-console */
/* jshint esversion:8 */
const rout = require("koa-router");

const router = new rout();

//
router.get('/:id',(ctx,next)=>{
    console.log(ctx.params);
    ctx.body = ctx.params;
    next();
});
//
router.post('/:id',(ctx,next)=>{
    console.log(ctx.params);
    console.dir(ctx.request);
    //ctx.body = ctx.query;
    next();

});

module.exports = router;