const express= require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db.js');
const router = require('./routes');


const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 413 && 'body' in err) {
      res.status(413).json({ error: 'Payload Too Large' });
    } else {
      next();
    }
  });

app.use(express.json())
app.use(cookieParser())
app.use("/api",router);

const PORT = 8080 || process.env.PORT

connectDB();

app.listen(PORT,()=>{
    console.log('server is running')
})