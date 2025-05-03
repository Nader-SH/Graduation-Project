import Request from '../models/request.js';
import AssistanceType from '../models/assistanceType.js';
import User from '../models/user.js';
import express from 'express'; // Import express as a whole
const { Response } = express; // Destructure Response from express
import { Donation } from '../models/index.js';

// Get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Return only the array
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error in getAllRequests:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching requests',
      error: error.message
    });
  }
};

// Get request by ID
export const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Error in getRequestById:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching request',
      error: error.message
    });
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
      description,
      assistanceType
    } = req.body;

    // Check if user already has a pending request
    const existingRequest = await Request.findOne({
      where: {
        nationalId,
        status: 'pending'
      }
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending request'
      });
    }

    const request = await Request.create({
      applicantName,
      nationalId,
      familyMembersCount,
      headOfFamilyStatus,
      location,
      description,
      assistanceType,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Request created successfully',
      data: request
    });
  } catch (error) {
    console.error('Error in createRequest:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating request',
      error: error.message
    });
  }
};

// Update request
export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      applicantName,
      nationalId,
      familyMembersCount,
      headOfFamilyStatus,
      location,
      description
    } = req.body;

    const request = await Request.findByPk(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Check if user owns the request or is admin
    if (req.user.role !== 'admin' && req.user.id !== request.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this request'
      });
    }

    // Don't allow updates if request is already approved or completed
    if (request.status === 'approved' || request.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update approved or completed requests'
      });
    }

    await request.update({
      applicantName,
      nationalId,
      familyMembersCount,
      headOfFamilyStatus,
      location,
      description
    });

    res.status(200).json({
      success: true,
      message: 'Request updated successfully',
      data: request
    });
  } catch (error) {
    console.error('Error in updateRequest:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating request',
      error: error.message
    });
  }
};

// Delete request
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findByPk(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Check if user owns the request or is admin
    if (req.user.role !== 'admin' && req.user.id !== request.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this request'
      });
    }

    // Check if request has associated donations
    const donationsCount = await Donation.count({
      where: { requestId: id }
    });

    if (donationsCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete request with associated donations'
      });
    }

    await request.destroy();

    res.status(200).json({
      success: true,
      message: 'Request deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteRequest:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting request',
      error: error.message
    });
  }
};

// Update request status
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await Request.findByPk(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Only admin can update status
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update request status'
      });
    }

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    await request.update({ status });

    res.status(200).json({
      success: true,
      message: 'Request status updated successfully',
      data: request
    });
  } catch (error) {
    console.error('Error in updateRequestStatus:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating request status',
      error: error.message
    });
  }
}; 