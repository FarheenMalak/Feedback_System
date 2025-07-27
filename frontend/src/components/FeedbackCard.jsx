import React, { useState } from 'react';
import { Trash2, Edit3, FileText, Calendar, Star } from 'lucide-react';
import feedbackStore from '../stores/feedbackStore';

const FeedbackCard = ({ note }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteFeedback = feedbackStore((store) => store.deleteFeedback);
  const toggleUpdate = feedbackStore((store) => store.toggleUpdate);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFeedback(note._id);
    } catch (error) {
      console.error('Failed to delete feedback:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    toggleUpdate(note);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center flex-1 min-w-0">
            <div className="h-10 w-10 bg-gradient-to-r from-[#00b4db] to-[#0083b0] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
               Teacher: {note.teachersName}
              </h3>
              <p className="text-sm text-gray-600 truncate">Subject: {note.subject}</p>
              {note.createdAt && (
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(note.createdAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-2">
        {/* Rating */}
        <div className="flex items-center text-yellow-500 text-sm font-medium">
          <Star className="h-4 w-4 mr-1" />
          {note.rating} / 5
        </div>

        {/* Feedback Body */}
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            Feedback: {note.body}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <span className="inline-flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Feedback Active
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Edit */}
            <button
              onClick={handleUpdate}
              className="group relative inline-flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-green-800 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </button>

            {/* Delete */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="group relative inline-flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
            >
              {isDeleting ? (
                <div className="flex items-center">
                  <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-red-700 border-t-transparent rounded-full"></div>
                  Deleting...
                </div>
              ) : (
                <div className="flex items-center">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
