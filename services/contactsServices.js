import { nanoid } from "nanoid";
import { Contact } from "../models/contactModel.js";

async function listContacts() {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const contact = await Contact.findOne({ _id: contactId });
    return contact;
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const contact = await Contact.findByIdAndDelete({ _id: contactId });
    return contact;
  } catch (err) {
    console.log(err);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const existedContact = await Contact.findOne({ phone: phone });

    if (!existedContact) {
      const newContact = await Contact.create({
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
      });

      return newContact;
    }
    return "There is already a contact with such a phone number.";
  } catch (err) {
    console.log(err);
  }
}

async function updateContactById(contactId, updatedData) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      updatedData,
      {
        new: true,
      }
    );
    return updatedContact;
  } catch (err) {
    console.log(err);
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
