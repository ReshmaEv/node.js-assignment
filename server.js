import express from 'express'
import mongoose from 'mongoose'

const app = express();

app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/todoData')
.then(()=>console.log("mongodb connected ...................."))
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type:String, required: true },
  content: { type: String, required: true }
});

const Todolist = mongoose.model('Todolist', todoSchema);

app.post('/todo', async (req, res) => {
  try {
    let newTodo = new Todolist(req.body);
    let newData = await newTodo.save();
    res.json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/todo', async (req, res) => {
  try {
    let data = await Todolist.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/todo/:id' , async(req,res) =>{
  try {
    let todoId = req.params.id
    let data = await Todolist.findById(todoId)
    res.json(data)
  } catch (error) {
    console.log(error);
    
  }
})


app.put('/todo/:id' , async(req,res) =>{
  try {
    let data = req.body
    let id = req.params.id
    let newdata = await Todolist.findByIdAndUpdate(id,data ,{new:true})
    res.json(newdata)
  } catch (error) {
    console.log(error);
    
  }
})


app.delete('/todo/:id' , async(req,res) =>{
  try {
    let data = req.body
    let id = req.params.id
    let newdata = await Todolist.findByIdAndDelete(id,data ,{new:true})
    res.json({message:"sucesss"})
  } catch (error) {
    console.log(error);
    
  }
})



app.listen(8000, () => {
  console.log('Server is running ................');
});
