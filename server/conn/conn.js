const mongoose = require("mongoose");
require("dotenv").config();

const conn = async () => {
  try {
    const response = await mongoose.connect(`${process.env.MONOGO_URI}`);
    if (response) {
      console.log("connected to DB");
    }
  } catch (error) {
    console.log(error);
  }
};

conn();
