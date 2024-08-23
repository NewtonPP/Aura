import mongoose from 'mongoose';

export const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to the database');
    const DB = mongoose.connection;

    DB.on('connected', () => {
      console.log('Successfully connected to the database');
    });

    DB.on('error', (error) => {
      console.error('Error while connecting to the database:', error);
    });

    DB.once('open', () => {
      console.log('Connection to the database is open');
    });
  } catch (error) {
    console.error('Initial connection error:', error);
  }
};
