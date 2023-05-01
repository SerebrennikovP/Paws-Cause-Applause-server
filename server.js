const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const app = express()
const PORT = 8080
app.use(express.json())
app.use(cors())
const { getAllUsersModel, addUserModel } = require('./models/userModels')

app.post('/signUp', async (req, res) => {
    try {
        const newUser = {
            ...req.body,
            id: uuidv4(),
        };
        const isOK = addUserModel(newUser)
        isOK ? res.status(201).send() : res.status(409).send()
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

app.post('/login', async (req, res) => {
    try {
        const data = getAllUsersModel()
        const parsedData = JSON.parse(data)
        const userObj = parsedData.find(({ email }) => email == req.body.email)
        userObj ? res.status(201).send(userObj) : res.status(404).send()
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

// app.get('/posts/:id/comments', async (req, res) => {
//    try {
//       const allPosts = await getAllPostsModel()
//       res.send(allPosts[req.params.id].comments)
//    } catch (err) {
//       console.log(err)
//       res.status(500).send(err.message)
//    }
// })

// app.put('/posts/:id/comments/:commentID', async (req, res) => {
//    try {
//       const { name, email, body } = req.body;
//       const allPosts = await getAllPostsModel()

//       const updatedComment = {
//          ...commentToUpdate.data,
//          name: name || commentToUpdate.data.name,
//          email: email || commentToUpdate.data.email,
//          body: body || commentToUpdate.data.body,
//       };
//       const foundedCommentToUpdate = allPosts[req.params.id].comments.find(comment => comment.id == req.params.commentID);
//       Object.assign(foundedCommentToUpdate, updatedComment);
//       addPostsModel(allPosts)
//       res.send(updatedComment);
//    } catch (err) {
//       console.log(err)
//       res.status(500).send(err.message)
//    }
// })


// app.delete('/posts/:id', async (req, res) => {
//    try {
//       const allPosts = await getAllPostsModel()
//       if (allPosts[req.params.id]) {
//          delete allPosts[req.params.id]
//          // addPostsModel(allPosts)
//          res.send(`Post with ID ${req.params.id} has been deleted`)
//       } else {
//          res.status(404).send('Post not found')
//       }
//    } catch (err) {
//       console.log(err)
//       res.status(500).send(err.message)
//    }
// })

// app.delete('/posts/:id/comments/:commentID', async (req, res) => {
//    try {
//       const allPosts = await getAllPostsModel()
//       const indexOfComment = allPosts[req.params.id].comments.findIndex(comment => comment.id == req.params.commentID)
//       if (indexOfComment >= 0) {
//          allPosts[req.params.id].comments.splice(indexOfComment, 1)
//          // addPostsModel(allPosts)
//          res.send(`Comment with ID ${req.params.commentID} of user ${req.params.id} has been deleted`)
//       } else {
//          res.status(404).send('Post not found')
//       }
//    } catch (err) {
//       console.log(err)
//       res.status(500).send(err.message)
//    }
// })


app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
});