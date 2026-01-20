import mongoose from "mongoose"

let isConnected:boolean = false

const connectDb = async() => {
  if(isConnected){
    console.log("already connected to db")
    return
  }

    const uri = process.env.MONGO_URI as string
    if(!uri){
      throw new Error("please provide your uri from .env file")
    }

    try {
      await mongoose.connect(uri)
      isConnected=true
      console.log("db connected successfully")
    } catch (error) {
      console.error("could not connect to db: ", error)
      throw error
    }
}

export default connectDb
