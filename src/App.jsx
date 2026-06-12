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
} from "lucide-react";

// Product Data
const products = [
  {
    id: 1,
    name: "Premium Leather Wallet",
    category: "wallet",
    price: 29.99,
    icon: Wallet,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300",
    description: "Genuine leather wallet with 6 card slots",
  },
  {
    id: 2,
    name: "Midnight Oud Perfume",
    category: "perfume",
    price: 49.99,
    icon: Wind,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300",
    description: "Long lasting oriental fragrance",
  },
  {
    id: 3,
    name: "Chrono Sports Watch",
    category: "watch",
    price: 89.99,
    icon: Watch,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300",
    description: "Water resistant chronograph watch",
  },
  {
    id: 4,
    name: "Ocean Breeze Body Spray",
    category: "spray",
    price: 19.99,
    icon: SprayCan,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=300",
    description: "Fresh and energetic body spray",
  },
  {
    id: 5,
    name: "Bass+ Wireless Airbuds",
    category: "airbuds",
    price: 59.99,
    icon: Headphones,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300",
    description: "Bluetooth 5.3 with charging case",
  },
  {
    id: 6,
    name: "Retro Round Sunglasses",
    category: "glasses",
    price: 34.99,
    icon: Glasses,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300",
    description: "UV protection polarized lenses",
  },
  {
    id: 7,
    name: "Minimalist Card Wallet",
    category: "wallet",
    price: 24.99,
    icon: Wallet,
    image: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=300",
    description: "Slim RFID blocking wallet",
  },
  {
    id: 8,
    name: "Royal Amber Perfume",
    category: "perfume",
    price: 59.99,
    icon: Wind,
    image: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=300",
    description: "Rich amber and musk fragrance",
  },
  {
    id: 9,
    name: "Smart Digital Watch",
    category: "watch",
    price: 119.99,
    icon: Watch,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300",
    description: "Fitness tracker with heart rate monitor",
  },
  {
    id: 10,
    name: "Citrus Splash Spray",
    category: "spray",
    price: 17.99,
    icon: SprayCan,
    image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=300",
    description: "Energizing citrus body mist",
  },
  {
    id: 11,
    name: "Pro Noise Cancelling Buds",
    category: "airbuds",
    price: 89.99,
    icon: Headphones,
    image: "https://images.unsplash.com/photo-1606220588913-b3aac6ab96f1?w=300",
    description: "Active noise cancellation",
  },
  {
    id: 12,
    name: "Aviator Metal Glasses",
    category: "glasses",
    price: 44.99,
    icon: Glasses,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300",
    description: "Classic aviator style sunglasses",
  },
];

const categories = [
  { id: "all", name: "All Products", icon: ShoppingBag },
  { id: "wallet", name: "Wallets", icon: Wallet },
  { id: "perfume", name: "Perfumes", icon: Wind },
  { id: "watch", name: "Watches", icon: Watch },
  { id: "spray", name: "Body Sprays", icon: SprayCan },
  { id: "airbuds", name: "Air Buds", icon: Headphones },
  { id: "glasses", name: "Glasses", icon: Glasses },
];

const WHATSAPP_NUMBER = "923157661566"; // Format: country code without plus

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
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
    return cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const generateWhatsAppMessage = () => {
    const itemsList = cart
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`,
      )
      .join("\n");

    const message = `🛍️ *NEW ORDER* 🛍️\n\n*Customer Details:*\nName: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nAddress: ${customerInfo.address}\n\n*Order Items:*\n${itemsList}\n\n*Total Amount:* $${getCartTotal()}\n\nThank you for your order! 🙏`;

    return encodeURIComponent(message);
  };

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.address) {
      alert("Please fill in your name and address");
      return;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`;
    window.open(whatsappUrl, "_blank");

    // Reset after order
    setCart([]);
    setShowOrderForm(false);
    setIsCartOpen(false);
    setCustomerInfo({ name: "", address: "", phone: "03157666156" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Elite Mart</h1>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-white/20 hover:bg-white/30 transition rounded-full p-2"
          >
            <ShoppingCart className="w-6 h-6" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white shadow-md sticky top-[72px] z-40">
        <div className="container mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/300x200?text=Product")
                }
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-purple-600">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
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
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Your Cart ({getCartCount()} items)
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    Your cart is empty
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 border-b pb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-purple-600 font-bold">
                            ${item.price}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-sm hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold text-purple-600">
                      ${getCartTotal()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setShowOrderForm(true);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Proceed to Order via WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Customer Information</h2>
              <button
                onClick={() => setShowOrderForm(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
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
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="3"
                  placeholder="Enter your full address"
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Order Summary:</p>
                <p className="font-semibold">Total: ${getCartTotal()}</p>
                <p className="text-xs text-gray-500 mt-2">
                  You will be redirected to WhatsApp to complete your order.
                </p>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Send Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            Order via WhatsApp: 03157666156
          </p>
          <p className="text-gray-400 text-sm mt-2">
            © 2024 Elite Mart - All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
