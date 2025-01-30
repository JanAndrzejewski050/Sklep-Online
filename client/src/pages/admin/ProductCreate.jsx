import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductAction } from "../../Redux/Actions/AdminProduct";
import { useNavigate } from "react-router-dom";  // Przechodzimy na useNavigate w v6

const ProductCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Używamy navigate w v6
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    const productCreate = useSelector((state) => state.productCreateReducer);
    console.log("productCreateReducer:", productCreate);

    const { loading, success, error } = productCreate;
    console.log("kutas3")

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Submit Handler called");
        dispatch(createProductAction({ name, price, image, category, countInStock, description }));
    };

    if (success) {
        navigate("/admin/productlist"); // Zmieniamy na navigate w v6
    }

    return (
        <div>
            <h1>Create Product</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                <input type="number" placeholder="Count in Stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" disabled={loading}>Create</button>
            </form>
        </div>
    );
};

export default ProductCreate;
