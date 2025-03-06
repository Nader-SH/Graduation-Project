import Request from '../models/request.js';
import AssistanceType from '../models/assistanceType.js';
import User from '../models/user.js';

// Get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({
      include: [
        { model: AssistanceType, as: 'assistanceType' },
        { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }
      ]
    });
    
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error getting requests:', error);
    res.status(500).json({ message: 'Failed to get requests', error: error.message });
  }
};

// Get request by ID
export const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const request = await Request.findByPk(id, {
      include: [
        { model: AssistanceType, as: 'assistanceType' },
        { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }
      ]
    });
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    res.status(200).json(request);
  } catch (error) {
    console.error('Error getting request:', error);
    res.status(500).json({ message: 'Failed to get request', error: error.message });
  }
};

// Create new request
export const createRequest = async (req, res) => {
  try {
    const {
      applicantName,
      nationalId,
      familyMembersCount,
      headOfFamilyStatus,
      location,
      assistanceTypeId,
      userId
    } = req.body;
    
    // Set default userId if not provided
    const finalUserId = userId || 1; // Default to user ID 1 if not authenticated
    
    // Validate assistanceTypeId exists
    const assistanceType = await AssistanceType.findByPk(assistanceTypeId);
    if (!assistanceType) {
      return res.status(400).json({ message: 'Invalid assistance type' });
    }
    
    const newRequest = await Request.create({
      applicantName,
      nationalId,
      familyMembersCount,
      headOfFamilyStatus,
      location,
      status: 'pending', // Default status
      userId: finalUserId,
      assistanceTypeId
    });
    
    res.status(201).json({
      message: 'Request created successfully',
      request: newRequest
    });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Failed to create request', error: error.message });
  }
};

// Update request status
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'approved', 'rejected', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    
    const request = await Request.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    request.status = status;
    await request.save();
    
    res.status(200).json({
      message: 'Request status updated successfully',
      request
    });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Failed to update request status', error: error.message });
  }
}; 