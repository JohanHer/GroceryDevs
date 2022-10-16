import axios from "axios";
// const express = require('express')
// const cors = require('cors');
// const app = express();
// app.use(cors());

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});

