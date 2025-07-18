const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Service API',
            version: '1.0.0',
            description: 'API documentation for the Task microservice',
        },
        servers: [
            { url: 'http://localhost:3001' }
        ],
    },
    apis: [path.join(__dirname, 'routes', '*.js')],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(bodyParser.json());
app.use('/tasks', tasksRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`TaskService running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
}); 