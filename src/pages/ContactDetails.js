import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
import { useParams } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import ContactService from "../service/contactService";

function ContactDetails() {
  const { id } = useParams();
  const [file, setFile] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    title: "",
    phone: "",
    address: "",
    status: "",
    photoUrl: "",
  });

  const fetchContactDetails = async (id) => {
    try {
      const contact = await ContactService.getContactById(id);
      setContact(contact);
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  };

  useEffect(() => {
    fetchContactDetails(id);
  }, [id, file]);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      // Call ContactService to update contact details
      await ContactService.updateContact(id, contact);
      // Optionally, fetch updated details again
      fetchContactDetails(id);
    } catch (error) {
      console.error("Error updating contact details:", error);
    }
  };

  const handleFileChange = async (selectedFile) => {
    setFile(selectedFile);
  };

  const updatePhoto = async () => {
    if (file) {
      try {
        // Call ContactService to update contact photo
        await ContactService.uploadPhoto(id, file);
        // Optionally, fetch updated details again
        fetchContactDetails(id);
        // Reset FileUploader state
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error updating contact photo:", error);
      }
    }
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setContact((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div>
      {contact && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 m-4">
          {/* Card for updating contact photo */}
          <div className="col-span-1 md:col-span-4 h-fit w-full bg-slate-100 shadow-md rounded-lg overflow-hidden mx-auto p-4">
            <div className="flex gap-2 h-full p-1 border-2 border-dashed border-sky-400 rounded-md items-center ">
              {contact?.photoUrl ? (
                <img
                  className="h-32 w-32  object-cover rounded-md"
                  src={`${contact.photoUrl}?${new Date().getTime()}`}
                  alt={contact.name}
                />
              ) : (
                <FaUserCircle className="text-4xl mr-2 text-gray-600" />
              )}
              <div className="flex flex-col w-full m-2 p-2 text-center">
                <h2 className="text-md font-semibold">{contact.name}</h2>
                {/* File upload input */}
                <FileUploader
                  onFileChange={handleFileChange}
                  isSubmitted={isSubmitted}
                  resetSubmit={() => setIsSubmitted(false)}
                />
                <button
                  onClick={updatePhoto}
                  className="flex gap-1 bg-purple-300 text-slate-700 rounded-lg p-1 text-center justify-center items-center font-semibold hover:bg-purple-600"
                >
                  <GrDocumentUpdate />
                  update photo
                </button>
              </div>
            </div>
          </div>

          {/* Card for updating contact details */}
          <div className="col-span-1 md:col-span-8 w-full bg-slate-100 shadow-md rounded-lg overflow-hidden mx-auto p-4">
            <h2 className="text-lg font-semibold mb-4">
              Update Contact Details
            </h2>
            <form onSubmit={handleUpdateDetails}>
              {/* Form fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contact.name}
                    onChange={handleDetailsChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contact.email}
                    onChange={handleDetailsChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={contact.title}
                    onChange={handleDetailsChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={contact.phone}
                    onChange={handleDetailsChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={contact.address}
                    onChange={handleDetailsChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={contact.status}
                    onChange={handleDetailsChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 focus:outline-none"
                  >
                    update contact
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactDetails;
