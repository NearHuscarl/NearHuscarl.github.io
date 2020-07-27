// remove import error when loading mdx file in typescript
// https://mdxjs.com/advanced/typescript#typescript
declare module '*.mdx' {
	const MDXComponent: (props: any) => JSX.Element;
	export default MDXComponent;
}
