import React, { useState } from 'react';
import { Edit3, Save, X, FileText, Type, AlignLeft } from 'lucide-react';
import feedbackStore from '../stores/feedbackStore';

const UpdateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const store = feedbackStore();

  if (!store.updateForm._id) return <></>;

  const handleUpdateFeedback = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await store.updateFeedback(e);
    } catch (error) {
      console.error('Failed to update feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    store.toggleUpdate({
      _id: null,
      teachersName: '',
      subject: '',
      rating: '',
      body: '',
    });
  };

  return (
    <div className="max-w-full mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Edit3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Update Feedback</h2>
                <p className="text-emerald-100 text-sm">Make improvements to your review</p>
              </div>
            </div>
            <button
              onClick={handleCancel}
              className="h-8 w-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleUpdateFeedback} className="space-y-6">
            {/* Teacher's Name */}
            <div>
              <label htmlFor="teachersName" className="block text-sm font-medium text-gray-700 mb-2">
                Teacher's Name
              </label>
              <input
                id="teachersName"
                name="teachersName"
                type="text"
                required
                onChange={store.handleUpdateFieldChange}
                value={store.updateForm.teachersName}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                placeholder="Update teacher's name"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                onChange={store.handleUpdateFieldChange}
                value={store.updateForm.subject}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                placeholder="Update subject"
              />
            </div>

            {/* Rating */}
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
                onChange={store.handleUpdateFieldChange}
                value={store.updateForm.rating}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                placeholder="Update rating"
              />
            </div>

            {/* Feedback Body */}
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                Feedback
              </label>
              <div className="relative">
                <AlignLeft className="absolute top-3 left-3 h-5 w-5 text-gray-400 pointer-events-none" />
                <textarea
                  id="body"
                  name="body"
                  rows={6}
                  required
                  onChange={store.handleUpdateFieldChange}
                  value={store.updateForm.body}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 resize-none"
                  placeholder="Update your feedback..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleCancel}
                className="group relative flex items-center justify-center py-3 px-6 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <X className="h-5 w-5 mr-2" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  isLoading ||
                  !store.updateForm.teachersName?.trim() ||
                  !store.updateForm.subject?.trim() ||
                  !store.updateForm.rating ||
                  !store.updateForm.body?.trim()
                }
                className="group relative flex items-center justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Updating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="h-5 w-5 mr-2" />
                    Update Feedback
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Tip */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            ✏️ <strong>Tip:</strong> Keep your feedback clear and helpful for continuous improvement
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
