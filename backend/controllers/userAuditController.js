const useraudit = require('../models/UserAudit');

const UserAudit = async (userId, action, oldValue, newValue) => {
    const audit = await new useraudit({ userId, action, oldValue, newValue });
    await audit.save();
};


module.exports = UserAudit