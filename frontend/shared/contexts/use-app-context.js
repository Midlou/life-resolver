import { useReducer } from "react";
import { ADD_TO_CART_ACTION, appReducer, INITIAL_APP_STATE, REMOVE_FROM_CART_ACTION, UPDATE_ORDER_ACTION, SET_CART_ITEMS_ACTION } from "./app.reducer";

function useAppContext() {
	const [state, dispatch] = useReducer(appReducer, INITIAL_APP_STATE);

	function setCartItems(item) {
		dispatch({ action: SET_CART_ITEMS_ACTION, payload: { item } });
	}

	function updateCart(item) {
		dispatch({ action: UPDATE_ORDER_ACTION, payload: { item } });
	}

	function addToCart(item) {
		let toAdd = item?.length ? { items: item} : { item };

		dispatch({ action: ADD_TO_CART_ACTION, payload: toAdd });
	}

	function removeFromCart(item) {
		dispatch({ action: REMOVE_FROM_CART_ACTION, payload: { item } });
	}

	return { appState: state, setCartItems, updateCart, addToCart, removeFromCart };
}

export default useAppContext;
