import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();

    res.status(200).send(contacts);
  } catch (err) {
    console.log(err.message);
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (contact !== null) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await removeContact(id);

    if (contact !== null) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const createContact = async (req, res) => {
  try {
    const { value } = createContactSchema.validate(req.body);

    const contact = await addContact(value);
    res.status(201).json(contact);
  } catch (err) {
    console.log(err.message);
  }
};

export const updateContact = async (req, res) => {
  try {
    if (req.body.length < 1) {
      res.status(404).json({ msg: "Body must have at least one field" });
    }
    const { id } = req.params;
    const contact = await getContactById(id);
    if (contact !== null) {
      const updatedContact = await updateContactById(id, req.body);
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } catch (err) {
    console.log(err.message);
  }
};
