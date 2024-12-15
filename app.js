const express = require("express");
const app = express();


let methodOverride = require('method-override');
app.use(methodOverride('_method'));
const port = 8080;

const path = require("path");

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const { v4: uuidv4 } = require('uuid');
app.listen(port, () => {
    console.log(`start listing at port 8080`);

});
app.get("/", (req, res) => {
    res.send("welcome to home page ");
});
let posts = [
    {
        username: "Mohsin",
        id:uuidv4(),
        content: "I Love Coding "
    },
    {
        username: "usman",
        id:uuidv4(),
        content: "I Love Coding "
    },
    {
        username: "umar",
        id:uuidv4(),
        content: "I Love Coding "
    },
    {
        username: "abu baker",
        id:uuidv4(),
        content: "I Love Coding "
    },
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res) =>{
    res.render("new.ejs")
})
app.post("/posts" ,(req,res) =>{
    let {username,content}=req.body;
    let id=uuidv4();

    posts.push({username,id,content});
    // res.send("working!");
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res) =>{
    

    let {id}=req.params;
    // console.log(id);
    let post = posts.find((p)=> id === p.id);
    // console.log(post);
    
    res.render("show.ejs",{ post });

})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");

    

    // console.log(newcontent);
    // console.log(id);
    // res.send("patch request ");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post})



})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts = posts.filter((p)=> id !== p.id);


    res.redirect("/posts");




})