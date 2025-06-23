import { type TSchema, t } from "elysia";

export const resDoc = <T extends TSchema>(T: T) =>
	t.Object({
		code: t.String(),
		message: t.String(),
		data: T,
	});

export const resPagingDoc = <T extends TSchema>(T: T) =>
	t.Composite([
		resDoc(t.Array(T)),
		t.Object({
			currentPageCount: t.Integer(),
			totalItems: t.Integer(),
			totalPages: t.Integer(),
			currentPage: t.Integer(),
		}),
	]);

export const errorRes = resDoc(t.Null());

export const errorsDefault = {
	400: errorRes,
	500: errorRes,
};
