'use strict';

const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const exoController = require('../controllers/exoController');

const router = express.Router();

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    success: false,
    error: 'Validation failed.',
    details: errors.array(),
  });
}

/**
 * GET /api/ml-playground/exos
 * List available exercises with pagination.
 */
router.get(
  '/exos',
  [
    query('limit').optional().isInt({ min: 1, max: 200 }),
    query('offset').optional().isInt({ min: 0 }),
  ],
  handleValidationErrors,
  exoController.getAllExercises
);

/**
 * GET /api/ml-playground/exos/:exoId
 * Fetch exercise metadata, config and tutorial steps.
 */
router.get(
  '/exos/:exoId',
  [param('exoId').isInt({ min: 0 }).withMessage('exoId must be a non-negative integer')],
  handleValidationErrors,
  exoController.getExerciseById
);

/**
 * GET /api/ml-playground/exos/:exoId/progress/:userId
 * Retrieve one user progress for a specific exercise.
 */
router.get(
  '/exos/:exoId/progress/:userId',
  [
    param('exoId').isInt({ min: 0 }).withMessage('exoId must be a non-negative integer'),
    param('userId').isString().trim().notEmpty().withMessage('userId is required'),
  ],
  handleValidationErrors,
  exoController.getUserProgress
);

/**
 * POST /api/ml-playground/exos/:exoId/progress
 * Save or update user progress on an exercise.
 */
router.post(
  '/exos/:exoId/progress',
  [
    param('exoId').isInt({ min: 0 }).withMessage('exoId must be a non-negative integer'),
    body('user_id').isString().trim().notEmpty().withMessage('user_id is required'),
    body('status').optional().isIn(['IN_PROGRESS', 'COMPLETED', 'FAILED']),
    body('current_step').optional().isInt({ min: 0 }),
    body('score_details').optional().isObject().withMessage('score_details must be an object'),
  ],
  handleValidationErrors,
  exoController.saveUserProgress
);

module.exports = router;
