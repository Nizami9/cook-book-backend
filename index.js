const express = require('express');
const app = express();
const fileSystem = require('fs');
const port = 3030;
const axios = require('axios');
const path = require('path');
const recipes = require('./receipes.json')
let bodyParser = require('body-parser')
const data = require("./receipes.json");

const cors = require('cors')
app.use(cors({origin:"*", optionsSuccessStatus: 200}))

const filePath = path.join(process.cwd(), "receipes.json")

app.get('/receipes', (req, res) => {
  fileSystem.readFile(filePath,"utf8" ,(err, data) => {
    if (err) {
      console.log(err)
    } else {
      let sampleData = JSON.parse(data);
      console.log("recipes from json file", sampleData["receipes"])
      res.send(sampleData["receipes"])

    }
  })
});

app.get('/receipes/:id',async (req, res) => {
  let id = req.params.id;
  console.log("id is ", id)
  let recipe;   

  //    --- usig filter method 
  //  let recipeList=data["receipes"];
  //  recipe = recipeList.filter(recipe => recipe.recipeId.toString() === id );
 
  
  fileSystem.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let sampleData = JSON.parse(data);
      let array = sampleData["receipes"];
      
      array.map(element => {
        console.log("element id ", element.recipeId)
        if (element.recipeId.toString() === id) {
          recipe = element;
        }
      })
      res.send(recipe);
    }
  })
});

fileSystem.writeFile('receipes.txt', 'This is the first receipe', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Done")
  }
})

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}/`);
});