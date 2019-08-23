var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/users', require('./user/userRoutes'));
router.use('/login', require('./user/login'));
router.use('/requests', require('./request/requestRoutes'));
router.use('/instructors', require('./instructor/instructorRoutes'));
router.use('/students', require('./student/studentRoutes'));
router.use('/instruments', require('./instrument/instrumentRoutes'));
router.use('/qualifications', require('./qualification/qualificationRoutes'));
router.use('/addresses', require('./address/addressRoutes'));
router.use('/payments', require('./payment/paymentRoutes'));
router.use('/reviews', require('./review/reviewRoutes'));
router.use('/recommendations', require('./recommendation/recommendationRoutes'));
router.use('/schedules', require('./schedule/scheduleRoutes'));
router.use('/lessons', require('./lesson/lessonRoutes'));
router.use('/rates', require('./rate/rateRoutes'));
router.use('/messages', require('./message/messageRoutes'));
router.use('/educations', require('./education/educationRoutes'));
router.use('/experiences', require('./experience/experienceRoutes'));
router.use('/parents', require('./parent/parentRoutes'));
router.use('/applications', require('./application/applicationRoutes'));

module.exports = router;
