const express = require("express")
const path =require("path");
const app = express();
require("./db/conn")
const Register =require("./models/register");

const static_path = path.join(__dirname,"../public");

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path))
app.set("view engine","hbs");


app.get("/",(req, res)=>{    
    res.render("index");
})


// app.post("/register",(req, res)=>{    
//     res.render("register");
// })

app.post("/index",async(req,res)=>{
    try{
        // console.log(req.body.firstname);
        // res.send(req.body.firstname);
        const studentsdata = new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            phone:req.body.phone,
            age:req.body.age,
            email:req.body.email,
            password:req.body.password
        })

        const data = await studentsdata.save();
        res.status(201).render("index"); 
    }catch(error){
        res.status(400).send(error)
    }
})

app.listen(3000,()=>{
    console.log("listning your port number 3000")
});
