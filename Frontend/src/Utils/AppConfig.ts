class AppConfig {

    // Front routes:
    public readonly productsRoute: string = "/products/"
    public readonly addProductRoute: string = this.productsRoute + "new/";
    public readonly editProductRoute: string = this.productsRoute + "edit/";
    public readonly ProductDetailsRoute: string = this.productsRoute + "details/";

    public readonly categoriesRoute: string = "/categories/";
    public readonly categoryDetailsRoute: string = this.categoriesRoute + "details/";

    public readonly HomeRoute: string = "/home";
    public readonly loginRoute: string = "/login";

    // Back routes:
    // public readonly productsUrlDelayed: string = "http://localhost:4000/api/products/delayed/";
    public readonly productsUrl: string = "http://localhost:4000/api/products/";
    public readonly employeesUrl: string = "http://localhost:4000/api/employees/";
    public readonly registerUrl: string = "http://localhost:4000/api/register/"
    public readonly loginUrl: string = "http://localhost:4000/api/login/"
    public readonly categoriesUrl: string = "http://localhost:4000/api/categories/"
    
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;