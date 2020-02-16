/**
 *
 * Asynchronously loads the component for SidebarContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
