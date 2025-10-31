/**
 * @openapi
 * tags:
 *   - name: StudentClass
 *     description: API quản lý lớp học cho học sinh
 */

/**
 * @openapi
 * /api/student/join:
 *   post:
 *     summary: Học sinh tham gia lớp bằng mã lớp
 *     tags: [StudentClass]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: integer
 *                 example: 5
 *               classCode:
 *                 type: string
 *                 example: "CLS2025A"
 *     responses:
 *       200:
 *         description: Tham gia lớp thành công
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
 *                   example: 'Tham gia lớp "Toán 12" thành công'
 */

/**
 * @openapi
 * /api/student/getClasses:
 *   get:
 *     summary: Lấy danh sách lớp học sinh tham gia
 *     tags: [StudentClass]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách lớp học thành công
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
 *                   example: "Lấy danh sách lớp học thành công"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       className:
 *                         type: string
 *                       classCode:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       teacher:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           username:
 *                             type: string
 *                           email:
 *                             type: string
 */
