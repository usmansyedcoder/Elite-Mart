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

// Product Data with Images
const products = [
  {
    id: 6,
    name: "Janan Perfume Body Spray",
    category: "perfume",
    price: 900,
    description: "Rich amber and vanilla fragrance blend",
    rating: 5,
    badge: "Premium",
    emoji: "🌸",
    image: "/perfume.jpeg",
  },
{
    id: 9,
    name: "Digital Watch",
    category: "watch",
    price: 2500,
    description: "Rich amber and vanilla fragrance blend",
    rating: 5,
    badge: "Premium",
    emoji: "🌸",
    image: "/watch.jpeg",
  },
  {
    id: 7,
    name: "Hotlee",
    category: "watch",
    price: 1200,
    description: "Elegant titanium case with sapphire glass",
    rating: 5,
    badge: "Luxury",
    emoji: "⌚",
    image: "/perfume2.jpeg",
  },
  {
    id: 8,
    name: "Airbuds",
    category: "airbuds",
    price: 4000,
    description: "Low latency gaming mode with RGB lights",
    rating: 5,
    badge: "New",
    emoji: "🎧",
    image: "airpods.jpeg",
  },
  {
    id: 1,
    name: "Midnight Oud Perfume",
    category: "perfume",
    price: 4999,
    description: "Long lasting oriental fragrance",
    rating: 5,
    badge: "Premium",
    emoji: "🌸",
    image:
      "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Chrono Sports Watch",
    category: "watch",
    price: 8999,
    description: "Water resistant chronograph watch",
    rating: 5,
    badge: "Trending",
    emoji: "⌚",
    image:
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Bass+ Wireless Airbuds",
    category: "airbuds",
    price: 5999,
    description: "Bluetooth 5.3 with charging case",
    rating: 5,
    badge: "New",
    emoji: "🎧",
    image:
      "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Smart Digital Watch",
    category: "watch",
    price: 11999,
    description: "Fitness tracker with heart rate monitor",
    rating: 5,
    badge: "Featured",
    emoji: "⌚",
    image:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Pro Noise Cancelling Buds",
    category: "airbuds",
    price: 8999,
    description: "Active noise cancellation",
    rating: 5,
    badge: "Limited",
    emoji: "🎧",
    image:
      "https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg?w=400&h=300&fit=crop",
  },

  // NEW PRODUCTS ADDED BELOW
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

const WHATSAPP_NUMBER = "923157666156";

// Color mapping for product cards
const getCategoryColor = (category) => {
  const colors = {
    wallet: "from-amber-400 to-orange-500",
    perfume: "from-purple-400 to-pink-500",
    watch: "from-blue-400 to-cyan-500",
    spray: "from-green-400 to-emerald-500",
    airbuds: "from-indigo-400 to-purple-500",
    glasses: "from-red-400 to-pink-500",
  };
  return colors[category] || "from-gray-400 to-gray-500";
};

// Product Image Component with fallback
const ProductImage = ({ product }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br ${getCategoryColor(product.category)} flex items-center justify-center`}
      >
        <div className="text-center text-white">
          <div className="text-7xl mb-2">{product.emoji}</div>
          <p className="text-sm font-semibold">{product.name}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
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
    return `Rs. ${price.toLocaleString()}`;
  };

  const generateWhatsAppMessage = () => {
    const itemsList = cart
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`,
      )
      .join("\n");

    const message = `🛍️ *NEW ORDER - Elite Mart* 🛍️\n\n━━━━━━━━━━━━━━━━━━━━\n*👤 CUSTOMER DETAILS*\n━━━━━━━━━━━━━━━━━━━━\nName: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nAddress: ${customerInfo.address}\n\n━━━━━━━━━━━━━━━━━━━━\n*📦 ORDER ITEMS*\n━━━━━━━━━━━━━━━━━━━━\n${itemsList}\n\n━━━━━━━━━━━━━━━━━━━━\n*💰 TOTAL AMOUNT*\n${formatPrice(getCartTotal())}\n━━━━━━━━━━━━━━━━━━━━\n\nThank you for shopping with Elite Mart! 🎉`;

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
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 text-white">
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
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-purple-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>

          <div className="text-center py-12 px-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">
                Free Delivery on orders over Rs. 5000
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
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

      {/* Categories */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg shadow-lg">
        <div className="container mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span className="font-medium">{cat.name}</span>
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
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow-lg bg-gradient-to-r ${
                      product.badge === "Bestseller"
                        ? "from-yellow-400 to-orange-500"
                        : product.badge === "Premium"
                          ? "from-purple-500 to-pink-500"
                          : product.badge === "Trending"
                            ? "from-blue-500 to-cyan-500"
                            : product.badge === "New"
                              ? "from-green-500 to-emerald-500"
                              : product.badge === "Sale"
                                ? "from-red-500 to-pink-500"
                                : "from-indigo-500 to-purple-500"
                    } text-white`}
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

              {/* Product Image - NOW SHOWING ACTUAL IMAGES */}
              <div className="relative overflow-hidden h-64 bg-gray-200">
                <ProductImage product={product} />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-purple-600">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-xl"
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

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-5 border-b bg-gradient-to-r from-purple-50 to-pink-50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                  Your Cart ({getCartCount()} items)
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
                        className="flex gap-4 bg-gray-50 rounded-xl p-3"
                      >
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br ${getCategoryColor(item.category)} flex items-center justify-center text-2xl">${item.emoji}</div>`;
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-purple-600 font-bold">
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-1.5 hover:bg-gray-100 rounded-l-lg transition px-3"
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
                                className="p-1.5 hover:bg-gray-100 rounded-r-lg transition px-3"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 text-sm hover:text-red-700"
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
                <div className="border-t bg-gray-50 p-5">
                  <div className="flex justify-between mb-4 text-lg">
                    <span className="font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {formatPrice(getCartTotal())}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setShowOrderForm(true);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    Order via WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-2xl font-bold text-purple-600">
                  Complete Your Order
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Please provide delivery details
                </p>
              </div>
              <button
                onClick={() => setShowOrderForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
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
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
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
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
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
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                  rows="3"
                  placeholder="Enter your complete address"
                />
              </div>

              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Order Summary
                </p>
                <p className="text-xl font-bold text-purple-600">
                  {formatPrice(getCartTotal())}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  You will be redirected to WhatsApp
                </p>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold"
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
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ShoppingBag className="w-6 h-6" />
            <h3 className="text-xl font-bold">Elite Mart</h3>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Phone className="w-4 h-4" />
            <span>Order via WhatsApp: 03157666156</span>
          </div>
          <div className="border-t border-gray-700 mt-4 pt-4 text-gray-400 text-sm">
            <p>© 2024 Elite Mart - All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
