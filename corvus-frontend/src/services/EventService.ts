// services/EventService.ts
import type { EventItem } from "../models/eventType";
import type { ApiResponse } from "../models/apiResponse";
import type { EventSchema } from "../schemas/eventSchema";
import { apiAxios } from "./AxiosService";
import { withAbort } from "../utils/withAbort";

export const getEvents = () =>
	withAbort<ApiResponse<EventItem[]>>((signal) =>
		apiAxios.get("/events", { signal })
	);

export const createEvent = (body: EventSchema) =>
	withAbort<ApiResponse<EventItem>>((signal) =>
		apiAxios.post("/events", body, { signal })
	);

