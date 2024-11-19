import express from 'express'
import aes from './routes/aes.route.js'
import des from './routes/des.route.js'
import rsa from './routes/rsa.route.js'
import rc4 from './routes/rc4.route.js'

const app = express();


app.listen(3000, () =>
{
    console.log("Server running!");
})

app.use(express.json());
app.use('/aes', aes);
app.use('/des', des);
app.use('/rsa', rsa);
app.use('/rc4', rc4);