import ProductTable from "./productTable";
import ProductSearch from "./productSearch";
import ProductDownload from "./productDownload";

const Product = () => {
  return (
    <>
      Product
      <div className={'topFlex'}>
        <ProductSearch/>
        <ProductDownload/>
      </div>
      <ProductTable/>
    </>
  )
}

export default Product;
