import { Contact } from "../models/contactModel.js";

async function listContacts(query, currentUser) {
  try {
    const findOptions = {};

    if (query.favorite) {
      findOptions.favorite = query.favorite;
    }

    const contactsQuery = Contact.find({
      ...findOptions,
      owner: currentUser.id,
    });
    const page = query.page ? +query.page : 1;
    const limit = query.limit ? +query.limit : 20;
    const docsToSkip = (page - 1) * limit;

    contactsQuery.skip(docsToSkip).limit(limit);

    const contacts = await contactsQuery;
    return contacts;
  } catch (err) {
    throw err;
  }
}

async function getContactById(contactId, owner) {
  try {
    const contact = await Contact.findOne({ _id: contactId, owner: owner.id });
    return contact;
  } catch (err) {
    throw err;
  }
}

async function removeContact(contactId, owner) {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: contactId,
      owner: owner.id,
    });
    return contact;
  } catch (err) {
    throw err;
  }
}

async function addContact({ name, email, phone }, owner) {
  try {
    const newContact = await Contact.create({
      name: name,
      email: email,
      phone: phone,
      owner: owner.id,
    });

    return newContact;
  } catch (err) {
    throw err;
  }
}

async function updateContactById(contactId, updatedData, owner) {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: owner.id },
      updatedData,
      {
        new: true,
      }
    );
    return updatedContact;
  } catch (err) {
    throw err;
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
