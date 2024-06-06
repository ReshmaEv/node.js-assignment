import express from 'express'
import mongoose from 'mongoose'

const app = express();

app.use(express.json());


mongoose.connect('mongodb+srv://reshmavineesh0909:UFOGOwBgCxtDLLJA@datas.tuvufxa.mongodb.net/?retryWrites=true&w=majority&appName=datas/new')
.then(()=>console.log("mongodb connected ...................."))
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true }
});

const Blog = mongoose.model('Blog', blogSchema);

app.post('/blog', async (req, res) => {
  try {
    let newBlog = new Blog(req.body);
    let newData = await newBlog.save();
    res.json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/blog', async (req, res) => {
  try {
    let data = await Blog.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/blog/:id' , async(req,res) =>{
  try {
    let BlogId = req.params.id
    let data = await Blog.findById(BlogId)
    res.json(data)
  } catch (error) {
    console.log(error);
    
  }
})


app.put('/blog/:id' , async(req,res) =>{
  try {
    let data = req.body
    let id = req.params.id
    let newdata = await Blog.findByIdAndUpdate(id,data ,{new:true})
    res.json(newdata)
  } catch (error) {
    console.log(error);
    
  }
})


app.delete('/blog/:id' , async(req,res) =>{
  try {
    let data = req.body
    let id = req.params.id
    let newdata = await Blog.findByIdAndDelete(id,data ,{new:true})
    res.json({message:"sucesss"})
  } catch (error) {
    console.log(error);
    
  }
})



app.listen(8000, () => {
  console.log('Server is running ................');
});
