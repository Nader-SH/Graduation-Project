import { Donation } from '../models/index.js';
import { Op } from 'sequelize';

// Get all donations with total amount
export const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll({
            order: [['donationDate', 'DESC']]
        });

        // Calculate total amount
        const totalAmount = donations.reduce((sum, donation) => {
            return sum + (parseFloat(donation.amount) || 0);
        }, 0);

        res.status(200).json({
            success: true,
            count: donations.length,
            totalAmount: totalAmount.toFixed(2),
            data: donations
        });
    } catch (error) {
        console.error('Error in getAllDonations:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching donations',
            error: error.message
        });
    }
};

// Get donations summary (total count and amount)
export const getDonationsSummary = async (req, res) => {
    try {
        const donations = await Donation.findAll();
        
        const totalCount = donations.length;
        const totalAmount = donations.reduce((sum, donation) => {
            return sum + (parseFloat(donation.amount) || 0);
        }, 0);

        // Calculate donations by type
        const donationsByType = donations.reduce((acc, donation) => {
            acc[donation.donationType] = (acc[donation.donationType] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json({
            success: true,
            data: {
                totalDonations: totalCount,
                totalAmount: totalAmount.toFixed(2),
                donationsByType,
                recentDonations: donations.slice(0, 5) // Get 5 most recent donations
            }
        });
    } catch (error) {
        console.error('Error in getDonationsSummary:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching donations summary',
            error: error.message
        });
    }
};

// Get single donation by ID
export const getDonationById = async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findByPk(id);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        res.status(200).json({
            success: true,
            data: donation
        });
    } catch (error) {
        console.error('Error in getDonationById:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching donation',
            error: error.message
        });
    }
};

// Create new donation
export const createDonation = async (req, res) => {
    try {
        const {
            amount,
            donationType,
            paymentMethod,
            donorName,
            donorEmail,
            donorPhone,
            message,
            isAnonymous
        } = req.body;

        // Validate required fields
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid amount greater than 0'
            });
        }

        if (!donorName || !donorEmail || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(donorEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        const donation = await Donation.create({
            amount: parseFloat(amount),
            donationType,
            paymentMethod,
            donorName,
            donorEmail,
            donorPhone,
            message,
            isAnonymous,
            status: 'pending',
            donationDate: new Date()
        });

        res.status(201).json({
            success: true,
            message: 'Donation created successfully',
            data: donation
        });
    } catch (error) {
        console.error('Error in createDonation:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating donation',
            error: error.message
        });
    }
};

// Update donation
export const updateDonation = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            amount,
            donationType,
            paymentMethod,
            donorName,
            donorEmail,
            donorPhone,
            message,
            isAnonymous,
            status
        } = req.body;

        const donation = await Donation.findByPk(id);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        // Validate amount if provided
        if (amount && (isNaN(amount) || amount <= 0)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid amount greater than 0'
            });
        }

        // Validate email if provided
        if (donorEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(donorEmail)) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide a valid email address'
                });
            }
        }

        await donation.update({
            amount: amount ? parseFloat(amount) : donation.amount,
            donationType: donationType || donation.donationType,
            paymentMethod: paymentMethod || donation.paymentMethod,
            donorName: donorName || donation.donorName,
            donorEmail: donorEmail || donation.donorEmail,
            donorPhone: donorPhone || donation.donorPhone,
            message: message || donation.message,
            isAnonymous: isAnonymous !== undefined ? isAnonymous : donation.isAnonymous,
            status: status || donation.status
        });

        res.status(200).json({
            success: true,
            message: 'Donation updated successfully',
            data: donation
        });
    } catch (error) {
        console.error('Error in updateDonation:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating donation',
            error: error.message
        });
    }
};

// Delete donation
export const deleteDonation = async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findByPk(id);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        await donation.destroy();

        res.status(200).json({
            success: true,
            message: 'Donation deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteDonation:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting donation',
            error: error.message
        });
    }
};
