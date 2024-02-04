import React from "react";
import { FaUserPlus } from "react-icons/fa";

function Header({ toggleModal, nbrOfContacts }) {
  return (
    <header className="bg-blue-100 p-3 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-xl font-semibold text-gray-800">
              Contacts List ({nbrOfContacts})
            </div>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li className="text-gray-600 hover:text-gray-800 transition duration-300">
                <button
                  onClick={() => toggleModal(true)}
                  className="flex items-center justify-center"
                >
                  <FaUserPlus className="mr-1" />
                </button>
              </li>
              <li className="text-gray-600 hover:text-gray-800 transition duration-300">
                <a href="/about">About</a>
              </li>
              <li className="text-gray-600 hover:text-gray-800 transition duration-300">
                <a href="/contacts">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
