"use strict";

const serve = require('koa-static');
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('mz/fs');
const path = require('path');


const app = new Koa();
const config = require("../config/main.json");
let router = new Router();

// router
router
    .get('/', async (ctx, next) => {
        ctx.body = await fs.readFile(path.join(__dirname, "..", "views/main.html"), "utf-8");
    })
    .get('/about', async (ctx, next) => {
        ctx.body = await fs.readFile(path.join(__dirname, "..", "views/about.html"), "utf-8");
    })
    .get('/contacts', async (ctx, next) => {
        ctx.body = await fs.readFile(path.join(__dirname, "..", "views/contacts.html"), "utf-8");
    })
    .get('/donation', async (ctx, next) => {
        ctx.body = await fs.readFile(path.join(__dirname, "..", "views/donation.html"), "utf-8");
    });


let counter = 0;
// apply all the middlewares
app
    // logger
    .use(async (ctx, next) => {
        const start = new Date;
        await next();
        const ms = new Date - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms} ms`);
        counter++;
        if(counter % 100 === 0){
            console.log(`${counter} requests since last shutdown`)
        }
    })
    // serve public files
    .use(serve('./public/'))
    // routes
    .use(router.routes())
    .use(router.allowedMethods());

//start server
app.listen(config.server.port);

console.log(`listening on port ${config.server.port}`);