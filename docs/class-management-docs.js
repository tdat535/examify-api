/**
 * @openapi
 * tags:
 *   - name: Class Management
 *     description: API quản lý lớp học (CRUD)
 */

/**
 * @openapi
 * /api/class/getAllClass:
 *   get:
 *     summary: Lấy danh sách tất cả lớp học
 *     tags: [Class Management]
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
 *                     $ref: '#/components/schemas/Class'
 *       500:
 *         description: Lỗi server
 */

/**
 * @openapi
 * /api/class/detail/{classId}:
 *   get:
 *     summary: Lấy chi tiết thông tin lớp học theo ID
 *     tags: [Class Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của lớp học
 *     responses:
 *       200:
 *         description: Lấy chi tiết lớp học thành công
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
 *                   example: "Lấy thông tin lớp thành công"
 *                 data:
 *                   $ref: '#/components/schemas/Class'
 *       500:
 *         description: Lỗi server
 */

/**
 * @openapi
 * /api/class/update/{classId}:
 *   put:
 *     summary: Cập nhật thông tin lớp học
 *     tags: [Class Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID lớp cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               className:
 *                 type: string
 *                 example: "Lớp 12A1"
 *               teacherId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cập nhật lớp học thành công
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
 *                   example: "Cập nhật lớp học thành công"
 *       500:
 *         description: Lỗi server
 */

/**
 * @openapi
 * /api/class/delete/{classId}:
 *   delete:
 *     summary: Xóa lớp học theo ID
 *     tags: [Class Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID lớp cần xóa
 *     responses:
 *       200:
 *         description: Xóa lớp học thành công
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
 *                   example: "Xóa lớp học thành công"
 *       500:
 *         description: Lỗi server
 */

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: "teacher01"
 *         email:
 *           type: string
 *           example: "teacher01@gmail.com"
 *     Class:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         className:
 *           type: string
 *           example: "Lớp 12A1"
 *         teacherId:
 *           type: integer
 *           example: 2
 *         teacher:
 *           $ref: '#/components/schemas/User'
 */
