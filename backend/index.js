const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.send({
        evento: 'omniStack',
        data: 'Esta semana!'
    });
});
app.listen(3333);""""