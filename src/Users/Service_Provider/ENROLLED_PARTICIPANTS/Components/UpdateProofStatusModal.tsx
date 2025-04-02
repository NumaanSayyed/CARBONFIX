import React, { useState } from "react";

interface UpdateProofStatusModalProps {
  showUpdateModal: boolean;
  setShowUpdateModal: (value: boolean) => void;
  updateFormData: { remarks: string };
  setUpdateFormData: (data: { remarks: string }) => void;
}

const UpdateProofStatusModal: React.FC<UpdateProofStatusModalProps> = ({
  showUpdateModal,
  setShowUpdateModal,
  updateFormData,
  setUpdateFormData,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    const file = event.target.files?.[0] || null;
    if (type === "image") {
      setImageFile(file);
      setImageURL(""); // Clear URL if file is uploaded
    }
    if (type === "video") {
      setVideoFile(file);
      setVideoURL(""); // Clear URL if file is uploaded
    }
  };

  const handleUpdate = () => {
    if ((!imageFile && !imageURL) || (!videoFile && !videoURL)) {
      setModalMessage(
        "Please provide either a file or a URL for both image and video proofs."
      );
      setIsModalOpen(true);
      return;
    }

    setShowUpdateModal(false);

    // Show success message
    const successDiv = document.createElement("div");
    successDiv.className =
      "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up";
    successDiv.textContent = "Proofs submitted successfully!";
    document.body.appendChild(successDiv);

    setTimeout(() => successDiv.remove(), 3000);
  };

  if (!showUpdateModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[95%] sm:w-[500px] mx-4">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            Submit Proofs
          </h2>
          <button
            onClick={() => setShowUpdateModal(false)}
            className="text-gray-400 hover:text-gray-500 !rounded-button"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Image Proof Upload / URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Proof
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "image")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <div className="relative mt-2">
              <input
                type="text"
                value={imageURL}
                onChange={(e) => {
                  setImageURL(e.target.value);
                  setImageFile(null); // Clear file if URL is entered
                }}
                placeholder="Or enter image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              {imageURL && (
                <p className="text-sm text-green-600 mt-2">✅ URL Provided</p>
              )}
              {imageFile && (
                <p className="text-sm text-green-600 mt-2">
                  ✅ {imageFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Video Proof Upload / URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Proof
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChange(e, "video")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <div className="relative mt-2">
              <input
                type="text"
                value={videoURL}
                onChange={(e) => {
                  setVideoURL(e.target.value);
                  setVideoFile(null); // Clear file if URL is entered
                }}
                placeholder="Or enter video URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              {videoURL && (
                <p className="text-sm text-green-600 mt-2">✅ URL Provided</p>
              )}
              {videoFile && (
                <p className="text-sm text-green-600 mt-2">
                  ✅ {videoFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remarks
            </label>
            <textarea
              value={updateFormData.remarks}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  remarks: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none h-32 resize-none"
              placeholder="Add your remarks here..."
            ></textarea>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <p className="text-center text-gray-800 mb-4">{modalMessage}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 !rounded-button whitespace-nowrap"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex gap-4 p-6">
          <button
            onClick={handleUpdate}
            className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors !rounded-button"
          >
            Submit Proofs
          </button>
          <button
            onClick={() => setShowUpdateModal(false)}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors !rounded-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProofStatusModal;
