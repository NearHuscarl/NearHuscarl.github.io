function forceCast<T>(u: unknown): T {
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore <-- forces TS compiler to compile this as-is
	return u;
}

export default forceCast;
