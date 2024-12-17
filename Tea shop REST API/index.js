import express from "express";

const app = express();
const port = 3000;

app.use(express.json());


//sample routing
app.get("/", (req, res) => {
  console.log(`the browser is sending you a get request on HOME`);
  res.send(`The server is watching u in HOME page`);
});

let teas = [];
let nextId = 1;


//add teas
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const userTea = { id: nextId++, name, price };
  teas.push(userTea);
  res.status(201).send(userTea);
});


//get tea
app.get('/teas/:id',(req,res)=>{
  const tea = teas.find(t=>t.id === parseInt(req.params.id))
  if(!tea){
    return res.send(`server : 404 (server not found) :the id was not found`);
  }
  res.status(201).send(tea)
})

//update tea 
app.put("/teas/:id", (req, res) => {
  const tea = teas.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.send(`server : 404 (server not found) :the id was not found`);
  }
  const {name,price} = req.body;
  tea.name = name;
  tea.price = price;
  res.status(201).send(tea);
});

//delete tea 



app.delete('/teas/:id',(req,res)=>{ 
  const index = teas.findIndex(t=>t.id === parseInt(req.params.id));
  if(index === -1){
    return res.status(404).send('404 server not found');
  }

    teas.splice(index,1);
    
    return res.status(202).send('deleted')
})


//sample logging onto the console
app.listen(port, () => {
  console.log(`the server is running on ${port}......`);
});
