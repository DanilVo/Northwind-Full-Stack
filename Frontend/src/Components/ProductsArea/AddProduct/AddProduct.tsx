import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Service/ProductsService";
import useImagePreview from "../../../Utils/UseImagePreview";
import "./AddProduct.css";
import notificationService from "../../../Service/NotificationService";

function AddProduct(): JSX.Element {
    const { register, handleSubmit } = useForm<ProductModel>();

    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState<File | null>();

    const imageSrc = useImagePreview(imageFile);

    function handleFileChange(event: any) {
        const files = event.target.files;

        if (!files || !files.item(0)) return;

        setImageFile(files.item(0));
    }


    async function send(product: ProductModel) {
        try {
            console.log(product);

            product.image = (product.image as unknown as FileList)[0];
            // console.log(product);

            const beProduct = await productsService.addProduct(product);

            notificationService.success("product has been added");

            navigate("/products/details/" + beProduct.id);

        } catch (err: any) {
            notificationService.error(err);
        }

    }

    return (
        <div className="AddProduct">
            <form onSubmit={handleSubmit(send)}>
                <label>Name</label>
                <input type="text" {...register("name")} />

                <label>Price</label>
                <input type="number" step="0.01" {...register("price")} />

                <label>Stock</label>
                <input type="number" {...register("stock")} />

                <div className="image-upload">
                    <label>Image</label>
                    <input type="file" accept="image/*" {...register("image")} onChange={handleFileChange} />
                    <img src={imageSrc} />
                </div>
                <button>Add</button>
            </form>

        </div>
    );
}

export default AddProduct;
