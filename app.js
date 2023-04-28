import express from 'express'
import connectDB from './db/connectDB.js';
import web from './routes/web.js'
import {join} from 'path'
import cookieParser from 'cookie-parser';
const app = express();
const port = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017'
connectDB(DATABASE_URL)

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/update/:id',express.static(join(process.cwd(), "public")))

app.use('/', web);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})