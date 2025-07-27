const { default: mongoose } = require("mongoose")

const feedbackSchema = new mongoose.Schema({
    teachersName: String,
    subject: String,
    rating:Number,
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    }
})
const Feedback = mongoose.model('FeedBack',feedbackSchema)

module.exports = Feedback;