export interface PostEntity {
	id: string;
	slug: string;
	defaultTitle: string;
	publishedDate: Date | null;
}

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
