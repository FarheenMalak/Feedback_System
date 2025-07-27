import { create } from "zustand"; 
import axios from 'axios';

const feedbackStore = create((set) => ({
  feedbacks: null,

  createForm: {
    teachersName: '',
    subject: '',
    rating: '',
    body: '',
  },

  updateForm: {
    _id: null,
    teachersName: '',
    subject: '',
    rating: '',
    body: '',
  },

  fetchFeedbacks: async () => {
    const res = await axios.get('/feedbacks');
    set({ feedbacks: res.data.feedbacks });
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => ({
      createForm: {
        ...state.createForm,
        [name]: value,
      },
    }));
  },

  createFeedback: async (e) => {
    e.preventDefault();

    const { createForm, feedbacks } = feedbackStore.getState();
    const res = await axios.post('/feedbacks', createForm);

    set({
      feedbacks: [...feedbacks, res.data.feedback],
      createForm: {
        teachersName: '',
        subject: '',
        rating: '',
        body: '',
      },
    });
  },

  deleteFeedback: async (_id) => {
    await axios.delete(`/feedbacks/${_id}`);
    const { feedbacks } = feedbackStore.getState();

    const newFeedbacks = feedbacks.filter((item) => item._id !== _id);
    set({ feedbacks: newFeedbacks });
  },

  handleUpdateFieldChange: (e) => {
    const { name, value } = e.target;

    set((state) => ({
      updateForm: {
        ...state.updateForm,
        [name]: value,
      },
    }));
  },

  toggleUpdate: ({ _id, teachersName, subject, rating, body }) => {
    set({
      updateForm: {
        _id,
        teachersName,
        subject,
        rating,
        body,
      },
    });
  },

  updateFeedback: async (e) => {
    e.preventDefault();

    const { updateForm, feedbacks } = feedbackStore.getState();
    const { _id, teachersName, subject, rating, body } = updateForm;

    const res = await axios.put(`/feedbacks/${_id}`, {
      teachersName,
      subject,
      rating,
      body,
    });

    const newFeedbacks = [...feedbacks];
    const index = newFeedbacks.findIndex((item) => item._id === _id);
    newFeedbacks[index] = res.data.feedback;

    set({
      feedbacks: newFeedbacks,
      updateForm: {
        _id: null,
        teachersName: '',
        subject: '',
        rating: '',
        body: '',
      },
    });
  },
}));

export default feedbackStore;
