import React, { lazy } from 'react';

// Icons

// Components
const Dashboard = lazy(() => import('./containers/Dashboard'));

export const routes = [
	{ path: '#', type: 'navgroup', name: 'Group', key: 'group' },
	{ path: '/dashboard', name: 'Dashboard', key: 'dashboard', component: Dashboard, icon: <div>Icon</div> },
];
