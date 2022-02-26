export const initialState = {
    basket: [],
    user: null,
    addedProductbasket: [],
};


//selector 
export const totalCartValue = (basket) => basket?.reduce((amount, item) => amount + item.price, 0)

export function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex((basketitem) => basketitem.id === action.id)
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.warn(`No item found mathing with index ${action.id}`)
            }
            return { ...state, basket: newBasket }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        default:
            return state;
    }
}