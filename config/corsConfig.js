const cors = require('cors');

const corsOptions = {
    origin: '*', // Allow all origins, or specify specific domains like ['http://example.com']
    methods: ['GET', 'POST'], // Allowed methods
    allowedHeaders: ['Content-Type'] // Allowed headers
};

module.exports = cors(corsOptions);
