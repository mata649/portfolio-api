declare module Express {
	export interface Request {
		currentUser: {
			id: string;
			name: string;
		};
	}
}
