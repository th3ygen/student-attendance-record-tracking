const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// async wrapper, so we can use await
(async () => {
    await require('./services/mongoose.service').connect();
    
    // check if there is no user
    // create a test users
    require('./init')();

    app.use('/api', require('./routes'));
    
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})();

/* db connection */