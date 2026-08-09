import { Router } from 'express';
import multer from 'multer';
import {
  getStudentsHandler,
  getStudentByIdHandler,
  getDashboardHandler,
  getFiltersMetaHandler,
  uploadCSVHandler
} from '../controllers/studentController';

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Temp upload directory

router.get('/students', getStudentsHandler);
router.get('/students/:id', getStudentByIdHandler);
router.get('/dashboard', getDashboardHandler);
router.get('/filters/meta', getFiltersMetaHandler);
router.post('/upload', upload.single('file'), uploadCSVHandler);

export default router;
