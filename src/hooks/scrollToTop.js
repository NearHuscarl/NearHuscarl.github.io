import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function scrollToTopOnMount() {
	const history = useHistory();
	useEffect(() => {
		if (history.action === 'PUSH') {
			window.scrollTo(0, 0);
		}
	}, []);

	return null;
}

export default scrollToTopOnMount;