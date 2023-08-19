const express=require('express');
const body_parser=require('body-parser');
const file=require("./app/routes/file.js");
const cors = require("cors")
const App=express();
global.nodeSiteUrl = 'http://localhost:1300'

App.use(cors())
// App.use(body_parser. text({type: '/'}));
App.use(body_parser.json());    
App.use(body_parser.urlencoded({extended:true}));

App.get('/',(req,res)=>{
    res.send({message:"Heyy there I am Making Task Management System"})
})

require("./app/routes/users.js")(App);
require("./app/routes/project.js")(App);
require("./app/routes/task.js")(App);
require("./app/routes/form.js")(App);

// require("./app/routes/customers.js")(App);
// require("./app/routes/billbook.js")(App);


App.use("/file",file);
const port=process.env.port ||1300;
App.listen(port,()=>{
    console.log(`you are running on ${port}.`)
})

