import mongoose from 'mongoose'
const connectDb=()=>{
    const con=mongoose.connect(process.env.MONGODB_URI)
    if(!con)throw new Error("error connecting to Db")
        console.log('Db connection successfull');
}
export default connectDb  