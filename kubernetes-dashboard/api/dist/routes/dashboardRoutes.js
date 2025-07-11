"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// dashboard-api/src/routes/dashboardRoutes.ts
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const router = (0, express_1.Router)();
router.get('/widgets', dashboardController_1.getDashboardWidgets);
exports.default = router;
