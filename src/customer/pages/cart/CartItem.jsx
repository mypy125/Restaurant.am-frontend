import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButton, Chip } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { removeCartItem, updateCartItem } from "../../state/cart/Action";

const CartItem = ({ item }) => {
    const { auth } = useSelector((store) => store);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleUpdateCartItem = (value) => {
        if (value === -1 && item.quantity === 1) {
            handleRemoveCartItem();
            return;
        }
        const reqData = { id: item.id, quantity: item.quantity + value };
        dispatch(updateCartItem({reqData, token:jwt}));
    };

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem({ cartItemId: item.id, jwt:auth.jwt || jwt }));
    };

    return (
        <div className="px-5">
            <div className="lg:flex items-center lg:space-x-5">
                <div className="w-[5rem] h-[5rem] object-cover">
                    <img src={item?.food?.images?.[0] || "default-image.jpg"} alt={item?.food?.name || "Food"} />
                </div>

                <p>{item?.food?.name || "Unknown Item"}</p>

                <div className="flex items-center justify-between lg:w-[70%]">
                    <div className="space-y-1 lg:space-y-3 w-full">
                        <p>{item?.food?.name || "Unknown Item"}</p>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <IconButton onClick={() => handleUpdateCartItem(-1)} color="primary">
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <div className="w-5 h-5 text-xs text-center">{item?.quantity || 0}</div>
                                <IconButton onClick={() => handleUpdateCartItem(1)} color="primary">
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <p>֏{item?.totalPrice || 0}</p>
                </div>
            </div>
            <div className="pt-3 space-x-2">
            {Array.isArray(item?.ingredients) && item.ingredients.length > 0 ? (
                    item.ingredients.map((ingredient) => (
                        <Chip key={ingredient} label={ingredient} />
                    ))
                ) : (
                    <p>No ingredients listed</p>
                )}
                {/* {item?.ingredients?.length > 0 ? (
                    item.ingredients.map((ingredient) => <Chip key={ingredient.name} label={ingredient.name} />)
                ) : (
                    <p>No ingredients listed</p>
                )} */}
            </div>
        </div>
    );
};

export default CartItem;