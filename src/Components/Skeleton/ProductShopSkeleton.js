prod?.rows.map((product) => {
  return (
    <div key={product.id}>
      <div className="ml-0 mt-10 xl:m-10 2xl:m-10">
        <div className=" bg-slate-100 rounded-sm shadow-sm md:w-[16rem] lg:w-[16rem] lg:h-[18rem] xl:w-[22rem] xl:h-[22rem] 2xl:w-[30rem] 2xl:h-[30rem]">
          <div className="pt-5 pl-5">
            <Typography
              variant="h6"
              className="bg-red-600 hover:bg-red-700 flex justify-center text-medium  h-8 w-12  text-white rounded-md"
            >
              {loading === true ? (
                <Skeleton animation="wave" />
              ) : (
                product.quantity
              )}
            </Typography>
            <h1></h1>
          </div>
          <div className=" flex justify-center">
            {loading === true ? (
              <Skeleton variant="rectangular" width={300} height={300} />
            ) : (
              <img
                onClick={() => navigate(`/product-details/${product.id}`)}
                style={{
                  width: "15rem",
                  height: "15rem",
                }}
                alt="product logo"
                src={product.productImages[0]?.url}
              />
            )}
          </div>
        </div>
        <div className="py-4 ml-6 md:ml-1">
          <Typography
            onClick={() => navigate(`/product-details/${product.id}`)}
            variant="h6"
            animation="wave"
          >
            {loading === true ? <Skeleton width={200} /> : product.title}
          </Typography>
          <Typography
            onClick={() => navigate(`/product-details/${product.id}`)}
            variant="p"
            animation="wave"
          >
            {loading === true ? <Skeleton width={60} /> : `Rs ${product.price}`}
          </Typography>
          {/* <p>{props.product.discount}</p> */}
        </div>
      </div>
    </div>
  );
});
