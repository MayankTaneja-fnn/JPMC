const jwt = require('jsonwebtoken');
const { base, tables } = require('../config/airtable');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // console.log("token : ", token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

const authorize = (roles) => {
    return (req, res, next) => {
        console.log(req.user.role);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: 'Access denied. Insufficient permissions.' 
            });
        }
        next();
    };
};

const verifyUser = async (req, res, next) => {
    try {
        const records = await base(tables.USERS)
            .select({
                filterByFormula: `AND(Username = '${req.body.username}', Password = '${req.body.password}')`
            })
            .firstPage();

        if (records.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        req.userRecord = records[0];
        next();
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { verifyToken, authorize, verifyUser }; 