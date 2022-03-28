const mongoose = require('mongoose');

const PermissionSchema = mongoose.Schema({
    reason: {
        type: String,
        require: true,
        trim: true
    },
    user: {
        type: String,
        require: true
    },
    day: {
        type: String,
        require: true
    },
    from: {
        type: String,
        require: true
    },
    to: {
        type: String,
        require: true
    },
    area: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Permission', PermissionSchema);