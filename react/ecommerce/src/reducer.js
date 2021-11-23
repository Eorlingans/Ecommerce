export const initialState = {
    basket: [],
}

export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_ITEM: "REMOVE_ITEM",
}

export const getTotalBasket = (basket) => {
    return basket?.reduce((amount, item) =>
        amount + item.arm_precio, 0)
}


const reducer = (state, action) => {
    console.log(action, "work");
    switch (action.type) {
        case "ADD_TO_BASKET":

            return {
                ...state,
                basket: [...state.basket, action.item],

            }

        case "REMOVE_ITEM":
            const index = state.basket.findIndex(basketItem => basketItem.id === action.id)
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.log("No se puede eliminar")
            }

            return {
                ...state,
                basket: newBasket,
            }

        default:
            return state;
    }
}
export default reducer