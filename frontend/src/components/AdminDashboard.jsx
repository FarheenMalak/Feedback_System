import { useEffect } from "react";
import feedbackStore from "../stores/feedbackStore";

function AdminDashboard() {
  const { feedbacks, fetchFeedbacks, deleteFeedback } = feedbackStore();

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome Admin!</h1>
        <p className="text-lg text-gray-600 mb-6">Here are all the student feedbacks:</p>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gradient-to-r from-[#00b4db] to-[#0083b0] text-white text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Student Email</th>
                  <th className="px-6 py-4">Teacher Name</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Feedback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {feedbacks && feedbacks.length > 0 ? (
                  feedbacks.map((fb, index) => (
                    <tr key={fb._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4 text-blue-600">{fb.user?.email || "Unknown"}</td>
                      <td className="px-6 py-4 text-gray-700">{fb.teachersName}</td>
                      <td className="px-6 py-4 text-gray-700">{fb.subject}</td>
                      <td className="px-6 py-4 text-yellow-600 font-semibold">{fb.rating}</td>
                      <td className="px-6 py-4 text-gray-700">{fb.body}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center px-6 py-8 text-gray-500 italic">
                      No feedbacks yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
