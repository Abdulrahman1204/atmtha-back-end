/**
 * @swagger
 * components:
 *   schemas:
 *     NoSchema:
 *       type: object
 *     UserRegister:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         passwordAgain:
 *           type: string
 *         gender:
 *           type: string
 *     UserLogin:
 *       type: object
 *       properties:
 *         phoneNumber:
 *           type: string
 *         password:
 *           type: string
 *     AdminRegister:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         gender:
 *           type: string
 *         role:
 *           type: string
 *     UserUpdateSchema:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         gender:
 *           type: string
 *         email:
 *           type: string
 *     Question:
 *       type: object
 *       properties:
 *         imageQuestion:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *             publicId:
 *               type: string
 *         lessonName:
 *           type: string
 *         unitName:
 *           type: string
 *         subjectName:
 *           type: string
 *         question:
 *           type: string
 *         aAnswer:
 *           type: string
 *         bAnswer:
 *           type: string
 *         cAnswer:
 *           type: string
 *         dAnswer:
 *           type: string
 *         correctAnswer:
 *           type: string
 *         unit:
 *           type: string
 *         lesson:
 *           type: string
 *         subject:
 *           type: string
 *         difficulty:
 *           type: string
 *     Lesson:
 *       type: object
 *       properties:
 *         lessonName:
 *           type: string
 *         unitName:
 *           type: string
 *         number:
 *           type: number
 *         unit:
 *           type: string
 *     SideInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *       required:
 *         - name
 *     CreateSubjectInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         side:
 *           type: string
 *         questionDuration:
 *           type: number
 *       required:
 *         - name
 *         - side
 *         - questionDuration
 *     CreateNotificationInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the notification
 *           example: New Notification
 *         body:
 *           type: string
 *           description: The body content of the notification
 *           example: This is a new notification message.
 *         user:
 *           type: string
 *           description: The ID of the user for whom the notification is intended
 *           example: 60fb318c49d5883d6a6e73a2
 *         allUsers:
 *           type: string
 *           description: Flag indicating if the notification is intended for all users
 *           example: ALL
 *       required:
 *         - title
 *         - body
 *         - user
 *     CodeActivateInput:
 *       type: object
 *       properties:
 *         codeNumber:
 *           type: string
 *           description: The code number to activate
 *           example: ABC123
 *       required:
 *         - codeNumber
 *     GenerateCodeInput:
 *       type: object
 *       properties:
 *         expirationDate:
 *           type: string
 *           enum: [شهر, ستة أشهر, سنة]
 *           description: The expiration period of the generated code
 *         side:
 *           type: string
 *           enum: [علمي, أدبي]
 *           description: The side of the code (scientific or literary)
 *         number:
 *           type: integer
 *           description: The number of codes to generate
 *         subject:
 *           type: array
 *           items:
 *             type: string
 *           description: The subject(s) associated with the code
 *         all:
 *           type: id of side
 *           description: Flag indicating if the code is applicable to all subjects
 *         isExam:
 *           type: boolean
 *           description: Flag indicating if the code is for an exam
 *       required:
 *         - expirationDate
 *         - side
 *         - number
 *         - subject
 *     ExamRequest:
 *       type: object
 *       properties:
 *         subjectId:
 *           type: string
 *           description: The ID of the subject for which to generate exam questions
 *         numberOfQuestions:
 *           type: integer
 *           enum: [20, 40]
 *           description: The number of questions to generate (either 20 or 40)
 *       required:
 *         - subjectId
 *         - numberOfQuestions
 *     QuestionVerification:
 *       type: object
 *       properties:
 *         questionId:
 *           type: string
 *           description: The ID of the question to verify
 *         correctAnswer:
 *           type: string
 *           enum: [a, b, c, d]
 *           description: The correct answer for the question
 *       required:
 *         - questionId
 *         - correctAnswer
 *     Message:
 *        type: object
 *        properties:
 *          UserMessage:
 *            type: string
 *          title:
 *            type: string
 *          content:
 *            type: string
 *          phoneNumber:
 *            type: string
 *        required:
 *          - title
 *          - content
 *     Unit:
 *         type: object
 *         properties:
 *           unitName:
 *             type: string
 *             minLength: 2
 *             maxLength: 100
 *           subject:
 *             type: string
 *             format: uuid
 *           number:
 *             type: integer
 *             maximum: 1
 *         required:
 *           - unitName
 *           - subject
 *           - number
 *   Question:
 *        type: object
 *        properties:
 *          imageQuestion:
 *            type: object
 *            properties:
 *              url:
 *                type: string
 *                default: "null"
 *              publicId:
 *                type: string
 *                default: null
 *            default:
 *              url: "null"
 *              publicId: null
 *          lessonName:
 *            type: string
 *          unitName:
 *            type: string
 *          subjectName:
 *            type: string
 *          question:
 *            type: string
 *          aAnswer:
 *            type: string
 *          bAnswer:
 *            type: string
 *          cAnswer:
 *            type: string
 *          dAnswer:
 *            type: string
 *          correctAnswer:
 *            type: string
 *            enum: ["a", "b", "c", "d"]
 *          unit:
 *            type: string
 *            format: uuid
 *          lesson:
 *            type: string
 *            format: uuid
 *          subject:
 *            type: string
 *            format: uuid
 *          difficulty:
 *            type: string
 *            enum: ["سهل", "متوسط", "صعب"]
 *        required:
 *          - question
 *          - aAnswer
 *          - bAnswer
 *          - cAnswer
 *          - dAnswer
 *          - correctAnswer
 *          - unit
 *          - lesson
 *          - subject
 *          - difficulty
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Register user
 *     description: Register a new user account with the provided credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       '200':
 *         description: User successfully registered
 *       '400':
 *         description: Invalid request or user already exists
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Login user
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: User successfully Logged
 *       '400':
 *         description: Invalid request or user already exists
 */

/**
 * @swagger
 * /api/auth/login_admin:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Login admin
 *     description: Login admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: User successfully Logged
 *       '400':
 *         description: Invalid request or user already exists
 */

/**
 * @swagger
 * /api/auth//register_admin:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Login admin
 *     description: Login admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminRegister'
 *     responses:
 *       '200':
 *         description: User successfully Logged
 *       '400':
 *         description: Invalid request or user already exists
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user profile
 *     description: Retrieve the profile of the authenticated user
 *     responses:
 *       '200':
 *         description: Successfully retrieved user profile
 *       '404':
 *         description: User profile not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/profile/admin:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get admin profile
 *     description: Retrieve the profile of the admin user
 *     responses:
 *       '200':
 *         description: Successfully retrieved admin profile
 *       '401':
 *         description: Unauthorized, admin not authenticated
 *       '404':
 *         description: Admin profile not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/profile/profile-photo-upload:
 *   post:
 *     tags:
 *       - Users
 *     summary: Upload profile photo
 *     description: Upload a new profile photo for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Profile photo uploaded successfully
 *       '400':
 *         description: Bad request, invalid image format or missing image
 *       '401':
 *         description: Unauthorized, user not authenticated
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/profile/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user profile by ID
 *     description: Retrieve the profile of a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user profile to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoSchema'
 *       '400':
 *         description: Invalid ID format
 *       '404':
 *         description: User profile not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/profile/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user profile
 *     description: Update the profile of the authenticated user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user profile to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateSchema'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *       '400':
 *         description: Bad request, invalid ID format or missing/invalid request body
 *       '401':
 *         description: Unauthorized, user not authenticated
 *       '404':
 *         description: User profile not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/profile/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user profile
 *     description: Delete the profile of the authenticated user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user profile to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Profile deleted successfully
 *       '400':
 *         description: Bad request, invalid ID format
 *       '401':
 *         description: Unauthorized, user not authenticated or not authorized to delete the profile
 *       '404':
 *         description: User profile not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/centers:
 *   get:
 *     tags:
 *       - Centers
 *     summary: Get all centers
 *     responses:
 *       '200':
 *         description: A list of centers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   governorate:
 *                     type: string
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   __v:
 *                     type: number
 */

/**
 * @swagger
 * /api/centers:
 *   post:
 *     tags:
 *       - Centers
 *     summary: Create a new center
 *     description: Add a new center to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               governorate:
 *                 type: string
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 */

/**
 * @swagger
 *   /api/centers/{id}:
 *   delete:
 *     tags:
 *       - Centers
 *     summary: Delete a center by ID
 *     description: Remove a center from the database based on its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the center to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 */

/**
 * @swagger
 *  /api/centers/{id}:
 *   put:
 *     tags:
 *       - Centers
 *     summary: Update a center by ID
 *     description: Update information of a center based on its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the center to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               governorate:
 *                 type: string
 *               address:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 */

/**
 * @swagger
 * /api/lessons:
 *   get:
 *     tags:
 *       - Lessons
 *     summary: Get all lessons
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lessons:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       lessonName:
 *                         type: string
 *                       unitName:
 *                         type: string
 *                       number:
 *                         type: integer
 *                       unit:
 *                         type: string
 *                       id:
 *                         type: string
 *                 totalCount:
 *                   type: integer
 *                 documentCount:
 *                   type: integer
 */

/**
 * @swagger
 *  /api/lessons:
 *   post:
 *     tags:
 *       - Lessons
 *     summary: Create a new lesson
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lessonName:
 *                 type: string
 *                 example: Lesson2
 *               number:
 *                 type: integer
 *                 example: 1
 *               unit:
 *                 type: string
 *                 example: "65d9a86895074c7d0ac6bc93"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lesson created successfully
 *
 */

/**
 * @swagger
 *   /api/lessons/{id}:
 *   get:
 *     tags:
 *       - Lessons
 *     summary: Get a lesson by ID
 *     description: Retrieve a specific lesson by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the lesson to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lesson'
 *       '404':
 *         description: Lesson not found
 */

/**
 * @swagger
 *   /api/lessons/{id}:
 *   delete:
 *     tags:
 *       - Lessons
 *     summary: Delete a lesson by ID
 *     description: Delete a specific lesson by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the lesson to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lesson deleted successfully
 *       '404':
 *         description: Lesson not found
 */

/**
 * @swagger
 *   /api/lessons/{id}:
 *   put:
 *     tags:
 *       - Lessons
 *     summary: Update a lesson by ID
 *     description: Update a specific lesson by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the lesson to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lessonName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lesson updated successfully
 *       '400':
 *         description: Bad request - Invalid data provided
 *       '404':
 *         description: Lesson not found
 */

/**
 * @swagger
 * /api/sides:
 *   get:
 *     tags:
 *       - Sides
 *     summary: Get all sides
 *     description: Retrieve a list of all sides
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of sides
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NoSchema'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/sides:
 *   post:
 *     tags:
 *       - Sides
 *     summary: Create a new side
 *     description: Create a new side entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SideInput'
 *     responses:
 *       '201':
 *         description: Successfully created side
 *       '400':
 *         description: Bad request, invalid data format
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/sides/{id}:
 *   delete:
 *     tags:
 *       - Sides
 *     summary: Delete a side
 *     description: Delete a side by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the side to delete
 *     responses:
 *       '204':
 *         description: Side deleted successfully
 *       '400':
 *         description: Bad request, invalid ID format
 *       '404':
 *         description: Side not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get all subjects
 *     description: Retrieve a list of all subjects
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NoSchema'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get all subjects
 *     description: Retrieve a list of all subjects with optional pagination and filtering by side ID
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: The number of items per page for pagination
 *       - in: query
 *         name: sideId
 *         schema:
 *           type: string
 *         description: The ID of the side to filter subjects by
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subjects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NoSchema'
 *                 totalCount:
 *                   type: integer
 *                   description: Total count of subjects in the response
 *                 documentCount:
 *                   type: integer
 *                   description: Total count of all subjects in the database
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     tags:
 *       - Subjects
 *     summary: Create a new subject
 *     description: Create a new subject with provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubjectInput'
 *     responses:
 *       '201':
 *         description: Successfully created subject
 *       '400':
 *         description: Bad request, invalid data format
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get a subject by ID
 *     description: Retrieve a single subject by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subject to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved subject
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       '400':
 *         description: Bad request, invalid ID format
 *       '404':
 *         description: Subject not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subjects/{id}:
 *   delete:
 *     tags:
 *       - Subjects
 *     summary: Delete a subject by ID
 *     description: Delete a single subject by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subject to delete
 *     responses:
 *       '204':
 *         description: Subject deleted successfully
 *       '400':
 *         description: Bad request, invalid ID format
 *       '404':
 *         description: Subject not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subjects/{id}:
 *   put:
 *     tags:
 *       - Subjects
 *     summary: Update a subject by ID
 *     description: Update a single subject by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subject to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSubjectInput'
 *     responses:
 *       '200':
 *         description: Subject updated successfully
 *       '400':
 *         description: Bad request, invalid data format
 *       '404':
 *         description: Subject not found
 *       '500':
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     UpdateSubjectInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         side:
 *           type: string
 *         questionDuration:
 *           type: number
 *       required:
 *         - name
 *         - side
 *         - questionDuration
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Get all notifications
 *     description: Retrieve a list of all notifications
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NoSchema'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     tags:
 *       - Notifications
 *     summary: Create a new notification
 *     description: Create a new notification for the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNotificationInput'
 *     responses:
 *       '201':
 *         description: Successfully created notification
 *       '400':
 *         description: Bad request, invalid data format
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     tags:
 *       - Notifications
 *     summary: Delete a notification by ID
 *     description: Delete a single notification by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the notification to delete
 *     responses:
 *       '204':
 *         description: Notification deleted successfully
 *       '400':
 *         description: Bad request, invalid ID format
 *       '404':
 *         description: Notification not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/codes:
 *   get:
 *     tags:
 *       - Codes
 *     summary: Get all codes
 *     description: Retrieve a list of all codes
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of codes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NoSchema'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/codes/packages:
 *   get:
 *     tags:
 *       - Codes
 *     summary: Get all code packages
 *     description: Retrieve a list of all code packages
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of code packages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NoSchema'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/codes/{id}:
 *   get:
 *     tags:
 *       - Codes
 *     summary: Get a code by ID
 *     description: Retrieve a single code by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the code to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoSchema'
 *       '400':
 *         description: Bad request, invalid ID format
 *       '404':
 *         description: Code not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/codes/{id}:
 *   delete:
 *     tags:
 *       - Codes
 *     summary: Delete a code by ID
 *     description: Delete a single code by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the code to delete
 *     responses:
 *       '204':
 *         description: Code deleted successfully
 *       '400':
 *         description: Bad request, invalid ID format
 *       '404':
 *         description: Code not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/codes/code-activate:
 *   post:
 *     tags:
 *       - Codes
 *     summary: Activate a code
 *     description: Activate a code using its number
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CodeActivateInput'
 *     responses:
 *       '200':
 *         description: Code activated successfully
 *       '400':
 *         description: Bad request, invalid data format
 *       '401':
 *         description: Unauthorized, missing or invalid token
 *       '404':
 *         description: Code not found or already activated
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/codes/download-image:
 *   post:
 *     tags:
 *       - Codes
 *     summary: Download an image associated with a code
 *     description: Download an image file associated with a code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CodeActivateInput'
 *     responses:
 *       '200':
 *         description: Image download successful
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       '400':
 *         description: Bad request, invalid data format
 *       '404':
 *         description: Image not found or associated with the provided code
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/codes/generateCode:
 *   post:
 *     tags:
 *       - Codes
 *     summary: Generate QR code
 *     description: Generate a QR code for a specific purpose
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenerateCodeInput'
 *     responses:
 *       '200':
 *         description: QR code generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QRCode'
 *       '400':
 *         description: Bad request, invalid data format
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/exam/have-exam:
 *   get:
 *     tags:
 *       - Exam
 *     summary: Check if user has an exam
 *     description: Check if the user has an upcoming exam
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User has an upcoming exam
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasExam:
 *                   type: boolean
 *                   description: Flag indicating if the user has an upcoming exam
 *       '401':
 *         description: Unauthorized, missing or invalid token
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/exam/generate-exam:
 *   post:
 *     tags:
 *       - Exam
 *     summary: Generate exam questions
 *     description: Generate exam questions for a specific subject
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExamRequest'
 *     responses:
 *       '200':
 *         description: Exam questions generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExamRequest'
 *       '400':
 *         description: Bad request, invalid data format
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/exam/is-question-true:
 *   post:
 *     tags:
 *       - Exam
 *     summary: Verify if question answer is true
 *     description: Verify if the provided answer for the given question is true
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionVerification'
 *     responses:
 *       '200':
 *         description: Question answer verified successfully
 *       '400':
 *         description: Bad request, invalid data format
 *       '401':
 *         description: Unauthorized, missing or invalid token
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/exam/result:
 *   get:
 *     tags:
 *       - Exam
 *     summary: Get exam result
 *     description: Retrieve the result of the exam
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Exam result retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoSchema'
 *       '401':
 *         description: Unauthorized, missing or invalid token
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 *   /api/message/send:
 *   post:
 *     tags:
 *       - Message
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 */

/**
 * @swagger
 * /api/message/user/{id}:
 *     get:
 *       tags:
 *         - Message
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: User ID
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     UserMessage:
 *                       type: string
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 */

/**
 * @swagger
 * /api/message/{id}:
 *     get:
 *       tags:
 *         - Message
 *     summary: Get a message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the message to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 UserMessage:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 */

/**
 * @swagger
 * /api/message/{id}:
 *     delete:
 *       tags:
 *         - Message
 *     summary: Delete a message by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the message to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Message deleted successfully
 *       '404':
 *         description: Message not found
 */

/**
 * @swagger
 * /api/message/{id}:
 *     put:
 *       tags:
 *         - Message
 *     summary: Update a message by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the message to update
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: Updated message content
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *     responses:
 *       '200':
 *         description: Message updated successfully
 *       '404':
 *         description: Message not found
 */

/**
 * @swagger
 * /api/units:
 *     post:
 *       tags:
 *         - Unit
 *     summary: Create a new unit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Unit'
 *       examples:
 *         example1:
 *           value:
 *             unitName: "unit"
 *             number: 1
 *             subject: "65d9a36a72d7d6361584fbf4"
 *     responses:
 *       '200':
 *         description: Created unit successfully
 *       '400':
 *         description: Bad request - Invalid input data
 */

/**
 * @swagger
 * /api/units:
 *     get:
 *       tags:
 *         - Unit
 *     summary: Get unit details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   format: uuid
 *                 unitName:
 *                   type: string
 *                 subject:
 *                   type: string
 *                   format: uuid
 *                 number:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 __v:
 *                   type: integer
 *                 id:
 *                   type: string
 *                   format: uuid
 *               example:
 *                 _id: "65d9a86695074c7d0ac6bc91"
 *                 unitName: "unit"
 *                 subject: "65d9a36a72d7d6361584fbf4"
 *                 number: 1
 *                 createdAt: "2024-02-24T08:27:18.543Z"
 *                 updatedAt: "2024-02-24T08:27:18.543Z"
 *                 __v: 0
 *                 id: "65d9a86695074c7d0ac6bc91"
 */


/**
 * @swagger
 * /api/units/{id}:
 *     get:
 *       tags:
 *         - Unit
 *     summary: Get unit details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the unit to get
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   format: uuid
 *                 unitName:
 *                   type: string
 *                 subject:
 *                   type: string
 *                   format: uuid
 *                 number:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 __v:
 *                   type: integer
 *                 lessons:
 *                   type: array
 *                   items: {}
 *                 id:
 *                   type: string
 *                   format: uuid
 *               example:
 *                 _id: "65d9a86695074c7d0ac6bc91"
 *                 unitName: "unit"
 *                 subject: "65d9a36a72d7d6361584fbf4"
 *                 number: 1
 *                 createdAt: "2024-02-24T08:27:18.543Z"
 *                 updatedAt: "2024-02-24T08:27:18.543Z"
 *                 __v: 0
 *                 lessons: []
 *                 id: "65d9a86695074c7d0ac6bc91"
 */

/**
 * @swagger
 * /api/units/admins:
 *     get:
 *       tags:
 *         - Unit
 *     summary: Get all units for admins
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 units:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         format: uuid
 *                       unitName:
 *                         type: string
 *                       subject:
 *                         type: string
 *                         format: uuid
 *                       number:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       __v:
 *                         type: integer
 *                       id:
 *                         type: string
 *                         format: uuid
 *               totalCount:
 *                 type: integer
 *               documentCount:
 *                 type: integer
 *               example:
 *                 units:
 *                   - _id: "65d9a86c95074c7d0ac6bc9b"
 *                     unitName: "unit"
 *                     subject: "65d9a36a72d7d6361584fbf4"
 *                     number: 1
 *                     createdAt: "2024-02-24T08:27:24.971Z"
 *                     updatedAt: "2024-02-24T08:27:24.971Z"
 *                     __v: 0
 *                     id: "65d9a86c95074c7d0ac6bc9b"
 *                   - _id: "65d9a86b95074c7d0ac6bc99"
 *                     unitName: "unit"
 *                     subject: "65d9a36a72d7d6361584fbf4"
 *                     number: 1
 *                     createdAt: "2024-02-24T08:27:23.933Z"
 *
 */

/**
 * @swagger
 * /api/questions:
 *     post:
 *       tags:
 *         - Question
 *     summary: Create a new question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *       examples:
 *         example1:
 *           value:
 *             question: "Oss%PQGuz ?"
 *             aAnswer: "afe"
 *             bAnswer: "asfew"
 *             cAnswer: "answerC"
 *             dAnswer: "answerD"
 *             correctAnswer: "a"
 *             lesson: "65d9a89595074c7d0ac6bc9e"
 *             subject: "65d9a36a72d7d6361584fbf4"
 *             unit: "65d9a86895074c7d0ac6bc93"
 *             difficulty: "صعب"
 *     responses:
 *       '200':
 *         description: Created question successfully
 *       '400':
 *         description: Bad request - Invalid input data
 */

/**
 * @swagger
 * /api/questions/{id}:
 *     delete:
 *       tags:
 *         - Question
 *     summary: Delete a question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the question to delete
 *     responses:
 *       '200':
 *         description: Question deleted successfully
 *       '404':
 *         description: Question not found
 */

/**
 * @swagger
 * /api/questions/{id}:
 *     put:
 *       tags:
 *         - Question
 *     summary: Update a question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the question to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               unitName:
 *                 type: string
 *             required:
 *               - unitName
 *     responses:
 *       '200':
 *         description: Question updated successfully
 *       '400':
 *         description: Bad request - Invalid input data
 */

/**
 * @swagger
 * /api/questions:
 *     get:
 *       tags:
 *         - Question
 *     summary: Get all questions
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     format: uuid
 *                   imageQuestion:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                       publicId:
 *                         type: string
 *                   lessonName:
 *                     type: string
 *                   unitName:
 *                     type: string
 *                   subjectName:
 *                     type: string
 *                   question:
 *                     type: string
 *                   aAnswer:
 *                     type: string
 *                   bAnswer:
 *                     type: string
 *                   cAnswer:
 *                     type: string
 *                   dAnswer:
 *                     type: string
 *                   correctAnswer:
 *                     type: string
 *                   unit:
 *                     type: string
 *                     format: uuid
 *                   lesson:
 *                     type: string
 *                     format: uuid
 *                   subject:
 *                     type: string
 *                     format: uuid
 *                   difficulty:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   __v:
 *                     type: integer
 *               example:
 *                 - _id: "65d9a8d395074c7d0ac6bccc"
 *                   imageQuestion:
 *                     url: "null"
 *                     publicId: "null"
 *                   lessonName: "Lesson2"
 *                   unitName: "unit"
 *                   subjectName: "كيمياء"
 *                   question: "Oss%PQGuz ?"
 *                   aAnswer: "afe"
 *                   bAnswer: "asfew"
 *                   cAnswer: "answerC"
 *                   dAnswer: "answerD"
 *                   correctAnswer: "a"
 *                   unit: "65d9a86895074c7d0ac6bc93"
 *                   lesson: "65d9a89595074c7d0ac6bc9e"
 *                   subject: "65d9a36a72d7d6361584fbf4"
 *                   difficulty: "صعب"
 *                   createdAt: "2024-02-24T08:29:07.829Z"
 *                   updatedAt: "2024-02-24T08:29:07.829Z"
 *                   __v: 0
 *                 - _id: "65d9a8d395074c7d0ac6bcc7"
 *                   imageQuestion:
 *                     url: "null"
 *                     publicId: "null"
 *                   lessonName: "Lesson2"
 *                   unitName: "unit"
 *                   subjectName: "كيمياء"
 *                   question: "Oss%PQGuz ?"
 *                   aAnswer: "afe"
 *                   bAnswer: "asfew"
 *                   cAnswer: "answerC"
 *                   dAnswer: "answerD"
 *                   correctAnswer: "a"
 *                   unit: "65d9a86895074c7d0ac6bc93"
 *                   lesson: "65d9a89595074c7d0ac6bc9e"
 *                   subject: "65d9a36a72d7d6361584fbf4"
 *                   difficulty: "صعب"
 *                   createdAt: "2024-02-24T08:29:07.524Z"
 *                   updatedAt: "2024-02-24T08:29:07.524Z"
 *                   __v: 0
 */

/**
 * @swagger
 * /api/questions/image/{id}:
 *     delete:
 *       tags:
 *         - Question
 *     summary: Delete question image by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the question image to delete
 *     responses:
 *       '200':
 *         description: Question image deleted successfully
 *       '404':
 *         description: Question image not found
 */