/* eslint-disable */
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

import nikeLogo from "@/assets/nike.png";
import adidasLogo from "@/assets/adidas.png";
import pumaLogo from "@/assets/puma.png";
import leviLogo from "@/assets/levi.png";
import zaraLogo from "@/assets/zara.png";
import hmLogo from "@/assets/hm.png";

import menLogo from "@/assets/men.png";
import womenLogo from "@/assets/women.png";
import kidLogo from "@/assets/kid.png";
import accessoriesLogo from "@/assets/accessories.png";
import footwearLogo from "@/assets/footwear.png";

const categoriesWithIcon = [
  { id: "men", label: "Men", img: menLogo },
  { id: "women", label: "Women", img: womenLogo },
  { id: "kids", label: "Kids", img: kidLogo },
  { id: "accessories", label: "Accessories", img: accessoriesLogo },
  { id: "footwear", label: "Footwear", img: footwearLogo },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", img: nikeLogo },
  { id: "adidas", label: "Adidas", img: adidasLogo },
  { id: "puma", label: "Puma", img: pumaLogo },
  { id: "levi", label: "Levi's", img: leviLogo },
  { id: "zara", label: "Zara", img: zaraLogo },
  { id: "h&m", label: "H&M", img: hmLogo },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [brandModalOpen, setBrandModalOpen] = useState(false);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to add items to your cart.",
        variant: "destructive",
      });
      return;
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
        toast({ title: "Product is added to cart" });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full overflow-hidden cursor-pointer bg-white" onClick={() => navigate("/shop/listing")}>        
        <div className="relative flex items-center justify-center h-48 sm:h-64 md:h-80 lg:h-[400px] xl:h-[450px] 2xl:h-[500px]">
          {featureImageList?.map((slide, index) => (
            <img
              src={slide?.image}
              key={index}
              className={`absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              style={{ backgroundColor: "#fff" }}
            />
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide((prev) => (prev - 1 + featureImageList.length) % featureImageList.length);
            }}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-20"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
            }}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 z-20"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-sm shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Categories</h3>
              <button onClick={() => setCategoryModalOpen(false)} className="text-2xl">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {categoriesWithIcon.map((categoryItem) => (
                <Card key={categoryItem.id} onClick={() => {handleNavigateToListingPage(categoryItem, "category"); setCategoryModalOpen(false);}} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <img src={categoryItem.img} alt={categoryItem.label} className="w-10 h-10 mb-2 object-contain" />
                    <span className="font-bold text-sm">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {brandModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-sm shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Brands</h3>
              <button onClick={() => setBrandModalOpen(false)} className="text-2xl">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {brandsWithIcon.map((brandItem) => (
                <Card key={brandItem.id} onClick={() => {handleNavigateToListingPage(brandItem, "brand"); setBrandModalOpen(false);}} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <img src={brandItem.img} alt={brandItem.label} className="w-10 h-10 mb-2 object-contain" />
                    <span className="font-bold text-sm">{brandItem.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="bg-gray-50">
        <br />
        <div className="md:hidden flex justify-center gap-4 my-4 mb-0 pb-0">
          <Button className="w-[140px] rounded-full px-0 py-2 bg-black text-white shadow-lg text-center" onClick={() => setCategoryModalOpen(true)}>Categories</Button>
          <Button className="w-[140px] rounded-full px-0 py-2 bg-black text-white shadow-lg text-center" onClick={() => setBrandModalOpen(true)}>Brands</Button>
        </div>
        <div className="container mx-auto px-4 pb-0">
          <h2 className="hidden md:block text-3xl font-bold text-center mb-8 pt-12">Shop by category</h2>
          <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card key={categoryItem.id} onClick={() => handleNavigateToListingPage(categoryItem, "category")} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img src={categoryItem.img} alt={categoryItem.label} className="w-12 h-12 mb-4 object-contain" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 pb-12 mt-2">
          <h2 className="hidden md:block text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card key={brandItem.id} onClick={() => handleNavigateToListingPage(brandItem, "brand")} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img src={brandItem.img} alt={brandItem.label} className="w-12 h-12 mb-4 object-contain" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList?.map((productItem) => (
              <ShoppingProductTile
                key={productItem._id}
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddtoCart={handleAddtoCart}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  );
}

export default ShoppingHome;