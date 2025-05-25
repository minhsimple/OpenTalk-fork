import React from 'react';

const Collapsible = ({ expanded = false, className, children, ...props }) => (
	<div className={`collapsible ${className || ''} ${expanded ? 'expanded' : 'collapsed'}`}
		{...props}
	>
		{children}
	</div>
);

export default Collapsible;
