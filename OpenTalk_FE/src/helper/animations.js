const getScrolledParent = (node) => {
	if (!node) {
		return window;
	}
	if (node.scrollTop > 0) {
		return node;
	}

	return getScrolledParent(node.parentNode);
};

const scrollToTop = (node) => {
	const target = getScrolledParent(node);

	const scrollToTopInterval = window.setInterval(() => {
		const position = target.scrollTop || target.pageYOffset;
		if (position > 0) {
			target.scrollTo(0, position - 20);
		} else {
			window.clearInterval(scrollToTopInterval);
		}
	}, 16);
};

export default scrollToTop;
