import { Languages } from './language';
import { PostEntity } from '@/post/domain';
/** Interface representing a post's content in the portfolio */
export interface PostContentEntity {
	/** Unique post's content identifier*/
	id: string;
	/** Reference to the post's identifier - `PostEntity`*/
	idPost: PostEntity['id'];
	/** Post's content language*/
	language: Languages;
	/** Post's content title in the proper language*/
	title: string;
	/** Post's content in the proper language*/
	content: string;
}

/**
 * Returns a new `PostContentEntity` object, setting proper values to
 * the undefined values
 * @param item - The object to create the new `PostContentEntity`
 * @returns The new `PostContentEntity` object
 *
 */
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
