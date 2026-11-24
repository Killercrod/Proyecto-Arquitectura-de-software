// models/eventType.ts  (export it from models/index.ts)

export interface EventItem {
	id: number;
	title: string;
	date: string;
	location: string;
	startTime: string;
	endTime: string;
}

// request body: the same fields without the id
export type EventItemCreate = Omit<EventItem, 'id'>;
