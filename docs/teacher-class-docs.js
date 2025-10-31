/**
 * @openapi
 * tags:
 *   - name: TeacherClass
 *     description: API quản lý lớp học và thông tin giáo viên
 */

/**
 * @openapi
 * /api/teacher-class/createClass:
 *   post:
 *     summary: Tạo lớp học mới
 *     tags: [TeacherClass]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               className:
 *                 type: string
 *                 example: "Toán 12"
 *     responses:
 *       200:
 *         description: Tạo lớp học thành công
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
 *                   example: "Tạo lớp học thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     className:
 *                       type: string
 *                     classCode:
 *                       type: string
 *                     teacherId:
 *                       type: integer
 */

/**
 * @openapi
 * /api/teacher-class/getClasses:
 *   get:
 *     summary: Lấy danh sách lớp của giáo viên
 *     tags: [TeacherClass]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách lớp thành công
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
 *                   example: "Lấy danh sách lớp thành công"
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
 *                       teacherId:
 *                         type: integer
 */

/**
 * @openapi
 * /api/teacher-class/getStudentsInClass/{classId}:
 *   get:
 *     summary: Lấy danh sách học sinh trong lớp
 *     tags: [TeacherClass]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy danh sách học sinh thành công
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
 *                   example: "Lấy danh sách học sinh theo lớp"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 */

/**
 * @openapi
 * /api/teacher-class/deleteStudent:
 *   delete:
 *     summary: Xóa học sinh khỏi lớp
 *     tags: [TeacherClass]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId:
 *                 type: integer
 *               studentId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Xóa học sinh thành công
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
 *                   example: "Xóa học sinh khỏi lớp thành công"
 */

/**
 * @openapi
 * /api/teacher-class/editProfile:
 *   put:
 *     summary: Cập nhật thông tin giáo viên
 *     tags: [TeacherClass]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               realName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thông tin giáo viên thành công
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
 *                   example: "Cập nhật thông tin giáo viên thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         username:
 *                           type: string
 *                         realName:
 *                           type: string
 *                         email:
 *                           type: string
 *                         phone:
 *                           type: string
 */

/**
 * @openapi
 * /api/teacher-class/profile:
 *   get:
 *     summary: Lấy thông tin giáo viên
 *     tags: [TeacherClass]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin giáo viên thành công
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
 *                   example: "Lấy thông tin giáo viên thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     realName:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     role:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 */
