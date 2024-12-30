const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    jobType: { type: String, required: true, enum: ['Full-time', 'Part-time', "Contract"] },
    image: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    postedBy: {
        uid: { type: String, required: true },
        role: { type: String, required: true, default: 'Customer', enum: ['Customer', 'Contractor'] }
    },
    address: {
        unit: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pin: { type: String, required: true },
    },
    budget: {
        min: { type: String, required: true },
        max: { type: String, required: true },
        negotiable: { type: Boolean, required: true },

    },
    spamCounter: { type: Number, required: false, default: 0 },
    createdAt: { type: Date, required: true, default: Date.now() }

});

module.exports = mongoose.model('Jobs', jobSchema);

