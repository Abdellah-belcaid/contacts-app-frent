// // FileUpload.js
// import React, { useState } from "react";

// function FileUpload({ onFileChange }) {
//   const [file, setFile] = useState(undefined);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     onFileChange(selectedFile);
//   };

//   return (
//     <div>
//       <label htmlFor="file" className=" block text-sm font-medium text-gray-600">
//         Upload Photo
//       </label>
//       <input
//         type="file"
//         id="file"
//         name="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="mt-1 p-2 w-full  border rounded-md focus:outline-none focus:border-blue-500"
//       />
//     </div>
//   );
// }

// export default FileUpload;
