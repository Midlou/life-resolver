import { useEffect, useRef } from "react";

export default function useFirstRender() {
	const firstRender = useRef(true);

	useEffect(() => {
		if (firstRender.current)
			return firstRender.current = false;

	}, []);

	return { isFirstRender: firstRender.current };
}
