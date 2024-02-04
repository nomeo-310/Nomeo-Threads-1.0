import mongoose from 'mongoose'
let isConnected = false;

export const connectToDataBase = async () => {
  const MONGODB_URL=`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wymwgv7.mongodb.net/NomeoThreads?retryWrites=true&w=majority`;
  
  mongoose.set('strictQuery', true);

  if (!MONGODB_URL) return console.log('MONGODB_URL not found');
  if (isConnected) return console.log('Already connected to MONGODB');

  try {
    await mongoose.connect(MONGODB_URL);
    isConnected = true;
    console.log('connected to MONGODB')
  } catch (error) {
    console.log(error, 'Not connected to MONGODB')
  }
} 