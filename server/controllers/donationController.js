import { Donation, Donor, AssistanceType, Request } from '../models/index.js';

// Get all donations with related data
export const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll({
            include: [
                {
                    model: Donor,
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: AssistanceType,
                    attributes: ['id', 'name', 'description']
                },
                {
                    model: Request,
                    attributes: ['id', 'applicantName', 'status']
                }
            ],
            order: [['donationDate', 'DESC']]
        });

        res.status(200).json({
            success: true,
            count: donations.length,
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

// Get single donation by ID
export const getDonationById = async (req, res) => {
    try {
        const { id } = req.params;

        const donation = await Donation.findByPk(id, {
            include: [
                {
                    model: Donor,
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: AssistanceType,
                    attributes: ['id', 'name', 'description']
                },
                {
                    model: Request,
                    attributes: ['id', 'applicantName', 'status']
                }
            ]
        });

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
            typeName,
            donorId,
            requestId,
            assistanceId,
            donationType,
            quantity,
            amount,
            deliveryMethod
        } = req.body;

        // Check if request exists and is still open
        const request = await Request.findByPk(requestId);
        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        if (request.status === 'completed' || request.status === 'rejected') {
            return res.status(400).json({
                success: false,
                message: 'Cannot donate to a completed or rejected request'
            });
        }

        // Check if donor exists
        const donor = await Donor.findByPk(donorId);
        if (!donor) {
            return res.status(404).json({
                success: false,
                message: 'Donor not found'
            });
        }

        // Check if assistance type exists
        const assistanceType = await AssistanceType.findByPk(assistanceId);
        if (!assistanceType) {
            return res.status(404).json({
                success: false,
                message: 'Assistance type not found'
            });
        }

        // Create the donation
        const donation = await Donation.create({
            typeName,
            donorId,
            requestId,
            assistanceId,
            donationType,
            quantity,
            amount,
            deliveryMethod,
            donationDate: new Date()
        });

        // If donation is successful, update request status
        await request.update({
            status: 'in-progress'
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
            typeName,
            donationType,
            quantity,
            amount,
            deliveryMethod
        } = req.body;

        const donation = await Donation.findByPk(id);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        // Check if user has permission (admin or donor who created the donation)
        if (req.user.role !== 'admin' && req.user.id !== donation.donorId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this donation'
            });
        }

        await donation.update({
            typeName,
            donationType,
            quantity,
            amount,
            deliveryMethod
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

        // Check if user has permission (admin only)
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete donations'
            });
        }

        // Get the associated request
        const request = await Request.findByPk(donation.requestId);

        await donation.destroy();

        // Update request status if needed
        if (request) {
            const remainingDonations = await Donation.count({
                where: { requestId: request.id }
            });

            if (remainingDonations === 0) {
                await request.update({
                    status: 'pending'
                });
            }
        }

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
