import express, { json } from "express";
import 'dotenv/config';
import path from "path";
import fs from "fs";
function main(){
    try {
        const data=JSON.parse(fs.readFileSync(path.join(process.cwd(), "db", "data.json")));
        const users=JSON.parse(fs.readFileSync(path.join(process.cwd(), "db", "users.json")));
        const app=express();
        app.use(express.json());
      app.use(express.static(path.join(process.cwd(), "src", "public")));
      app.set("view engine", "ejs");
      app.set("views", path.join(process.cwd(), "src", "views"));
      app.post('/users', (req, res)=>{
        console.log(req.body);
      try {
        if(req.body.male&&typeof req.body.male=="boolean"){
          users.push({id:users.at(-1)?.id+1||1, name:req.body.name, male:req.body.male});
          fs.writeFileSync(path.join(process.cwd(), "db", "users.json"), JSON.stringify(users, null, 4));
          console.log(users);
          return res.status(200).json({status:200, users, msg:'successfully addad !'})
        }
        res.status(200).json({status:200, data:req.body, msg:"value is invalid ! (typeof male=='boolean')"})
      } catch (error) {
        console.log(error.message);
      }
      })
      app.get('/', (req, res)=>{
        res.render("index", {data, users})
      });
  
        app.listen(process.env.PORT, process.env.HOST, ()=>console.log('done: '+process.env.PORT));
    } catch (error) {
        console.log(error);
    }
}
main();