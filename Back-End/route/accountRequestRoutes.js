const express = require('express');
const router = express.Router();

const accountRequestController = require('../controller/accountRequestController');
// Agar authorization middleware use karna hai to yaha lagao
const authMiddleware = require('../auth_Middleware');

router.post('/account-request', accountRequestController.sendAccountRequest);
// Admin routes — authorization middleware lagao agar chahiye to
// router.get('/admin/account-requests', /* authMiddleware, */ accountRequestController.getAllAccountRequests);
router.get('/admin/account-requests', accountRequestController.getAllAccountRequests);

// accountRequestRoutes.js
router.post('/admin/approve-requests/:requestId', authMiddleware, accountRequestController.approveRequest);

router.post('/admin/reject-requests', authMiddleware, accountRequestController.rejectRequest);



module.exports = router;
