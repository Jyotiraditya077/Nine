import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
  loading = false,
}) {
  if (loading) {
    return (
      <Card className="w-full max-w-sm mx-auto h-full flex flex-col">
        <div className="flex-grow flex flex-col">
          <div className="relative">
            <Skeleton className="w-full h-[300px] rounded-t-lg" />
          </div>

          <CardContent className="p-4 flex flex-col flex-grow justify-between">
            <div>
              <Skeleton className="h-8 w-3/5 mb-2" />
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-5 w-2/5" />
                <Skeleton className="h-5 w-2/5" />
              </div>
            </div>

            <div className="mt-auto flex justify-between items-center pt-4 border-t">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-8 w-1/3" />
            </div>
          </CardContent>
        </div>

        <CardFooter className="mt-auto">
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm mx-auto h-full flex flex-col">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="flex-grow flex flex-col"
      >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">{product?.title}</h2>

            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">
                {categoryOptionsMap[product?.category]}
              </span>
              <span className="text-sm text-muted-foreground">
                {brandOptionsMap[product?.brand]}
              </span>
            </div>
          </div>

          <div className="mt-auto flex justify-between items-center pt-4 border-t">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ₹{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>

      <CardFooter className="mt-auto">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed" disabled>
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
