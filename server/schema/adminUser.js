const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    uid: { type: String, required: true },
});

const AdminUser = mongoose.model('adminUsers', adminUserSchema);

module.exports = AdminUser;