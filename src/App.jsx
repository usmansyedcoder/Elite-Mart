import { useState } from "react";
import {
  ShoppingBag,
  Wallet,
  Wind,
  Watch,
  SprayCan,
  Headphones,
  Glasses,
  ShoppingCart,
  X,
  Plus,
  Minus,
  Phone,
  Star,
  Truck,
  Shield,
  Heart,
  Gift,
  Sparkles,
} from "lucide-react";

// Product Data with PKR Prices
const products = [
  {
    id: 1,
    name: "Premium Leather Wallet",
    category: "wallet",
    price: 2999,
    icon: Wallet,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300",
    description: "Genuine leather wallet with 6 card slots",
    rating: 4.5,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Midnight Oud Perfume",
    category: "perfume",
    price: 4999,
    icon: Wind,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300",
    description: "Long lasting oriental fragrance",
    rating: 4.8,
    badge: "Premium",
  },
  {
    id: 3,
    name: "Chrono Sports Watch",
    category: "watch",
    price: 8999,
    icon: Watch,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300",
    description: "Water resistant chronograph watch",
    rating: 4.6,
    badge: "Trending",
  },
  {
    id: 4,
    name: "Ocean Breeze Body Spray",
    category: "spray",
    price: 1999,
    icon: SprayCan,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=300",
    description: "Fresh and energetic body spray",
    rating: 4.3,
    badge: "Popular",
  },
  {
    id: 5,
    name: "Bass+ Wireless Airbuds",
    category: "airbuds",
    price: 5999,
    icon: Headphones,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300",
    description: "Bluetooth 5.3 with charging case",
    rating: 4.7,
    badge: "New",
  },
  {
    id: 6,
    name: "Retro Round Sunglasses",
    category: "glasses",
    price: 3499,
    icon: Glasses,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300",
    description: "UV protection polarized lenses",
    rating: 4.4,
    badge: "Sale",
  },
  {
    id: 7,
    name: "Minimalist Card Wallet",
    category: "wallet",
    price: 2499,
    icon: Wallet,
    image: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=300",
    description: "Slim RFID blocking wallet",
    rating: 4.5,
    badge: "",
  },
  {
    id: 8,
    name: "Royal Amber Perfume",
    category: "perfume",
    price: 5999,
    icon: Wind,
    image: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=300",
    description: "Rich amber and musk fragrance",
    rating: 4.9,
    badge: "Luxury",
  },
  {
    id: 9,
    name: "Smart Digital Watch",
    category: "watch",
    price: 11999,
    icon: Watch,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300",
    description: "Fitness tracker with heart rate monitor",
    rating: 4.8,
    badge: "Featured",
  },
  {
    id: 10,
    name: "Citrus Splash Spray",
    category: "spray",
    price: 1799,
    icon: SprayCan,
    image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=300",
    description: "Energizing citrus body mist",
    rating: 4.2,
    badge: "",
  },
  {
    id: 11,
    name: "Pro Noise Cancelling Buds",
    category: "airbuds",
    price: 8999,
    icon: Headphones,
    image: "https://images.unsplash.com/photo-1606220588913-b3aac6ab96f1?w=300",
    description: "Active noise cancellation",
    rating: 4.9,
    badge: "Limited",
  },
  {
    id: 12,
    name: "Aviator Metal Glasses",
    category: "glasses",
    price: 4499,
    icon: Glasses,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300",
    description: "Classic aviator style sunglasses",
    rating: 4.6,
    badge: "",
  },
];

const categories = [
  {
    id: "all",
    name: "All Products",
    icon: ShoppingBag,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "wallet",
    name: "Wallets",
    icon: Wallet,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "perfume",
    name: "Perfumes",
    icon: Wind,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "watch",
    name: "Watches",
    icon: Watch,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "spray",
    name: "Body Sprays",
    icon: SprayCan,
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: "airbuds",
    name: "Air Buds",
    icon: Headphones,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "glasses",
    name: "Glasses",
    icon: Glasses,
    color: "from-red-500 to-pink-500",
  },
];

const WHATSAPP_NUMBER = "923157661566";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "03157666156",
  });

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const generateWhatsAppMessage = () => {
    const itemsList = cart
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`,
      )
      .join("\n");

    const message = `🛍️ *NEW ORDER - Elite Mart* 🛍️\n\n━━━━━━━━━━━━━━━━━━━━\n*👤 CUSTOMER DETAILS*\n━━━━━━━━━━━━━━━━━━━━\nName: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nAddress: ${customerInfo.address}\n\n━━━━━━━━━━━━━━━━━━━━\n*📦 ORDER ITEMS*\n━━━━━━━━━━━━━━━━━━━━\n${itemsList}\n\n━━━━━━━━━━━━━━━━━━━━\n*💰 TOTAL AMOUNT*\n${formatPrice(getCartTotal())}\n━━━━━━━━━━━━━━━━━━━━\n\nThank you for shopping with Elite Mart! 🎉\nYour order will be processed shortly.`;

    return encodeURIComponent(message);
  };

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.address) {
      alert("Please fill in your name and address");
      return;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`;
    window.open(whatsappUrl, "_blank");

    setCart([]);
    setShowOrderForm(false);
    setIsCartOpen(false);
    setCustomerInfo({ name: "", address: "", phone: "03157666156" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section with Floating Elements */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur rounded-full p-2">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Elite Mart
                </h1>
                <p className="text-xs opacity-90">Premium Collection</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-white/20 backdrop-blur hover:bg-white/30 transition-all rounded-full p-2.5"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-purple-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>

          {/* Hero Text */}
          <div className="text-center py-12 px-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">
                Free Delivery on orders over Rs. 5000
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Shop Your Style
            </h2>
            <p className="text-lg md:text-xl opacity-95 mb-8">
              Wallets • Perfumes • Watches • Sprays • Airbuds • Glasses
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <Truck className="w-4 h-4" />
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <Gift className="w-4 h-4" />
                <span className="text-sm">Gift Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories - Modern Glassmorphism */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg shadow-lg">
        <div className="container mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg transform scale-105`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <cat.icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${selectedCategory === cat.id ? "animate-pulse" : ""}`}
                />
                <span className="font-medium">{cat.name}</span>
                {selectedCategory === cat.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {selectedCategory === "all"
                ? "All Products"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-500 mt-1">
              Discover our premium collection
            </p>
          </div>
          <div className="text-sm text-gray-500">
            {filteredProducts.length} products
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                      product.badge === "Bestseller"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                        : product.badge === "Premium"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : product.badge === "Trending"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                            : product.badge === "New"
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                              : product.badge === "Sale"
                                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                                : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur rounded-full p-2 hover:bg-white transition-all"
              >
                <Heart
                  className={`w-5 h-5 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                />
              </button>

              {/* Product Image */}
              <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x200?text=Product")
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.rating})
                  </span>
                </div>

                <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-purple-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">PKR</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-xl transform hover:scale-105"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar - Modern Design */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-5 border-b bg-gradient-to-r from-purple-50 to-pink-50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                  Your Cart
                  <span className="text-sm text-gray-500">
                    ({getCartCount()} items)
                  </span>
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Start adding some items!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 bg-gray-50 rounded-xl p-3 transition hover:shadow-md"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-purple-600 font-bold text-lg">
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-1.5 hover:bg-gray-100 rounded-l-lg transition"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-1.5 hover:bg-gray-100 rounded-r-lg transition"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 text-sm hover:text-red-700 transition"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t bg-gradient-to-r from-gray-50 to-white p-5">
                  <div className="flex justify-between mb-4 text-lg">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {formatPrice(getCartTotal())}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setShowOrderForm(true);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Phone className="w-5 h-5 animate-pulse" />
                    Proceed to Order via WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Order Form Modal - Modern Glassmorphism */}
      {showOrderForm && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all duration-300 shadow-2xl animate-fadeInUp">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Complete Your Order
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Please provide delivery details
                </p>
              </div>
              <button
                onClick={() => setShowOrderForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      address: e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                  rows="3"
                  placeholder="Enter your complete address"
                />
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Order Summary
                </p>
                <p className="text-xl font-bold text-purple-600">
                  {formatPrice(getCartTotal())}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  You will be redirected to WhatsApp to complete your order.
                </p>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Phone className="w-5 h-5" />
                Send Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <ShoppingBag className="w-6 h-6" />
                <h3 className="text-xl font-bold">Elite Mart</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Premium quality products at best prices
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact Us</h4>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>03157666156</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">Order via WhatsApp</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>About Us</li>
                <li>Shipping Policy</li>
                <li>Returns & Exchange</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
            <p>© 2024 Elite Mart - All Rights Reserved</p>
          </div>
        </div>
      </footer>

      {/* Add animation keyframes to your CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default App;
