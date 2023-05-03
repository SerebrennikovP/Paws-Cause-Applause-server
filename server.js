const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')

const PORT = 8080
const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)


// app.get('/posts/:id/comments', async (req, res) => {
//    try {
//       const allPosts = await getAllPostsModel()
//       res.send(allPosts[req.params.id].comments)
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