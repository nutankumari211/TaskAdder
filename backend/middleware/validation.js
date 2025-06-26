const { body, validationResult } = require('express-validator');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed',
      errors: errors.array() 
    });
  }
  next();
};

// User registration validation
const validateRegistration = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Task creation/update validation
const validateTask = [
  body('taskName')
    .notEmpty()
    .withMessage('Task name is required')
    .trim(),
  body('dueDate')
    .isISO8601()
    .withMessage('Please enter a valid due date'),
  body('description')
    .optional()
    .trim(),
  handleValidationErrors
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateTask,
  handleValidationErrors
}; 