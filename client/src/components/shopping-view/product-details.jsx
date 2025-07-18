import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[70vw] p-4 sm:p-6 lg:p-8 max-h-screen overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-lg w-full lg:w-1/2">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="aspect-square w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                {productDetails?.title}
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg mb-4 mt-2">
                {productDetails?.description}
              </p>

              <div className="flex items-center justify-between mb-2">
                <p
                  className={`text-2xl font-bold text-primary ${
                    productDetails?.salePrice > 0 ? "line-through" : ""
                  }`}
                >
                  ₹{productDetails?.price}
                </p>
                {productDetails?.salePrice > 0 && (
                  <p className="text-xl font-bold text-muted-foreground">
                    ₹{productDetails?.salePrice}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <StarRatingComponent rating={averageReview} />
                <span className="text-muted-foreground text-sm">
                  ({averageReview.toFixed(2)})
                </span>
              </div>

              {productDetails?.totalStock === 0 ? (
                <Button className="w-full opacity-60 cursor-not-allowed" disabled>
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                >
                  Add to Cart
                </Button>
              )}

              <Separator className="my-6" />
            </div>

            {/* Reviews */}
            <div className="max-h-[300px] overflow-auto">
              <h2 className="text-lg font-bold mb-4">Reviews</h2>
              <div className="grid gap-4">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem, idx) => (
                    <div key={idx} className="flex gap-4">
                      <Avatar className="w-9 h-9 border">
                        <AvatarFallback>
                          {reviewItem?.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{reviewItem?.userName}</h3>
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                        <p className="text-muted-foreground text-sm">
                          {reviewItem.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No Reviews</p>
                )}
              </div>

              {/* Write Review */}
              <div className="mt-6 flex flex-col gap-2">
                <Label>Write a review</Label>

                {/* Stars (always on top) */}
                <div className="flex items-center gap-2">
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>

                {/* Input + Button below stars */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                    <Input
                      name="reviewMsg"
                      value={reviewMsg}
                      onChange={(e) => setReviewMsg(e.target.value)}
                      placeholder="Write a review..."
                      className="w-full flex-1"
                    />
                    <Button
                      onClick={handleAddReview}
                      disabled={reviewMsg.trim() === ""}
                      className="w-full sm:w-auto"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
