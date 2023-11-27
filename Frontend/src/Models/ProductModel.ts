class ProductModel {
    // We can initial by default values
    // we can set it to be optional ?
    // we can set it to be mandatory !
    // "strictNullChecks": false
    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageUrl: string;
    public image: File;
}

export default ProductModel;