import React, { useState } from 'react';
import { PlusCircle, FileText, Type, AlignLeft } from 'lucide-react';
import feedbackStore from '../stores/feedbackStore';

const CreateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const store = feedbackStore();

  if (store.updateForm._id) return <></>;

  const handleCreateFeedback = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await store.createFeedback(e);
    } catch (error) {
      console.error('Failed to create feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00b4db] to-[#0083b0] px-6 py-4">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <PlusCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create Feedback</h2>
              <p className="text-blue-100 text-sm">Share your thoughts on a teacher</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleCreateFeedback} className="space-y-6">
            {/* Teacher Name Field */}
            <div>
              <label htmlFor="teachersName" className="block text-sm font-medium text-gray-700 mb-2">
                Teacher's Name
              </label>
              <input
                id="teachersName"
                name="teachersName"
                type="text"
                required
                onChange={store.updateCreateFormField}
                value={store.createForm.teachersName}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Enter the teacher's name"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                onChange={store.updateCreateFormField}
                value={store.createForm.subject}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Enter the subject"
              />
            </div>

            {/* Rating Field */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Rating (1–5)
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                required
                onChange={store.updateCreateFormField}
                value={store.createForm.rating}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Enter a rating"
              />
            </div>

            {/* Body Field */}
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                Feedback
              </label>
              <div className="relative">
                <AlignLeft className="absolute top-3 left-3 h-5 w-5 text-gray-400 pointer-events-none" />
                <textarea
                  id="body"
                  name="body"
                  rows={5}
                  required
                  onChange={store.updateCreateFormField}
                  value={store.createForm.body}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
                  placeholder="Write your feedback here..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-1" />
                <span>Ready to submit your feedback?</span>
              </div>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !store.createForm.teachersName.trim() ||
                  !store.createForm.subject.trim() ||
                  !store.createForm.rating ||
                  !store.createForm.body.trim()
                }
                className="group relative flex items-center justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#00b4db] to-[#0083b0] hover:from-[#00b4db] hover:to-[#056180] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Creating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Submit Feedback
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Tip */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            💡 <strong>Tip:</strong> Be honest and constructive to help improve the learning experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
