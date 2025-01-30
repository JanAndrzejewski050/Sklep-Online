import { useDispatch, useSelector } from "react-redux";
import { deleteProductAction } from "../../Redux/Actions/AdminProduct"; // Upewnij się, że masz odpowiednią akcję

const ProductList = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productListReducer);
    const { products, error, loading } = productList;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProductAction(id)); // Zaktualizowana akcja
        }
    };

    return (
        <div>
            <h1>Product List</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>
                                <button onClick={() => deleteHandler(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
