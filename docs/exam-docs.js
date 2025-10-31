/**
 * @openapi
 * tags:
 *   - name: Exam
 *     description: API quản lý bài thi, câu hỏi và nộp bài
 */

/**
 * @openapi
 * /api/exam/create-exam:
 *   post:
 *     summary: Tạo đề thi mới
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Đề thi Toán 12"
 *               duration:
 *                 type: integer
 *                 example: 60
 *               quantityQuestion:
 *                 type: integer
 *                 example: 20
 *               classId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Tạo đề thi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tạo đề thi thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     examId:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     duration:
 *                       type: integer
 *                     quantityQuestion:
 *                       type: integer
 *                     classId:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 */

/**
 * @openapi
 * /api/exam/add-question/{examId}:
 *   post:
 *     summary: Thêm câu hỏi và đáp án vào đề thi
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID đề thi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionList:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                       example: "2 + 2 = ?"
 *                     score:
 *                       type: number
 *                       example: 1
 *                     answers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           content:
 *                             type: string
 *                             example: "4"
 *                     correctAnswerIndex:
 *                       type: integer
 *                       example: 4
 *     responses:
 *       200:
 *         description: Thêm câu hỏi và đáp án thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Thêm câu hỏi và đáp án thành công"
 */

/**
 * @openapi
 * /api/exam/getExamsByClass/{classId}:
 *   get:
 *     summary: Lấy danh sách bài thi theo lớp
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID lớp
 *     responses:
 *       200:
 *         description: Lấy danh sách bài thi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Lấy danh sách bài thi thành công"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       duration:
 *                         type: integer
 *                       quantityQuestion:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */

/**
 * @openapi
 * /api/exam/examDetailForTeacher/{id}:
 *   get:
 *     summary: Lấy chi tiết đề thi cho giáo viên (có câu hỏi và đáp án)
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID đề thi
 *     responses:
 *       200:
 *         description: Lấy đề thi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     duration:
 *                       type: integer
 *                     Questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           content:
 *                             type: string
 *                           score:
 *                             type: number
 *                           Answers:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                 content:
 *                                   type: string
 *                                 correct:
 *                                   type: boolean
 */

/**
 * @openapi
 * /api/exam/examDetailForStudent/{id}:
 *   get:
 *     summary: Lấy chi tiết đề thi cho học sinh (không có đáp án đúng)
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID đề thi
 *     responses:
 *       200:
 *         description: Lấy đề thi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     duration:
 *                       type: integer
 *                     Questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           content:
 *                             type: string
 *                           score:
 *                             type: number
 *                           Answers:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                 content:
 *                                   type: string
 */

/**
 * @openapi
 * /api/exam/submit-exam/{examId}:
 *   post:
 *     summary: Nộp bài thi của học sinh
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID đề thi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: integer
 *                     answerId:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Nộp bài thi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     examId:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     score:
 *                       type: number
 *                     submitAt:
 *                       type: string
 *                       format: date-time
 */

/**
 * @openapi
 * /api/exam/exam-results:
 *   get:
 *     summary: Lấy kết quả thi của học sinh
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy kết quả thi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       examId:
 *                         type: integer
 *                       score:
 *                         type: number
 *                       submitAt:
 *                         type: string
 *                         format: date-time
 *                       ExamTest:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 */
