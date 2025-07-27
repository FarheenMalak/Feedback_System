import React from 'react';
import notesStore from '../stores/feedbackStore';
import Note from './FeedbackCard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import welcomeImage from '../assets/students.png';

const Notes = () => {
  const store = notesStore();

  // Subject-wise feedback data
const feedbackData = [
  { subject: 'Math', student: 40, teacher: 75 },
  { subject: 'Science', student: 25, teacher: 60 },
  { subject: 'English', student: 70, teacher: 25 },
  { subject: 'Computer', student: 90, teacher: 48 },
];
  return (
    <div className="p-4">
      {/* Top Section: Welcome + Graph */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Welcome Section */}
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center justify-between shadow-md w-full lg:w-1/2">
          {/* Left Text */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-blue-800">Welcome to Student Feedback System</h1>
            <p className="text-sm text-blue-600 mt-1">Your voice shapes our learning experience!</p>
          </div>
          {/* Image */}
          <img
            src={welcomeImage}
            alt="Welcome"
            className="w-full h-full object-contain max-w-xs"
          />
        </div>

        {/* Graph Section */}
<div className="w-full lg:w-1/2 bg-white rounded-lg p-4 flex items-center justify-center shadow-md mb-6">
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={feedbackData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="subject" />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="student"
        name="Student Feedback"
        stroke="#06923E"
        strokeWidth={3}
        dot
      />
      <Line
        type="monotone"
        dataKey="teacher"
        name="Teacher Feedback"
        stroke="#3B82F6"
        strokeWidth={3}
        dot
      />
    </LineChart>
  </ResponsiveContainer>
</div>
      </div>

      {/* Notes Section */}
      <h2 className="text-2xl font-semibold text-green-950 mb-4 border-b pb-2">Your Feedback Notes</h2>

      {store.feedbacks && store.feedbacks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {store.feedbacks.map((note) => (
            <Note note={note} key={note._id} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm text-center">You have not given any feedbacks yet.</p>
      )}
    </div>
  );
};

export default Notes;
