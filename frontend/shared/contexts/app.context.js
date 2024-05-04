import React, { createContext } from "react";
import useAppContext from "./use-app-context";

const AppContext = createContext({
	appState: {},
	addToCart: (item) => { },
	updateCart: (item) => { },
	setCartItems: (item) => { },
	removeFromCart: (item) => { }
});
const { Provider } = AppContext;

function AppProvider({ children = null }) {
	const uses = useAppContext();

	return <Provider value={{ ...uses }}>
		{children}
	</Provider>
}

export { AppContext, AppProvider };
