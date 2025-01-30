import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../../Redux/Actions/AdminProduct";
import { useParams, useNavigate } from "react-router-dom"; // Zmiana z useHistory na useNavigate
import { productAction } from "../../Redux/Actions/Product";

const ProductEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Zmiana z useHistory na useNavigate

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");

    const productDetail = useSelector((state) => state.productReducer);
    const { product, loading, error } = productDetail;

    useEffect(() => {
        if (!product.name || product._id !== id) {
            dispatch(productAction(id));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [dispatch, product, id]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProductAction({ _id: id, name, price, image, category, countInStock, description }));
    };

    return (
        <div>
            <h1>Edit Product</h1>
            {loading ? <p>Loading...</p> : error ? <p style={{ color: "red" }}>{error}</p> : (
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
                    <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <input type="number" placeholder="Count in Stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button type="submit" disabled={loading}>Update</button>
                </form>
            )}
        </div>
    );
};

export default ProductEdit;
