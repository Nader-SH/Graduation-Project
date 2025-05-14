import { Request, Donation, Expense, sequelize } from '../models/index.js';
import { Op } from 'sequelize';

// Get all donations
export const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll({
            where: { status: 'completed' },
            include: [{
                model: Request,
                as: 'request',
                attributes: ['id', 'applicantName', 'assistanceType']
            }],
            order: [['createdAt', 'DESC']]
        });

        const totalDonations = donations.reduce((sum, donation) => sum + parseFloat(donation.amount), 0);

        res.json({
            totalDonations,
            donations
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donations', error: error.message });
    }
};

// Add a new donation
export const addDonation = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { requestId, amount, ...donationData } = req.body;
        
        // Find the request
        const request = await Request.findByPk(requestId);
        if (!request) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Request not found' });
        }

        // Create the donation
        const donation = await Donation.create({
            ...donationData,
            amount,
            status: 'completed',
            requestId
        }, { transaction });

        // Update request's donation amount
        const newDonationAmount = parseFloat(request.donationAmount || 0) + parseFloat(amount);
        await request.update({
            donationAmount: newDonationAmount
        }, { transaction });

        await transaction.commit();

        res.status(201).json({
            donation,
            request: {
                id: request.id,
                donationAmount: newDonationAmount
            }
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error creating donation', error: error.message });
    }
};

// Add a new expense
export const addExpense = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { requestId, amount, description } = req.body;
        
        // Find the request
        const request = await Request.findByPk(requestId);
        if (!request) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Request not found' });
        }

        // Get all donations and sum their amounts
        const allDonations = await Donation.findAll();
        console.log("allDonations", allDonations);
        
        const totalDonations = allDonations.reduce((sum, donation) => {
            return sum + parseFloat(donation.amount || 0);
        }, 0);
        console.log("totalDonationsdddddddddddddddddddddd", allDonations.reduce((sum, donation) => {
            return sum + parseFloat(donation.amount || 0);
        }, 0));
        // Calculate total expenses for this request
        const totalExpenses = await Expense.sum('amount', {
            where: { 
                requestId,
                status: 'completed'
            }
        });

        // Calculate available amount
        const availableAmount = totalDonations - (totalExpenses || 0);
        
        if (parseFloat(amount) > availableAmount) {
            await transaction.rollback();
            return res.status(400).json({ 
                message: 'Insufficient funds',
                availableAmount: availableAmount.toFixed(2),
                totalDonations: totalDonations.toFixed(2),
                totalExpenses: (totalExpenses || 0).toFixed(2)
            });
        }

        // Create the expense
        const expense = await Expense.create({
            requestId,
            amount,
            description,
            status: 'completed'
        }, { transaction });

        await transaction.commit();

        res.status(201).json({
            expense,
            request: {
                id: request.id,
                totalDonations: totalDonations.toFixed(2),
                totalExpenses: ((totalExpenses || 0) + parseFloat(amount)).toFixed(2),
                remainingAmount: (availableAmount - parseFloat(amount)).toFixed(2)
            }
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error creating expense', error: error.message });
    }
};

// Get request financial summary
export const getRequestFinancialSummary = async (req, res) => {
    try {
        const { requestId } = req.params;
        
        const request = await Request.findByPk(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        const totalDonations = await Donation.sum('amount', {
            where: { 
                requestId,
                status: 'completed'
            }
        });

        const totalExpenses = await Expense.sum('amount', {
            where: { 
                requestId,
                status: 'completed'
            }
        });

        const expenses = await Expense.findAll({
            where: { requestId },
            order: [['createdAt', 'DESC']]
        });

        res.json({
            requestId,
            totalDonations: totalDonations || 0,
            totalExpenses: totalExpenses || 0,
            remainingAmount: (totalDonations || 0) - (totalExpenses || 0),
            expenses
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching financial summary', error: error.message });
    }
};

// Get donation statistics
export const getDonationStatistics = async (req, res) => {
    try {
        const totalDonations = await Donation.sum('amount', {
            where: { status: 'completed' }
        });

        const totalExpenses = await Expense.sum('amount', {
            where: { status: 'completed' }
        });

        const monthlyDonations = await Donation.findAll({
            where: { status: 'completed' },
            attributes: [
                [sequelize.fn('date_trunc', 'month', sequelize.col('donationDate')), 'month'],
                [sequelize.fn('sum', sequelize.col('amount')), 'total']
            ],
            group: [sequelize.fn('date_trunc', 'month', sequelize.col('donationDate'))],
            order: [[sequelize.fn('date_trunc', 'month', sequelize.col('donationDate')), 'DESC']]
        });

        const monthlyExpenses = await Expense.findAll({
            where: { status: 'completed' },
            attributes: [
                [sequelize.fn('date_trunc', 'month', sequelize.col('expenseDate')), 'month'],
                [sequelize.fn('sum', sequelize.col('amount')), 'total']
            ],
            group: [sequelize.fn('date_trunc', 'month', sequelize.col('expenseDate'))],
            order: [[sequelize.fn('date_trunc', 'month', sequelize.col('expenseDate')), 'DESC']]
        });

        res.json({
            totalDonations: totalDonations || 0,
            totalExpenses: totalExpenses || 0,
            remainingAmount: (totalDonations || 0) - (totalExpenses || 0),
            monthlyDonations,
            monthlyExpenses
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donation statistics', error: error.message });
    }
}; 