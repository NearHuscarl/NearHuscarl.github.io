import React from 'react';
import { ResumeContent } from './resume';
import Layout from '../components/Layout';

const ResumeFullPage = (): JSX.Element => {
	return (
		<Layout title='Resumé HTML'>
			<ResumeContent />
		</Layout>
	);
};

export default ResumeFullPage;
