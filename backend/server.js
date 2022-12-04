const app = require('./app');
const { connectDatabase } = require('./config/database');
const cloudinary = require('cloudinary');

const port = process.env.PORT || 4000

connectDatabase();

cloudinary.config({
    cloud_name:process.env.CLOUDDINARY_NAME,
    api_key:process.env.CLOUDDINARY_API_KEY,
    api_secret:process.env.CLOUDDINARY_SECRET,
})


app.listen(port,()=>{
    console.log(`the server is listening on port ${port} `)
});
