const Feedback = require('../models/feedback');

const fetchFeedbacks = async (req, res) => {
    let feedbacks;

    if (req.user.email === 'admin@gmail.com') {
        feedbacks = await Feedback.find().populate('user', 'email'); // admin sees all
    } else {
        feedbacks = await Feedback.find({ user: req.user._id }); // student sees own
    }

    res.json({ feedbacks });
};

const fetchFeedback = async (req, res) => {
    const feedbackId = req.params.id;
    const feedback = await Feedback.findOne({ _id: feedbackId, user: req.user._id });
    res.json({ feedback });
};

const createFeedback = async (req, res) => {
    const { teachersName, subject, rating, body } = req.body;

    const feedback = await Feedback.create({
        teachersName,
        subject,
        rating,
        body,
        user: req.user._id,
    });

    res.json({ feedback });
};

const updateFeedback = async (req, res) => {
    const feedbackId = req.params.id;
    const { teachersName, subject, rating, body } = req.body;

    await Feedback.findOneAndUpdate(
        { _id: feedbackId, user: req.user._id },
        {
            teachersName,
            subject,
            rating,
            body,
        }
    );

    const feedback = await Feedback.findById(feedbackId);
    res.json({ feedback });
};

const deleteFeedback = async (req, res) => {
    const feedbackId = req.params.id;
    await Feedback.deleteOne({ _id: feedbackId, user: req.user._id });
    res.json({ success: 'Feedback deleted' });
};

module.exports = {
    fetchFeedback,
    fetchFeedbacks,
    createFeedback,
    updateFeedback,
    deleteFeedback,
};
