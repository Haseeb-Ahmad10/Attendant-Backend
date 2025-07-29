const express = require('express');
const cors = require('cors')
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs')
app.use(cors({ origin: 'http://localhost:3000' }));


const userRouter = require('./routes/user');

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Attendant Backend API');
})

// app.get('/login', (req, res) => {
//   res.status(200).send('login');
// });


app.use('/api/users', userRouter )



const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});