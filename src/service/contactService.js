import axios from "axios";

const API_URL = "http://localhost:8080/api/contacts";

const ContactService = {
  getAllContacts: async (page = 0, size = 10) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  },

  getContactById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching contact by ID:", error);
      throw error;
    }
  },

  createContact: async (contact) => {
    try {
      const response = await axios.post(API_URL, contact);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  },

  updateContact: async (id, contact) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, contact);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  },

  deleteContact: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  },

  uploadPhoto: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("file", file);

      const response = await axios.put(`${API_URL}/upload-photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error uploading photo:", error);
      throw error;
    }
  },

  getPhoto: async (filename) => {
    try {
      const response = await axios.get(`${API_URL}/image/${filename}`, {
        responseType: "arraybuffer",
      });
      return Buffer.from(response.data, "binary").toString("base64");
    } catch (error) {
      console.error("Error fetching photo:", error);
      throw error;
    }
  },
};

export default ContactService;
