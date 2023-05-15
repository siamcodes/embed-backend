// This will hold the basic express configuration
const express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const blogRoutes = require('./routes/blogRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const courseRoutes = require('./routes/courseRoutes');
const slideRoutes = require('./routes/slideRoutes');
const personRoutes = require('./routes/personRoutes');
const activityRoutes = require('./routes/activityRoutes');

const app = express();

//If we want to read data in (request data) we need this
//app.use(express.json());
//app.use("/", express.static(__dirname + "/build"));
//app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/abouts', aboutRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/persons', personRoutes);
app.use('/api/ativities', activityRoutes);

module.exports = app;

