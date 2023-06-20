const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");
//@des Get all contacts
//@routes GET /api/contact
//access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@des Create New contact
//@routes POST /api/contact
//access public
const createContact = asyncHandler(async(req, res) => {
    console.log("the request body is", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contacts = await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(contacts);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@des update contact
//@routes PUT /api/contact/:id
//access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

//@des get contact
//@routes GET /api/contact/:id
//access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await contact.remove();
    res.status(200).json(contact);
});


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };