import express from 'express';
import cors from 'cors';
import { Config } from '@/config';
import { dbConnection } from '@/base/data/mongo/mongoInit';
import { userRouter } from '@/user/rest/user.routes';
import { skillRouter } from '@/skill/rest/skill.routes';
import { categoryRouter } from '@/category/rest/category.routes';
import { projectRouter } from '@/project/rest/project.routes';
import { postRouter } from '@/post/rest/post.routes';
import { postContentRouter } from '@/postContent/rest/postContent.routes';

dbConnection();

const app = express();
app.use(cors());
const config = Config.loadConfig();
app.use(express.json());
app.use('/users', userRouter);
app.use('/skills', skillRouter);
app.use('/categories', categoryRouter);
app.use('/projects', projectRouter);
app.use('/posts', postRouter);
app.use('/postsContent', postContentRouter);
app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`);
});
