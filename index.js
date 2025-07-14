const express = require('express');
const tasksRouter = require('./routes/tasks');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/tasks', tasksRouter);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API documentation for the Task Manager',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
}); 