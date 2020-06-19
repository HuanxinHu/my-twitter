require('colors');
const fs = require('fs');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const User = require('./models/User');

// Connect to DB
connectDB();

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

// Import to DB
const importData = async (schemaName) => {
  try {
    switch (schemaName) {
      case 'users':
        await User.create(users);
        break;
      default:
        console.log('cannot find schema...'.yellow.inverse);
        process.exit();
        break;
    }
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data
const deleteData = async (schemaName) => {
  try {
    switch (schemaName) {
      case 'users':
        await User.deleteMany();
        break;
      default:
        console.log('cannot find schema...'.yellow.inverse);
        process.exit();
        break;
    }
    console.log('Data deleted...'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData(process.argv[3]);
} else if (process.argv[2] === '-d') {
  deleteData(process.argv[3]);
}
