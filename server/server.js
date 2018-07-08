const path = require('path');
const express = require('express');
const server = express();
//const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('./public/passport.js')(passport)

const locationRoutes = require('./routes/locations');
const commentRoutes = require('./routes/comments');
const loginRoutes = require('./routes/login');

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');

server.use(cors(corsOption));
server.use(express.json());
server.use(cookieParser())
server.use(express.static(path.join(__dirname, './public')));
server.use('/api/v1/locations', locationRoutes);
server.use('/api/v1/comments', commentRoutes);
server.use('/api/v1/', loginRoutes);

module.exports = server
