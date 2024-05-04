import _ from "lodash";

export const INITIAL_APP_STATE = {
	isFirstRender: true,
	cart: {}
};

// ACTIONS
export const ADD_TO_CART_ACTION = 'ADD_TO_CART';
export const UPDATE_ORDER_ACTION = 'UPDATE_ORDER';
export const SET_CART_ITEMS_ACTION = 'SET_CART_ITEMS';
export const REMOVE_FROM_CART_ACTION = 'REMOVE_FROM_CART';

// ACTIONS FUNCTIONS
function updateOrderAction(state, payload) {
	if (!state.cart || !state.cart.items?.length) {
		return;
	}

	let cartItems = state.cart.items || [];

	let idx = cartItems.findIndex(item => item.id === payload.item.id);

	if (idx === -1) return;

	cartItems[idx] = payload.item;

	calculeItemsPrice(cartItems);
	let totalPrice = calculeTotalPrice(cartItems);
	return { ...state, cart: { items: [...cartItems], total_price: totalPrice } };
}

function setCartItems(state, payload) {
	return { ...state, cart: { ...state.cart, items: payload.item }};
}

function addToCart(state, payload) {
	if (!state.cart) {
		state.cart = { items: [] };
	}

	let cartItems = state.cart.items || [];

	if (payload.items?.length) {
		cartItems = [...cartItems, ...payload.items];
	} else if (payload.item) {
		cartItems = [...cartItems, payload.item];
	}

	return { ...state, cart: { ...state.cart, items: [...cartItems] } };
}

function removeFromCart(state, payload) {
	if (!state.cart || !state.cart.items?.length) {
		return;
	}

	let cartItems = state.cart.items || [];

	let idx = cartItems.findIndex(item => item.id === payload.item.id);

	if (idx === -1) return;

	delete cartItems[idx];

	return { ...state, cart: { items: [...cartItems] } };
}

export function appReducer(state, { action, payload }) {
	switch (action) {
		case SET_CART_ITEMS_ACTION: {
			return setCartItems(state, payload);
		}
		case ADD_TO_CART_ACTION: {
			return addToCart(state, payload);
		}
		case REMOVE_FROM_CART_ACTION: {
			return removeFromCart(state, payload);
		}
		case UPDATE_ORDER_ACTION: {
			return updateOrderAction(state, payload);
		}
		default: { return state };
	}
}
