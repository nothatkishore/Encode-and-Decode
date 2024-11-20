import express from 'express'
import aes from './routes/aes.route.js'
import des from './routes/des.route.js'
import rc4 from './routes/rc4.route.js'
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow your React app's origin
    methods: ['GET', 'POST'],        // Allowed methods
    credentials: true                // If you're using cookies/auth headers
}));

app.use(express.json());
app.use('/aes', aes);
app.use('/des', des);
app.use('/rc4', rc4);

app.listen(3000, () => {
    console.log("Server running!");
})