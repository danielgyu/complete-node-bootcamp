const app = require('./app.js');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

// bind server to port
const port = process.env.PORT || 3100;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

