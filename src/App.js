// App.js
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ContactDetails from "./pages/ContactDetails";
import ContactList from "./pages/ContactList";
import ContactService from "./service/contactService";

const notify = (msg) => toast.success(msg);

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [nbrOfContacts, setNbrOfContacts] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchContacts = async (page = 0, size = 3) => {
    try {
      setCurrentPage(page);
      const response = await ContactService.getAllContacts(page, size);
      setData(response);
      setNbrOfContacts(response.totalElements);
      console.log("data : ", response);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    console.log("inside use effect ");
    fetchContacts();
  }, []); // The empty dependency array ensures the effect runs only once, similar to componentDidMount

  const toggleModal = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  const addContact = async (newContact, file) => {
    try {
      // Call the ContactService to save the new contact
      const addedContact = await ContactService.createContact(newContact);

      // Check if a file is provided
      if (file && addedContact) {
        // Upload the photo after successfully saving the contact
        const response = await ContactService.uploadPhoto(
          addedContact.id,
          file
        );
      }

      // Update the success message
      notify(`Contact "${addedContact.name}" added successfully!`);

      // Close the modal after adding a new contact
      toggleModal(false);

      // Fetch contacts again to update the list
      fetchContacts();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <BrowserRouter>
      <div className="m-1 flex flex-col scrollbar-hide">
        {/* Header */}
        <Header toggleModal={toggleModal} nbrOfContacts={nbrOfContacts} />

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />

          <Route
            path="/contacts"
            element={
              <ContactList
                data={data}
                currentPage={currentPage}
                fetchContacts={fetchContacts}
              />
            }
          />
          <Route path="/contact/:id" element={<ContactDetails />} />
        </Routes>
        {/* End of Main Content */}

        {/* Modal Component */}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => toggleModal(false)}
            addContact={addContact}
          />
        )}
        <Toaster />
        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
