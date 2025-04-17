import { Donor, AssistanceType, Donation } from '../models/index.js';

// Get all donors
export const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.findAll({
            include: [
                {
                    model: AssistanceType,
                    attributes: ['id', 'name', 'description']
                },
                {
                    model: Donation,
                    attributes: ['id', 'donationType', 'amount', 'donationDate']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            count: donors.length,
            data: donors
        });
    } catch (error) {
        console.error('Error in getAllDonors:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching donors',
            error: error.message
        });
    }
};

// Get single donor by ID
export const getDonorById = async (req, res) => {
    try {
        const { id } = req.params;

        const donor = await Donor.findByPk(id, {
            include: [
                {
                    model: AssistanceType,
                    attributes: ['id', 'name', 'description']
                },
                {
                    model: Donation,
                    attributes: ['id', 'donationType', 'amount', 'donationDate'],
                    order: [['donationDate', 'DESC']]
                }
            ]
        });

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: 'Donor not found'
            });
        }

        res.status(200).json({
            success: true,
            data: donor
        });
    } catch (error) {
        console.error('Error in getDonorById:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching donor',
            error: error.message
        });
    }
};

// Create new donor
export const createDonor = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Check if donor with same email exists
        const existingDonor = await Donor.findOne({
            where: { email }
        });

        if (existingDonor) {
            return res.status(400).json({
                success: false,
                message: 'A donor with this email already exists'
            });
        }

        // Create new donor
        const donor = await Donor.create({
            name,
            email,
            phone
        });

        res.status(201).json({
            success: true,
            message: 'Donor created successfully',
            data: donor
        });
    } catch (error) {
        console.error('Error in createDonor:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating donor',
            error: error.message
        });
    }
};

// Update donor
export const updateDonor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        const donor = await Donor.findByPk(id);

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: 'Donor not found'
            });
        }

        // Check if email is being changed and if new email already exists
        if (email && email !== donor.email) {
            const existingDonor = await Donor.findOne({
                where: {
                    email,
                    id: { [Op.ne]: id } // Exclude current donor
                }
            });

            if (existingDonor) {
                return res.status(400).json({
                    success: false,
                    message: 'A donor with this email already exists'
                });
            }
        }

        // Update donor
        await donor.update({
            name: name || donor.name,
            email: email || donor.email,
            phone: phone || donor.phone
        });

        res.status(200).json({
            success: true,
            message: 'Donor updated successfully',
            data: donor
        });
    } catch (error) {
        console.error('Error in updateDonor:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating donor',
            error: error.message
        });
    }
};

// Delete donor
export const deleteDonor = async (req, res) => {
    try {
        const { id } = req.params;

        const donor = await Donor.findByPk(id);

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: 'Donor not found'
            });
        }

        // Check if donor has any donations
        const donationsCount = await Donation.count({
            where: { donorId: id }
        });

        if (donationsCount > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete donor with existing donations'
            });
        }

        // Check if donor has any assistance types
        const assistanceTypesCount = await AssistanceType.count({
            where: { donorId: id }
        });

        if (assistanceTypesCount > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete donor with existing assistance types'
            });
        }

        // Delete donor
        await donor.destroy();

        res.status(200).json({
            success: true,
            message: 'Donor deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteDonor:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting donor',
            error: error.message
        });
    }
};

// Get donor statistics
export const getDonorStats = async (req, res) => {
    try {
        const { id } = req.params;

        const donor = await Donor.findByPk(id);

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: 'Donor not found'
            });
        }

        // Get total donations
        const totalDonations = await Donation.count({
            where: { donorId: id }
        });

        // Get total donation amount
        const totalAmount = await Donation.sum('amount', {
            where: { donorId: id }
        });

        // Get assistance types count
        const assistanceTypesCount = await AssistanceType.count({
            where: { donorId: id }
        });

        // Get recent donations
        const recentDonations = await Donation.findAll({
            where: { donorId: id },
            limit: 5,
            order: [['donationDate', 'DESC']],
            include: [{
                model: AssistanceType,
                attributes: ['name']
            }]
        });

        res.status(200).json({
            success: true,
            data: {
                totalDonations,
                totalAmount: totalAmount || 0,
                assistanceTypesCount,
                recentDonations
            }
        });
    } catch (error) {
        console.error('Error in getDonorStats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching donor statistics',
            error: error.message
        });
    }
};
