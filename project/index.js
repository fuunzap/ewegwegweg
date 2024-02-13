const express = require('express');
const app = express();
const roomRoutes = require('./routes/roomRoutes');
const guestRoutes = require('./routes/guestRoutes'); // Добавлен импорт маршрутов для гостей
const serviceRoutes = require('./routes/serviceRoutes'); // Добавлен импорт маршрутов для услуг
const bookingRoutes = require('./routes/bookingRoutes'); // Добавлен импорт маршрутов для бронирования
const bookingServiceRoutes = require('./routes/bookingServiceRoutes'); // Добавлен импорт маршрутов для услуг бронирования

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

app.use(express.json());
app.use('/api', roomRoutes);
app.use('/api', guestRoutes); // Добавлено использование маршрутов для гостей
app.use('/api', serviceRoutes); // Добавлено использование маршрутов для услуг
app.use('/api', bookingRoutes); // Добавлено использование маршрутов для бронирования
app.use('/api', bookingServiceRoutes); // Добавлено использование маршрутов для услуг бронирования

const options={
  definition:{
    openapi: "3.0.0",
    info:{
      title: "Library Example Express API with Swagger",
      version:"0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers:[
      {
        url: "http://localhost:3000/",
        description: 'Development server',
      },
    ],
  },
  apis:["./routes/*"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
