/* eslint-disable no-console */
/*jshint esversion:8 */
const koa = require('koa');
const err = require('koa-error');
const koa_static = require('koa-static');
const path = require('path');
const router = require('./route/index');
const body_parser = require('koa-body');

const app = new koa();
//koa-body
app.use(body_parser({multipart:true,
                     formidable:{
                        maxFieldsSize:12*1024*1024,
                        uploadDir:'./Temp_upload',
                        onFileBegin:rename_tempfile
                    }}));
//koa-router
app.use(router.routes()).use(router.allowedMethods());
//koa-static
app.use(koa_static(path.join(__dirname,"../dist")));
app.use(err());
app.listen(3000);

//修改upload file name，
function rename_tempfile(){

}