import { Languages } from './language';
import { PostEntity } from './post';

export interface PostContentEntity {
	id: string;
	idPost: PostEntity['id'];
	language: Languages;
	title: string;
	content: string;
}

export const createPostContentEntity = ({
	id = '',
	idPost = '',
	language = Languages.NONE,
	title = '',
	content = '',
}: Partial<PostContentEntity>): PostContentEntity => {
	return {
		id,
		idPost,
		language,
		title,
		content,
	};
};
