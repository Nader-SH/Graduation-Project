import Request from '../models/request.js';
import AssistanceType from '../models/assistanceType.js';
import User from '../models/user.js';
import express from 'express'; // Import express as a whole
const { Response } = express; // Destructure Response from express

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
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Internal server error' });
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
  const { applicantName, nationalId, familyMembersCount, headOfFamilyStatus, location, assistanceTypeId, description } = req.body;
  console.log(req.body);
  try {
    const newRequest = await Request.create({
      applicantName,
      nationalId,
      familyMembersCount,
      headOfFamilyStatus,
      location,
      assistanceTypeId,
      description,
      status: 'pending', // Default status when a request is created
    });

    res.status(201).json(newRequest); // Respond with the created request
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Internal server error' });
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