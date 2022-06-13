const app = require('./app');
const { connectDatabase } = require('./config/database');
const cloudinary = require('cloudinary');


connectDatabase();

cloudinary.config({
    cloud_name:process.env.CLOUDDINARY_NAME,
    api_key:process.env.CLOUDDINARY_API_KEY,
    api_secret:process.env.CLOUDDINARY_SECRET,
})


app.listen(process.env.PORT,()=>{
    console.log(`the server is listening on port ${process.env.PORT} `)
});
