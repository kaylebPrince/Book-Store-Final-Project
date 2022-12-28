const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const rateLimiter = require("express-rate-limit");
const connectToDB = require("./db/mongodb");
const helmet = require("helmet");
const { requiresAuth } = require('express-openid-connect');
const logger = require("./logging/logger");

const auth0Middleware = require("./auth/auth0");

// Routes
const bookRouter = require("./routes/books.routes");
const authorRouter = require("./routes/authors.routes");

const app = express();

// Connect to mongodb database
connectToDB();

//  Add middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth0Middleware);

const limiter = rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Security middlware
app.use(helmet());

app.use("/api/v1/books", requiresAuth(), bookRouter);
app.use("/api/v1/authors", requiresAuth(), authorRouter);

app.get("/", (req,res)=>{
    res.send("Hello bookstore")
})

// Error handler MW
app.use((err, req,res,next)=>{
    logger.error(err.message);
    const errorStatus = err.status || 500;
    res.status(errorStatus).send(err.message);
    next();
})


app.listen(config.PORT, ()=>{
    logger.info(`Server started on http://localhost:${config.PORT}`);
})