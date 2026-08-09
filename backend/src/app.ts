import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';
import { loadStudents } from './services/studentService';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

// Load default dataset on startup
loadStudents().then(() => {
  console.log('Default student dataset loaded.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to load initial dataset:', err);
});
