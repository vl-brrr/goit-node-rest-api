import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts(req.query, req.user);
    console.log(contacts);

    res.status(200).send(contacts);
  } catch (err) {
    next(err);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id, req.user);

    if (contact !== null && contact.owner.toString() === req.user.id) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await removeContact(id, req.user);

    if (contact !== null && contact.owner.toString() === req.user.id) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } catch (err) {
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { value } = createContactSchema.validate(req.body);

    const contact = await addContact(value, req.user);
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    if (req.body.length < 1) {
      res.status(404).json({ msg: "Body must have at least one field" });
    }
    const { id } = req.params;
    const contact = await getContactById(id, req.user);
    if (contact !== null && contact.owner.toString() === req.user.id) {
      const updatedContact = await updateContactById(id, req.body, req.user);
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } catch (err) {
    next(err);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id, req.user);
    if (contact !== null && contact.owner.toString() === req.user.id) {
      const updatedContact = await updateContactById(id, req.body, req.user);
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } catch (err) {
    next(err);
  }
};
