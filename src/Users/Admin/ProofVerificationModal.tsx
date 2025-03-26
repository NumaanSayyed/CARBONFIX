import React, { useState } from "react";

interface ProofVerificationModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const ProofVerificationModal: React.FC<ProofVerificationModalProps> = ({ showModal, setShowModal }) => {
  const [popupType, setPopupType] = useState<"image" | "video" | "youtube" | null>(null);

  //Dummy data for proof
  const proofImage = "https://via.placeholder.com/600x400?text=Proof+Image";
  const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
  const youtubeUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

  if (!showModal) return null;

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-[90vw] h-[90vh] flex flex-col shadow-lg relative">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <i className="fas fa-file-alt text-emerald-500"></i> Proof Verification Details
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all"
            >
              <i className="fas fa-times text-gray-600"></i>
            </button>
          </div>

          {/*Content Section */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-3 gap-6 h-full">
              {/* Proof Preview Section */}
              <div className="col-span-2 bg-gray-50 rounded-xl p-4 flex flex-col">
                <div className="bg-black rounded-lg flex-1 mb-4 relative group cursor-pointer">
                  <img
                    src={proofImage}
                    className="w-full h-full object-contain"
                    alt="Proof preview"
                    onClick={() => setPopupType("image")}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <i className="fas fa-search-plus text-white text-3xl"></i>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPopupType("video")}
                    className="w-full py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-all"
                  >
                    <i className="fas fa-video mr-2"></i>View Video Proof
                  </button>
                  <button
                    onClick={() => setPopupType("youtube")}
                    className="w-full py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-all"
                  >
                    <i className="fab fa-youtube mr-2"></i>YouTube Evidence
                  </button>
                </div>
              </div>

              {/* Participant Details */}
              <div className="bg-gray-50 rounded-xl p-6 flex flex-col">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Participant Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Name</label>
                    <p className="text-gray-800 font-medium">John Doe</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Email</label>
                    <p className="text-gray-800 font-medium">johndoe@example.com</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Project Type</label>
                    <p className="text-gray-800 font-medium">Afforestation Project</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Submission Date</label>
                    <p className="text-gray-800 font-medium">March 10, 2025</p>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Additional Remarks</h4>
                <p className="text-gray-600 text-sm">
                  This proof submission includes an image, video, and YouTube link related to the afforestation project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Popups for Image, Video, and YouTube */}
      {popupType && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 shadow-lg relative w-[80vw] max-w-3xl">
            {/*Close Button */}
            <button
              onClick={() => setPopupType(null)}
              className="absolute top-3 right-3 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all"
            >
              <i className="fas fa-times text-gray-600"></i>
            </button>

            {/*Content based on selected media type */}
            {popupType === "image" && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Image Proof</h3>
                <img src={proofImage} className="w-full rounded-lg" alt="Proof" />
                <p className="text-gray-600 text-sm mt-4">
                  This image was submitted as proof for the afforestation project.
                </p>
              </>
            )}

            {popupType === "video" && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Video Proof</h3>
                <video controls className="w-full rounded-lg">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-gray-600 text-sm mt-4">
                  This video demonstrates the activities performed during the afforestation project.
                </p>
              </>
            )}

            {popupType === "youtube" && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">YouTube Evidence</h3>
                <iframe
                  className="w-full h-[300px] rounded-lg"
                  src={youtubeUrl}
                  title="YouTube Video Proof"
                  allowFullScreen
                ></iframe>
                <p className="text-gray-600 text-sm mt-4">
                  This YouTube video provides additional proof for the afforestation project.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProofVerificationModal;
