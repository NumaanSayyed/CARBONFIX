// // // // import React, { useState } from "react";

// // // // interface UpdateProofStatusModalProps {
// // // //   showUpdateModal: boolean;
// // // //   setShowUpdateModal: (value: boolean) => void;
// // // //   updateFormData: { remarks: string };
// // // //   setUpdateFormData: (data: { remarks: string }) => void;
// // // // }

// // // // const UpdateProofStatusModal: React.FC<UpdateProofStatusModalProps> = ({
// // // //   showUpdateModal,
// // // //   setShowUpdateModal,
// // // //   updateFormData,
// // // //   setUpdateFormData,
// // // // }) => {
// // // //   const [imageFile, setImageFile] = useState<File | null>(null);
// // // //   const [imageURL, setImageURL] = useState<string>("");
// // // //   const [videoFile, setVideoFile] = useState<File | null>(null);
// // // //   const [videoURL, setVideoURL] = useState<string>("");
// // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // //   const [modalMessage, setModalMessage] = useState("");

// // // //   const handleFileChange = (
// // // //     event: React.ChangeEvent<HTMLInputElement>,
// // // //     type: "image" | "video"
// // // //   ) => {
// // // //     const file = event.target.files?.[0] || null;
// // // //     if (type === "image") {
// // // //       setImageFile(file);
// // // //       setImageURL(""); // Clear URL if file is uploaded
// // // //     }
// // // //     if (type === "video") {
// // // //       setVideoFile(file);
// // // //       setVideoURL(""); // Clear URL if file is uploaded
// // // //     }
// // // //   };

// // // //   const handleUpdate = () => {
// // // //     if ((!imageFile && !imageURL) || (!videoFile && !videoURL)) {
// // // //       setModalMessage(
// // // //         "Please provide either a file or a URL for both image and video proofs."
// // // //       );
// // // //       setIsModalOpen(true);
// // // //       return;
// // // //     }

// // // //     setShowUpdateModal(false);

// // // //     // Show success message
// // // //     const successDiv = document.createElement("div");
// // // //     successDiv.className =
// // // //       "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up";
// // // //     successDiv.textContent = "Proofs submitted successfully!";
// // // //     document.body.appendChild(successDiv);

// // // //     setTimeout(() => successDiv.remove(), 3000);
// // // //   };

// // // //   if (!showUpdateModal) return null;

// // // //   return (
// // // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //       <div className="bg-white rounded-xl w-[95%] sm:w-[500px] mx-4">
// // // //         {/* Modal Header */}
// // // //         <div className="p-6 border-b border-gray-200 flex items-center justify-between">
// // // //           <h2 className="text-2xl font-semibold text-gray-900">
// // // //             Submit Proofs
// // // //           </h2>
// // // //           <button
// // // //             onClick={() => setShowUpdateModal(false)}
// // // //             className="text-gray-400 hover:text-gray-500 !rounded-button"
// // // //           >
// // // //             <i className="fas fa-times"></i>
// // // //           </button>
// // // //         </div>

// // // //         {/* Modal Content */}
// // // //         <div className="p-6 space-y-6">
// // // //           {/* Image Proof Upload / URL */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               Image Proof
// // // //             </label>
// // // //             <input
// // // //               type="file"
// // // //               accept="image/*"
// // // //               onChange={(e) => handleFileChange(e, "image")}
// // // //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
// // // //             />
// // // //             <div className="relative mt-2">
// // // //               <input
// // // //                 type="text"
// // // //                 value={imageURL}
// // // //                 onChange={(e) => {
// // // //                   setImageURL(e.target.value);
// // // //                   setImageFile(null); // Clear file if URL is entered
// // // //                 }}
// // // //                 placeholder="Or enter image URL"
// // // //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
// // // //               />
// // // //               {imageURL && (
// // // //                 <p className="text-sm text-green-600 mt-2">✅ URL Provided</p>
// // // //               )}
// // // //               {imageFile && (
// // // //                 <p className="text-sm text-green-600 mt-2">
// // // //                   ✅ {imageFile.name}
// // // //                 </p>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* Video Proof Upload / URL */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               Video Proof
// // // //             </label>
// // // //             <input
// // // //               type="file"
// // // //               accept="video/*"
// // // //               onChange={(e) => handleFileChange(e, "video")}
// // // //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
// // // //             />
// // // //             <div className="relative mt-2">
// // // //               <input
// // // //                 type="text"
// // // //                 value={videoURL}
// // // //                 onChange={(e) => {
// // // //                   setVideoURL(e.target.value);
// // // //                   setVideoFile(null); // Clear file if URL is entered
// // // //                 }}
// // // //                 placeholder="Or enter video URL"
// // // //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
// // // //               />
// // // //               {videoURL && (
// // // //                 <p className="text-sm text-green-600 mt-2">✅ URL Provided</p>
// // // //               )}
// // // //               {videoFile && (
// // // //                 <p className="text-sm text-green-600 mt-2">
// // // //                   ✅ {videoFile.name}
// // // //                 </p>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* Remarks */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               Remarks
// // // //             </label>
// // // //             <textarea
// // // //               value={updateFormData.remarks}
// // // //               onChange={(e) =>
// // // //                 setUpdateFormData({
// // // //                   ...updateFormData,
// // // //                   remarks: e.target.value,
// // // //                 })
// // // //               }
// // // //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none h-32 resize-none"
// // // //               placeholder="Add your remarks here..."
// // // //             ></textarea>
// // // //           </div>
// // // //         </div>

// // // //         {/* Modal */}
// // // //         {isModalOpen && (
// // // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //             <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
// // // //               <p className="text-center text-gray-800 mb-4">{modalMessage}</p>
// // // //               <button
// // // //                 onClick={() => setIsModalOpen(false)}
// // // //                 className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 !rounded-button whitespace-nowrap"
// // // //               >
// // // //                 Close
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Modal Actions */}
// // // //         <div className="flex gap-4 p-6">
// // // //           <button
// // // //             onClick={handleUpdate}
// // // //             className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors !rounded-button"
// // // //           >
// // // //             Submit Proofs
// // // //           </button>
// // // //           <button
// // // //             onClick={() => setShowUpdateModal(false)}
// // // //             className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors !rounded-button"
// // // //           >
// // // //             Cancel
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UpdateProofStatusModal;


// // // import React, { useState } from "react";
// // // import axios from "axios";

// // // interface UpdateProofStatusModalProps {
// // //   showUpdateModal: boolean;
// // //   setShowUpdateModal: (value: boolean) => void;
// // //   updateFormData: { remarks: string };
// // //   setUpdateFormData: (data: { remarks: string }) => void;
// // // }

// // // const UpdateProofStatusModal: React.FC<UpdateProofStatusModalProps> = ({
// // //   showUpdateModal,
// // //   setShowUpdateModal,
// // //   updateFormData,
// // //   setUpdateFormData,
// // // }) => {
// // //   const [imageFile, setImageFile] = useState<File | null>(null);
// // //   const [imageURL, setImageURL] = useState<string>("");
// // //   const [videoFile, setVideoFile] = useState<File | null>(null);
// // //   const [videoURL, setVideoURL] = useState<string>("");
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [modalMessage, setModalMessage] = useState("");

// // //   const handleFileChange = (
// // //     event: React.ChangeEvent<HTMLInputElement>,
// // //     type: "image" | "video"
// // //   ) => {
// // //     const file = event.target.files?.[0] || null;
// // //     if (type === "image") {
// // //       setImageFile(file);
// // //       setImageURL("");
// // //     }
// // //     if (type === "video") {
// // //       setVideoFile(file);
// // //       setVideoURL("");
// // //     }
// // //   };

// // //   const handleUpdate = async () => {
// // //     if ((!imageFile && !imageURL) && (!videoFile && !videoURL)) {
// // //       setModalMessage("Please provide either a file or a URL for both image and video proofs.");
// // //       setIsModalOpen(true);
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append("participant_id", "123"); // Replace with actual participant ID
// // //     formData.append("project_id", "456"); // Replace with actual project ID
// // //     formData.append("service_provider_id", "789"); // Replace with actual service provider ID
// // //     formData.append("remark", updateFormData.remarks);

// // //     if (imageFile) formData.append("image", imageFile);
// // //     if (imageURL) formData.append("image_url", imageURL);
// // //     if (videoFile) formData.append("video", videoFile);
// // //     if (videoURL) formData.append("video_url", videoURL);

// // //     try {
// // //       const response = await axios.post("http://your-backend-url/submit", formData, {
// // //         headers: { "Content-Type": "multipart/form-data" },
// // //       });
      
// // //       setShowUpdateModal(false);
      
// // //       const successDiv = document.createElement("div");
// // //       successDiv.className =
// // //         "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up";
// // //       successDiv.textContent = "Proofs submitted successfully!";
// // //       document.body.appendChild(successDiv);

// // //       setTimeout(() => successDiv.remove(), 3000);
// // //     } catch (error) {
// // //       console.error("Error submitting proofs:", error);
// // //       setModalMessage("Failed to submit proofs. Please try again.");
// // //       setIsModalOpen(true);
// // //     }
// // //   };

// // //   if (!showUpdateModal) return null;

// // //   return (
// // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //       <div className="bg-white rounded-xl w-[95%] sm:w-[500px] mx-4">
// // //         <div className="p-6 border-b border-gray-200 flex items-center justify-between">
// // //           <h2 className="text-2xl font-semibold text-gray-900">Submit Proofs</h2>
// // //           <button onClick={() => setShowUpdateModal(false)} className="text-gray-400 hover:text-gray-500">
// // //             <i className="fas fa-times"></i>
// // //           </button>
// // //         </div>

// // //         <div className="p-6 space-y-6">
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">Image Proof</label>
// // //             <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
// // //             <input type="text" value={imageURL} onChange={(e) => { setImageURL(e.target.value); setImageFile(null); }} placeholder="Or enter image URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2" />
// // //           </div>
          
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">Video Proof</label>
// // //             <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, "video")} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
// // //             <input type="text" value={videoURL} onChange={(e) => { setVideoURL(e.target.value); setVideoFile(null); }} placeholder="Or enter video URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2" />
// // //           </div>
          
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
// // //             <textarea value={updateFormData.remarks} onChange={(e) => setUpdateFormData({ ...updateFormData, remarks: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 resize-none" placeholder="Add your remarks here..."></textarea>
// // //           </div>
// // //         </div>

// // //         <div className="flex gap-4 p-6">
// // //           <button onClick={handleUpdate} className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">Submit Proofs</button>
// // //           <button onClick={() => setShowUpdateModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default UpdateProofStatusModal;


// // import React, { useState } from "react";
// // import axios from "axios";

// // interface UpdateProofStatusModalProps {
// //   showUpdateModal: boolean;
// //   setShowUpdateModal: (value: boolean) => void;
// //   updateFormData: { remarks: string };
// //   setUpdateFormData: (data: { remarks: string }) => void;
// //   participantId: string;
// //   projectId: string;
// //   serviceProviderId: string;
// // }

// // const UpdateProofStatusModal: React.FC<UpdateProofStatusModalProps> = ({
// //   showUpdateModal,
// //   setShowUpdateModal,
// //   updateFormData,
// //   setUpdateFormData,
// //   participantId,
// //   projectId,
// //   serviceProviderId,
// // }) => {
// //   const [imageFile, setImageFile] = useState<File | null>(null);
// //   const [imageURL, setImageURL] = useState<string>("");
// //   const [videoFile, setVideoFile] = useState<File | null>(null);
// //   const [videoURL, setVideoURL] = useState<string>("");
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [modalMessage, setModalMessage] = useState("");

// //   const handleFileChange = (
// //     event: React.ChangeEvent<HTMLInputElement>,
// //     type: "image" | "video"
// //   ) => {
// //     const file = event.target.files?.[0] || null;
// //     if (type === "image") {
// //       setImageFile(file);
// //       setImageURL("");
// //     }
// //     if (type === "video") {
// //       setVideoFile(file);
// //       setVideoURL("");
// //     }
// //   };

// //   const handleUpdate = async () => {
// //     if ((!imageFile && !imageURL) && (!videoFile && !videoURL)) {
// //       setModalMessage("Please provide either a file or a URL for both image and video proofs.");
// //       setIsModalOpen(true);
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("participant_id", participantId);
// //     formData.append("project_id", projectId);
// //     formData.append("service_provider_id", serviceProviderId);
// //     formData.append("remark", updateFormData.remarks);

// //     if (imageFile) formData.append("image", imageFile);
// //     if (imageURL) formData.append("image_url", imageURL);
// //     if (videoFile) formData.append("video", videoFile);
// //     if (videoURL) formData.append("video_url", videoURL);

// //     try {
// //       const response = await axios.post("http://your-backend-url/submit", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       setShowUpdateModal(false);
// //       const successDiv = document.createElement("div");
// //       successDiv.className = "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up";
// //       successDiv.textContent = "Proofs submitted successfully!";
// //       document.body.appendChild(successDiv);
// //       setTimeout(() => successDiv.remove(), 3000);
// //     } catch (error) {
// //       console.error("Error submitting proofs:", error);
// //       setModalMessage("Failed to submit proofs. Please try again.");
// //       setIsModalOpen(true);
// //     }
// //   };

// //   if (!showUpdateModal) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-xl w-[95%] sm:w-[500px] mx-4">
// //         <div className="p-6 border-b border-gray-200 flex items-center justify-between">
// //           <h2 className="text-2xl font-semibold text-gray-900">Submit Proofs</h2>
// //           <button onClick={() => setShowUpdateModal(false)} className="text-gray-400 hover:text-gray-500">
// //             <i className="fas fa-times"></i>
// //           </button>
// //         </div>
// //         <div className="p-6 space-y-6">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">Image Proof</label>
// //             <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" />
// //             <input type="text" value={imageURL} onChange={(e) => { setImageURL(e.target.value); setImageFile(null); }} placeholder="Or enter image URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none mt-2" />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">Video Proof</label>
// //             <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, "video")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" />
// //             <input type="text" value={videoURL} onChange={(e) => { setVideoURL(e.target.value); setVideoFile(null); }} placeholder="Or enter video URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none mt-2" />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
// //             <textarea value={updateFormData.remarks} onChange={(e) => setUpdateFormData({ ...updateFormData, remarks: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none h-32 resize-none" placeholder="Add your remarks here..."></textarea>
// //           </div>
// //         </div>
// //         <div className="flex gap-4 p-6">
// //           <button onClick={handleUpdate} className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Submit Proofs</button>
// //           <button onClick={() => setShowUpdateModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UpdateProofStatusModal;

// import React, { useState } from "react";
// import axios from "axios";

// interface UpdateProofStatusModalProps {
//   showUpdateModal: boolean;
//   setShowUpdateModal: (value: boolean) => void;
//   updateFormData: { remarks: string };
//   setUpdateFormData: (data: { remarks: string }) => void;
//   participantId: string;
//   projectId: string;
//   serviceProviderId: string;
// }

// const UpdateProofStatusModal: React.FC<UpdateProofStatusModalProps> = ({
//   showUpdateModal,
//   setShowUpdateModal,
//   updateFormData,
//   setUpdateFormData,
//   participantId,
//   projectId,
//   serviceProviderId,
// }) => {
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imageURL, setImageURL] = useState<string>("");
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [videoURL, setVideoURL] = useState<string>("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   const handleFileChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     type: "image" | "video"
//   ) => {
//     const file = event.target.files?.[0] || null;
//     if (type === "image") {
//       setImageFile(file);
//       setImageURL("");
//     }
//     if (type === "video") {
//       setVideoFile(file);
//       setVideoURL("");
//     }
//   };

//   const handleUpdate = async () => {
//     if ((!imageFile && !imageURL) && (!videoFile && !videoURL)) {
//       setModalMessage("Please provide either a file or a URL for both image and video proofs.");
//       setIsModalOpen(true);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("participant_id", participantId);
//     formData.append("project_id", projectId);
//     formData.append("service_provider_id", serviceProviderId);
//     formData.append("remark", updateFormData.remarks);

//     if (imageFile) formData.append("image", imageFile);
//     if (imageURL) formData.append("image_url", imageURL);
//     if (videoFile) formData.append("video", videoFile);
//     if (videoURL) formData.append("video_url", videoURL);

//     try {
//       const response = await axios.post("http://your-backend-url/submit", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setShowUpdateModal(false);
//       const successDiv = document.createElement("div");
//       successDiv.className = "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up";
//       successDiv.textContent = "Proofs submitted successfully!";
//       document.body.appendChild(successDiv);
//       setTimeout(() => successDiv.remove(), 3000);
//     } catch (error) {
//       console.error("Error submitting proofs:", error);
//       setModalMessage("Failed to submit proofs. Please try again.");
//       setIsModalOpen(true);
//     }
//   };

//   if (!showUpdateModal) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl w-[95%] sm:w-[500px] mx-4">
//         <div className="p-6 border-b border-gray-200 flex items-center justify-between">
//           <h2 className="text-2xl font-semibold text-gray-900">Submit Proofs</h2>
//           <button onClick={() => setShowUpdateModal(false)} className="text-gray-400 hover:text-gray-500">
//             <i className="fas fa-times"></i>
//           </button>
//         </div>
//         <div className="p-6 space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Image Proof</label>
//             <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" />
//             <input type="text" value={imageURL} onChange={(e) => { setImageURL(e.target.value); setImageFile(null); }} placeholder="Or enter image URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none mt-2" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Video Proof</label>
//             <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, "video")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" />
//             <input type="text" value={videoURL} onChange={(e) => { setVideoURL(e.target.value); setVideoFile(null); }} placeholder="Or enter video URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none mt-2" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
//             <textarea value={updateFormData.remarks} onChange={(e) => setUpdateFormData({ ...updateFormData, remarks: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none h-32 resize-none" placeholder="Add your remarks here..."></textarea>
//           </div>
//         </div>
//         <div className="flex gap-4 p-6">
//           <button onClick={handleUpdate} className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Submit Proofs</button>
//           <button onClick={() => setShowUpdateModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProofStatusModal;


import React, { useState } from "react";
import axios from "axios";
import { backend_url } from "../../../../backend_route";

interface UpdateProofStatusModalProps {
  showUpdateModal: boolean;
  setShowUpdateModal: (value: boolean) => void;
  updateFormData: { remarks: string };
  setUpdateFormData: (data: { remarks: string }) => void;
  participantId: string;
  projectId: string;
  serviceProviderId: string;
}

const UpdateProofStatusModal: React.FC<UpdateProofStatusModalProps> = ({
  showUpdateModal,
  setShowUpdateModal,
  updateFormData,
  setUpdateFormData,
  participantId,
  projectId,
  serviceProviderId,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string>("");
  // @ts-ignore
  const [isModalOpen, setIsModalOpen] = useState(false);
  // @ts-ignore
  const [modalMessage, setModalMessage] = useState("");

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    const file = event.target.files?.[0] || null;
    if (type === "image") {
      setImageFile(file);
      setImageURL("");
    }
    if (type === "video") {
      setVideoFile(file);
      setVideoURL("");
    }
  };

  const getWithExpirationCheck = (key: string) => {
    const dataString = localStorage.getItem(key);
    if (!dataString) return null;
  
    const data = JSON.parse(dataString);
    const currentTime = new Date().getTime();
  
    if (currentTime > data.expirationTime) {
      localStorage.removeItem(key); // Remove expired item
      return null; // Item expired
    }
  
    return data.value; // Item is still valid
  };

  const handleUpdate = async () => {
    if ((!imageFile && !imageURL) && (!videoFile && !videoURL)) {
      setModalMessage("Please provide either a file or a URL for both image and video proofs.");
      setIsModalOpen(true);
      return;
    }
  
    const formData = new FormData();
    formData.append("participant_id", participantId);
    formData.append("project_id", projectId);
    formData.append("service_provider_id", serviceProviderId);
    formData.append("remark", updateFormData.remarks);
  
    if (imageFile) formData.append("image", imageFile);
    if (imageURL) formData.append("image_url", imageURL);
    if (videoFile) formData.append("video", videoFile);
    if (videoURL) formData.append("video_url", videoURL);
  
    try {
      await axios.post(`${backend_url}/serviceProviders/submit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getWithExpirationCheck("token")}`,
        },
      });
  
      setShowUpdateModal(false);
  
      const successDiv = document.createElement("div");
      successDiv.className =
        "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up";
      successDiv.textContent = "Proofs submitted successfully!";
      document.body.appendChild(successDiv);
      setTimeout(() => successDiv.remove(), 3000);
  
    } catch (error: any) {
      console.error("Error submitting proofs:", error);
  
      // ✅ Now check status code here
      if (error.response?.status === 403) {
        alert(error.response.data?.error || "Participant is not approved or not enrolled.");
        return;
      }
  
      setModalMessage(error.response?.data?.error || "Failed to submit proofs. Please try again.");
      setIsModalOpen(true);
    }
  };
  

  // const handleUpdate = async () => {
  //   if ((!imageFile && !imageURL) && (!videoFile && !videoURL)) {
  //     setModalMessage("Please provide either a file or a URL for both image and video proofs.");
  //     setIsModalOpen(true);
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("participant_id", participantId);
  //   formData.append("project_id", projectId);
  //   formData.append("service_provider_id", serviceProviderId);
  //   formData.append("remark", updateFormData.remarks);

  //   if (imageFile) formData.append("image", imageFile);
  //   if (imageURL) formData.append("image_url", imageURL);
  //   if (videoFile) formData.append("video", videoFile);
  //   if (videoURL) formData.append("video_url", videoURL);

  //   try {
  //     // @ts-ignore
  //     const response = await axios.post(`${backend_url}/serviceProviders/submit`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${getWithExpirationCheck("token")}`, // Include token
  //       },
  //     });

  //     if(response.status == 403){
  //       alert("Participant is not approved or not enrolled");
  //     }
    

  //     setShowUpdateModal(false);
  //     const successDiv = document.createElement("div");
  //     successDiv.className = "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up";
  //     successDiv.textContent = "Proofs submitted successfully!";
  //     document.body.appendChild(successDiv);
  //     setTimeout(() => successDiv.remove(), 3000);

    
  //   } catch (error : any) {
  //     console.error("Error submitting proofs:", error);
  //     setModalMessage(error.response?.data?.error || "Failed to submit proofs. Please try again.");
  //     setIsModalOpen(true);
  //   }
  // };

  if (!showUpdateModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[95%] sm:w-[500px] mx-4">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Submit Proofs</h2>
          <button onClick={() => setShowUpdateModal(false)} className="text-gray-400 hover:text-gray-500">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image Proof</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" />
            <input type="text" value={imageURL} onChange={(e) => { setImageURL(e.target.value); setImageFile(null); }} placeholder="Or enter image URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none mt-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video Proof</label>
            <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, "video")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" />
            <input type="text" value={videoURL} onChange={(e) => { setVideoURL(e.target.value); setVideoFile(null); }} placeholder="Or enter video URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none mt-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
            <textarea value={updateFormData.remarks} onChange={(e) => setUpdateFormData({ ...updateFormData, remarks: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none h-32 resize-none" placeholder="Add your remarks here..."></textarea>
          </div>
        </div>
        <div className="flex gap-4 p-6">
          <button onClick={handleUpdate} className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Submit Proofs</button>
          <button onClick={() => setShowUpdateModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProofStatusModal;
