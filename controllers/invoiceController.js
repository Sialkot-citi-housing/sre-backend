const Invoice = require('../models/Invoice');

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = async (req, res) => {
  try {
    const { date, dueDate, customerName, customerPhone, project, items, status, notes, pdfUrl } = req.body;

    // Generate Invoice Number (e.g. INV-001)
    const count = await Invoice.countDocuments();
    const nextNumber = count + 1;
    const invoiceNumber = `INV-${nextNumber.toString().padStart(3, '0')}`;

    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);

    const invoice = new Invoice({
      invoiceNumber,
      date,
      dueDate,
      customerName,
      customerPhone,
      project,
      items,
      totalAmount,
      status,
      pdfUrl,
      notes
    });

    const createdInvoice = await invoice.save();
    res.status(201).json(createdInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({}).populate('project', 'plot').sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update invoice status or pdf URL
// @route   PUT /api/invoices/:id
// @access  Private
const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice) {
      invoice.status = req.body.status || invoice.status;
      
      // If the frontend sends a base64 encoded PDF string, upload it to Cloudinary
      if (req.body.pdfBase64) {
        const cloudinary = require('../config/cloudinary');
        const uploadResponse = await cloudinary.uploader.upload(req.body.pdfBase64, {
          folder: 'sre_invoices',
          resource_type: 'auto',
          public_id: invoice.invoiceNumber
        });
        invoice.pdfUrl = uploadResponse.secure_url;
      } else if (req.body.pdfUrl) {
        invoice.pdfUrl = req.body.pdfUrl;
      }

      const updatedInvoice = await invoice.save();
      res.json(updatedInvoice);
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice) {
      await invoice.deleteOne();
      res.json({ message: 'Invoice removed' });
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice
};
