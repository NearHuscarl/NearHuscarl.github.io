import React from 'react';
import { ResumeContent } from './resume';
import Layout from '../components/Layout';

// TODO: write script to export pdf using chrome's printer option
// font display: replace quicksand with lato
// no margin
// no round border, box-shadow
// Printer option:
// - Destination: Save as PDF (otherwise save as image and you can't click any link or select any texts)
// - Pages: Custom -> 1
// - Paper Size: A4
// - Margin: None
// - Scale: Custom -> 80
// - Background graphics -> check
const ResumeFullPage = (): JSX.Element => {
	return (
		<Layout title='Resumé HTML'>
			<ResumeContent />
		</Layout>
	);
};

export default ResumeFullPage;
