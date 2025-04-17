import { AssistanceType, Donor, Donation } from '../models/index.js';

// Get all assistance types
export const getAllAssistanceTypes = async (req, res) => {
    try {
        const assistanceTypes = await AssistanceType.findAll({
            include: [
                {
                    model: Donor,
                    attributes: ['id', 'name', 'email']
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
            count: assistanceTypes.length,
            data: assistanceTypes
        });
    } catch (error) {
        console.error('Error in getAllAssistanceTypes:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching assistance types',
            error: error.message
        });
    }
};

// Get single assistance type by ID
export const getAssistanceTypeById = async (req, res) => {
    try {
        const { id } = req.params;

        const assistanceType = await AssistanceType.findByPk(id, {
            include: [
                {
                    model: Donor,
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Donation,
                    attributes: ['id', 'donationType', 'amount', 'donationDate']
                }
            ]
        });

        if (!assistanceType) {
            return res.status(404).json({
                success: false,
                message: 'Assistance type not found'
            });
        }

        res.status(200).json({
            success: true,
            data: assistanceType
        });
    } catch (error) {
        console.error('Error in getAssistanceTypeById:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching assistance type',
            error: error.message
        });
    }
};

// Create new assistance type
export const createAssistanceType = async (req, res) => {
    try {
        const { name, description, donorId } = req.body;

        // Check if donor exists
        const donor = await Donor.findByPk(donorId);
        if (!donor) {
            return res.status(404).json({
                success: false,
                message: 'Donor not found'
            });
        }

        // Check if assistance type with same name exists for this donor
        const existingType = await AssistanceType.findOne({
            where: {
                name,
                donorId
            }
        });

        if (existingType) {
            return res.status(400).json({
                success: false,
                message: 'An assistance type with this name already exists for this donor'
            });
        }

        const assistanceType = await AssistanceType.create({
            name,
            description,
            donorId
        });

        res.status(201).json({
            success: true,
            message: 'Assistance type created successfully',
            data: assistanceType
        });
    } catch (error) {
        console.error('Error in createAssistanceType:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating assistance type',
            error: error.message
        });
    }
};

// Update assistance type
export const updateAssistanceType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const assistanceType = await AssistanceType.findByPk(id);

        if (!assistanceType) {
            return res.status(404).json({
                success: false,
                message: 'Assistance type not found'
            });
        }

        // Check if user has permission (admin or donor who created the type)
        if (req.user.role !== 'admin' && req.user.id !== assistanceType.donorId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this assistance type'
            });
        }

        // Check if new name conflicts with existing ones
        if (name && name !== assistanceType.name) {
            const existingType = await AssistanceType.findOne({
                where: {
                    name,
                    donorId: assistanceType.donorId,
                    id: { [Op.ne]: id } // Exclude current type
                }
            });

            if (existingType) {
                return res.status(400).json({
                    success: false,
                    message: 'An assistance type with this name already exists for this donor'
                });
            }
        }

        await assistanceType.update({
            name: name || assistanceType.name,
            description: description || assistanceType.description
        });

        res.status(200).json({
            success: true,
            message: 'Assistance type updated successfully',
            data: assistanceType
        });
    } catch (error) {
        console.error('Error in updateAssistanceType:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating assistance type',
            error: error.message
        });
    }
};

// Delete assistance type
export const deleteAssistanceType = async (req, res) => {
    try {
        const { id } = req.params;

        const assistanceType = await AssistanceType.findByPk(id);

        if (!assistanceType) {
            return res.status(404).json({
                success: false,
                message: 'Assistance type not found'
            });
        }

        // Check if user has permission (admin only)
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete assistance types'
            });
        }

        // Check if there are any donations using this assistance type
        const donationsCount = await Donation.count({
            where: { assistanceId: id }
        });

        if (donationsCount > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete assistance type that has associated donations'
            });
        }

        await assistanceType.destroy();

        res.status(200).json({
            success: true,
            message: 'Assistance type deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteAssistanceType:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting assistance type',
            error: error.message
        });
    }
};
