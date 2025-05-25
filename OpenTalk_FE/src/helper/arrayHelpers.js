export default function flatten(ary) {
	let ret = [];
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < ary.length; i++) {
		if (Array.isArray(ary[i])) {
			ret = ret.concat(flatten(ary[i]));
		} else {
			ret.push(ary[i]);
		}
	}
	return ret;
}

