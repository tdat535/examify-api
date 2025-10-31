/**
 * @openapi
 * tags:
 *   - name: Dashboard
 *     description: API lấy dữ liệu dashboard cho giáo viên
 */

/**
 * @openapi
 * /api/dashboard/data:
 *   get:
 *     summary: Lấy dữ liệu tổng quan dashboard của giáo viên
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy dữ liệu dashboard thành công
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
 *                   example: "Lấy dữ liệu dashboard thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     teacherName:
 *                       type: string
 *                       example: "Nguyen Van A"
 *                     totalClasses:
 *                       type: integer
 *                       example: 5
 *                     totalExams:
 *                       type: integer
 *                       example: 12
 *       500:
 *         description: Lỗi server
 */

/**
 * @openapi
 * /api/dashboard/classes:
 *   get:
 *     summary: Lấy danh sách 3 lớp gần nhất của giáo viên
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách 3 lớp thành công
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
 *                   example: "Lấy danh sách 3 lớp gần nhất thành công"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       className:
 *                         type: string
 *                         example: "Lớp 12A1"
 *                       classCode:
 *                         type: string
 *                         example: "CL12A1"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-31T07:30:00Z"
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
 */
