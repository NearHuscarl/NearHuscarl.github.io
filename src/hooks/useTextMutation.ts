import React from 'react';

/**
 * Hook to detect Node.textContent changes. Return Node.textContent
 */
function useTextMutation(node: Node | null): string {
	const [text, setText] = React.useState(node?.textContent || '');

	React.useEffect(() => {
		const mutationObserver = new MutationObserver((mutations) => {
			const mutation = mutations.filter((m) => m.type === 'characterData')[
				mutations.length - 1
			];
			if (mutation) {
				setText(() => mutation.target.textContent || '');
			}
		});

		// observe text changes only
		if (node) {
			mutationObserver.observe(node, {
				attributes: false,
				characterData: true,
				childList: false,
				subtree: false,
				attributeOldValue: false,
				characterDataOldValue: false,
			});
		}

		return () => mutationObserver.disconnect();
	}, [node, text]);

	return text;
}

export default useTextMutation;
