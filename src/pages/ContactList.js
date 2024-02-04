import React from "react";
import Contact from "../components/Contact";
import Pagination from "../components/Pagination";

function ContactList({ data, currentPage, fetchContacts }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data?.content?.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={data.totalPages}
        fetchContacts={fetchContacts}
      />
    </div>
  );
}

export default ContactList;
