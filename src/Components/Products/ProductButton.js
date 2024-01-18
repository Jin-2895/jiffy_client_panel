const ProductButton = ({ productData }, { id }, { addToCart }) => {
  let newData = productData?.filter((productDetails) => {
    if (id === productDetails.id) {
      localStorage.setItem(JSON.stringify(productDetails));
      return (
        <>
          <button>{id}</button>
        </>
      );
    } else {
      return (
        <>
          
        </>
      );
    }
  });
};
export default ProductButton;
