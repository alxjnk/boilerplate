import { 
	SIDEBAR_TOGGLE,
	CHECK_IN_TOGGLE, 
	CHECK_OUT_TOGGLE,  
} from './constants';

export function toggleSidebar() {
	return {
		type: SIDEBAR_TOGGLE,
	};
};

export function checkInToggle() {
	return {
		type: CHECK_IN_TOGGLE,
	};
};

export function checkOutToggle() {
	return {
		type: CHECK_OUT_TOGGLE,
	};
};
