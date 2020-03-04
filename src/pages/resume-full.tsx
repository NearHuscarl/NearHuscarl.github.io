import React from 'react';
import { ResumeContent } from './resume';
import Layout from '../components/Layout';

// TODO: write script to export pdf using chrome's printer option
// font display: replace quicksand with lato
// no margin
// no round border, box-shadow
// Printer option:
// - Scale: 80
// - Margin: None
// - Pages: Custom -> 1
const ResumeFullPage = (): JSX.Element => {
	return (
		<Layout title='Resumé HTML'>
			<ResumeContent />
		</Layout>
	);
};

export default ResumeFullPage;
