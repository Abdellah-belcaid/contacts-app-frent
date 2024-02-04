import React from "react";
import {
  FaEnvelope,
  FaMapMarkedAlt,
  FaPhone,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Contact({ contact }) {
  const isPhotoAvailable = contact?.photoUrl;

  return (
    <Link
      to={`/contact/${contact.id}`}
      className="hover:bg-gray-200 rounded-lg p-2 transition duration-300 block"
    >
      <div className="bg-white shadow-md rounded-lg overflow-hidden mx-auto h-full">
        <div className="p-4">
          <div className="flex gap-2 items-center mb-2">
            {isPhotoAvailable ? (
              <img
                className="h-12 w-12  object-cover rounded-full"
                src={contact.photoUrl}
                alt={contact.name}
              />
            ) : (
              <FaUserCircle className="text-4xl mr-2 text-gray-600" />
            )}
            <div className="flex flex-col text-center">
              <h2 className="text-md font-semibold">{contact.name}</h2>
              <span className="text-xs text-blue-500 p-0.5 rounded-3xl border bg-gray-100 ">
                {contact.title}
              </span>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <FaEnvelope className="text-lg mr-2 text-gray-500" />
            <p className="text-sm overflow-clip">{contact.email}</p>
          </div>
          <div className="flex items-center mb-2">
            <FaPhone className="text-lg mr-2 text-gray-500" />
            <p className="text-sm">{contact.phone}</p>
          </div>
          <div className="flex items-center mb-2">
            <FaMapMarkedAlt className="text-lg mr-2 text-gray-500" />
            <p className="text-sm">{contact.address}</p>
          </div>

          <div className="flex items-center">
            <span
              className={`px-2 py-1 inline-block text-xs font-semibold rounded-full ${
                contact.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {contact.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Contact;
