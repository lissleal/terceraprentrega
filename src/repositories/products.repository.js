import productModel from "../dao/mongo/product.model.js";

class ProductRepository extends productModel {
    constructor() {
        super();
    }

    //La uso en otras funciones aqui y en carts
    readProducts = async () => {
        try {
            const products = await productModel.find({});
            return products;
        } catch (error) {
            console.error('Error al buscar los productos:', error);
            return null;
        }
    }

    //no se si esta bien la aplicacion de limit
    getProducts = async (limit) => {

        let productsOld = await this.readProducts()
        if (!limit) return productsOld
        if (productsOld.length === 0) return "Error no se encontraron productos que cumplan con el criterio"
        if (productsOld && limit) return productsOld.slice(0, limit)
    }

    addProduct = async (product) => {
        try {
            const newProduct = new productModel(product);
            await newProduct.save();
            return newProduct;

        } catch (error) {
            console.error('Error al guardar el producto:', error);
            return null;
        }
    }


    getProductById = async (productId) => {
        try {
            const product = await productModel.findById(productId);
            if (!product) {
                return null;
            }
            return product;
        } catch (error) {
            console.error('Error al buscar el producto por ID:', error);
            return null;
        }
    }

    updateProduct = async (id, product) => {
        try {
            const updatedProduct = await productModel.findOneAndUpdate({ _id: id }, product, { new: true });
            if (updatedProduct) {
                return { updatedProduct, message: "Producto actualizado" };
            } else {
                return "Producto no encontrado";
            }

        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            return null;
        }
    }

    deleteProduct = async (productId) => {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(productId);
            return deletedProduct;
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            return null;
        }
    }


    getProductByLimit = async (limit) => {
        try {
            const products = await productModel.find().limit(limit);
            return products;
        } catch (error) {
            console.error('Error al buscar los productos', error);
            return null;
        }
    }

    getProductByPage = async (page, productsPerPage) => {
        try {
            const products = await productModel.find().skip((page - 1) * productsPerPage).limit(productsPerPage);
            return products;
        } catch (error) {
            console.error('Error al buscar los productos', error);
            return null;
        }
    }

    getProductByQuery = async (query) => {
        try {
            const products = await productModel.find({
                description: { $regex: query, $options: 'i' }
            });
            return products
        } catch (error) {
            console.error('Error al buscar los productos', error);
            return null;
        }
    }

    getProductMaster = async (page, limit, category, availability, sortOrder) => {
        try {
            let filter = {}
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
            const sortOptions = {}

            if (sortOrder === 'asc') {
                sortOptions.price = 1
            } else if (sortOrder === 'desc') {
                sortOptions.price = -1
            } else {
                throw new Error('El parámetro sortOrder debe ser "asc" o "desc".')
            }
            if (category != "") {
                filter.category = category;
            }
            if (availability != "") {
                filter.availability = availability;
            }
            const query = productModel.find(filter)
                .skip(startIndex)
                .limit(limit)
                .sort(sortOptions);;
            const products = await query.exec();

            const totalProducts = await productModel.countDocuments(filter);
            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = startIndex > 0;
            const hasNextPage = endIndex < totalProducts;
            const prevLink = hasPrevPage ? `/api/products?page=${page - 1}&limit=${limit}` : null;
            const nextLink = hasNextPage ? `/api/products?page=${page + 1}&limit=${limit}` : null;
            return {
                status: 'success',
                payload: products,
                totalPages: totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page: page,
                hasPrevPage: hasPrevPage,
                hasNextPage: hasNextPage,
                prevLink: prevLink,
                nextLink: nextLink,
            };
        } catch {
            console.error('Error al obtener los productos:', error);
            return { status: 'error', payload: 'Error al obtener los productos' };
        }
    }

    //Para validacion de producto dentro del carrito
    // porque aca y no en el cart
    existProducts = async (id) => {
        try {
            const product = await productModel.findById(id);
            if (!product) {
                return null;
            }
            return product;
        } catch (error) {
            console.error('Error, el producto no existe:', error);
            return null;
        }
    }

}

export default ProductRepository;