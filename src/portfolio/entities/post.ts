/** Interface representing a post in the portfolio */
export interface PostEntity {
	/**
	 * Unique post's identifier
	 * @memberof PostEntity
	*/
	id: string;
	/** Unique post's slug, used to identify the post in a idomatic way */
	slug: string;
	/** Post's default title*/
	defaultTitle: string;
	/** Post's published date*/
	publishedDate: Date | null;
}

/**
 * Returns a new `PostEntity` object, setting proper values to
 * the undefined values
 * @param item - The object to create the new `PostEntity` object
 * @returns The new `PostEntity`
 *
 */
export const createPostEntity = ({
	id = '',
	slug = '',
	defaultTitle = '',
	publishedDate = null,
}: Partial<PostEntity>) => {
	return {
		id,
		slug,
		defaultTitle,
		publishedDate,
	};
};
