const app = require("./app")
const port = 3000;
const { Sequelize } = require('sequelize');
const User = require('./models/User');

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})

