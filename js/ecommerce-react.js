const { useEffect, useMemo, useState } = React;

const products = [
    {
        id: "belt-10mm",
        name: "10mm Powerlifting Belt",
        category: "Equipment",
        type: "Belts",
        facet: "10mm",
        variation: "10mm",
        focus: "Squat + Deadlift",
        price: 430,
        badge: "Best Seller",
        image: "images/ecommerce/belt-10mm.png",
        description: "A firm 10mm belt for lifters who want support without losing setup comfort.",
        details: [
            "Strong support for heavy squat and deadlift sessions",
            "Good choice for newer competitors and regular training",
            "Single-cover product area prepared for your final product photo"
        ]
    },
    {
        id: "belt-13mm",
        name: "13mm Powerlifting Belt",
        category: "Equipment",
        type: "Belts",
        facet: "13mm",
        variation: "13mm",
        focus: "Squat + Deadlift",
        price: 430,
        badge: "Meet Ready",
        image: "images/ecommerce/belt-13mm.png",
        description: "A thicker 13mm belt for lifters who prefer maximum support during heavy attempts.",
        details: [
            "Maximum stiffness for experienced powerlifters",
            "Designed for heavy top sets and meet preparation",
            "Single-cover product area prepared for your final product photo"
        ]
    },
    {
        id: "knee-standard",
        name: "Knee Sleeves",
        category: "Equipment",
        type: "Knee Sleeves",
        facet: "Knee Sleeves",
        variation: "Standard",
        focus: "Squat",
        price: 140,
        badge: "Training Pick",
        image: "images/ecommerce/knee-sleeves.png",
        description: "Supportive knee sleeves for regular squat training and comfortable daily sessions.",
        details: [
            "Warmth and compression for squat training",
            "Easy to wear for repeated training sets",
            "Single-cover product area prepared for your final product photo"
        ]
    },
    {
        id: "knee-powerlifting",
        name: "Powerlifting Knee Sleeves",
        category: "Equipment",
        type: "Knee Sleeves",
        facet: "Powerlifting Knee Sleeves",
        variation: "Powerlifting",
        focus: "Squat",
        price: 198,
        badge: "Competition Support",
        image: "images/ecommerce/powerlifting-knee-sleeves.png",
        description: "Stiffer powerlifting knee sleeves for lifters who want stronger compression on squat day.",
        details: [
            "Stronger compression for heavy squats",
            "Best for serious training blocks and competition prep",
            "Single-cover product area prepared for your final product photo"
        ]
    },
    {
        id: "wraps-nova-pink",
        name: "Nova Pink Wrist Wraps",
        category: "Equipment",
        type: "Wrist Wraps",
        facet: "Nova Pink",
        variation: "Nova Pink",
        focus: "Bench + Squat",
        price: 75,
        badge: "Limited Edition",
        image: "images/ecommerce/wraps-nova-pink.png",
        description: "Bright pink wrist wraps for pressing support with a strong visual identity.",
        details: [
            "Supports the wrist during bench press and low-bar squat setup",
            "Nova Pink colorway for a bold meet-day look",
            "Single-cover product area prepared for your final product photo"
        ]
    },
    {
        id: "wraps-resolve-green",
        name: "Resolve Green Wrist Wraps",
        category: "Equipment",
        type: "Wrist Wraps",
        facet: "Resolve Green",
        variation: "Resolve Green",
        focus: "Bench + Squat",
        price: 75,
        badge: "New Color",
        image: "images/ecommerce/wraps-resolve-green.png",
        description: "Military green wrist wraps for lifters who prefer a focused, minimal look.",
        details: [
            "Supports the wrist during bench press and low-bar squat setup",
            "Resolve Green colorway for a calm but strong style",
            "Single-cover product area prepared for your final product photo"
        ]
    },
    {
        id: "singlet-nova-pink",
        name: "Nova Pink Competition Singlet",
        category: "Clothing",
        type: "Competition Singlets",
        facet: "Nova Pink",
        variation: "Nova Pink",
        focus: "Meet Day",
        price: 160,
        badge: "Limited Edition",
        image: "images/ecommerce/singlet-nova-pink.png",
        description: "A competition singlet with a bold Nova Pink colorway for meet-day confidence.",
        details: [
            "Designed for powerlifting competition presentation",
            "Bold colorway that matches the Nova Pink equipment line",
            "Single-cover product area prepared for your final product photo"
        ]
    },
    {
        id: "singlet-resolve-green",
        name: "Resolve Green Competition Singlet",
        category: "Clothing",
        type: "Competition Singlets",
        facet: "Resolve Green",
        variation: "Resolve Green",
        focus: "Meet Day",
        price: 160,
        badge: "Meet Ready",
        image: "images/ecommerce/singlet-resolve-green.png",
        description: "A competition singlet in Resolve Green for a composed platform look.",
        details: [
            "Designed for powerlifting competition presentation",
            "Pairs with Resolve Green accessories",
            "Single-cover product area prepared for your final product photo"
        ]
    },
 
    {
        id: "tee-nova-pink",
        name: "Nova Pink Competition T-Shirt",
        category: "Clothing",
        type: "Competition T-Shirts",
        facet: "Nova Pink",
        variation: "Nova Pink",
        focus: "Training + Meet Day",
        price: 62,
        badge: "Soft Feel",
        image: "images/ecommerce/tee-nova-pink.png",
        description: "A competition-style t-shirt for warm-ups, training days, and team identity.",
        details: [
            "Comfortable fit for warm-ups and gym sessions",
            "Nova Pink colorway for matching sets",
            "Single-cover product area prepared for your final product photo"
        ]
    },
    {
        id: "tee-resolve-green",
        name: "Resolve Green Competition T-Shirt",
        category: "Clothing",
        type: "Competition T-Shirts",
        facet: "Resolve Green",
        variation: "Resolve Green",
        focus: "Training + Meet Day",
        price: 62,
        badge: "Soft Feel",
        image: "images/ecommerce/tee-resolve-green.png",
        description: "A competition-style t-shirt in Resolve Green for a simple lifting outfit.",
        details: [
            "Comfortable fit for warm-ups and gym sessions",
            "Resolve Green colorway for matching sets",
            "Single-cover product area prepared for your final product photo"
        ]
    },
    
];

const categoryGroups = {
    Equipment: [
        { key: "Belts", title: "Belts", subtitle: "Choose 10mm or 13mm support.", button: "View Belts" },
        { key: "Knee Sleeves", title: "Knee Sleeves", subtitle: "Choose training sleeves or powerlifting sleeves.", button: "View Knee Sleeves" },
        { key: "Wrist Wraps", title: "Wrist Wraps", subtitle: "Choose Nova Pink or Resolve Green.", button: "View Wrist Wraps" }
    ],
    Clothing: [
        { key: "Competition Singlets", title: "Competition Singlets", subtitle: "Choose Nova Pink or Resolve Green.", button: "View Singlets" },
        { key: "Competition T-Shirts", title: "Competition T-Shirts", subtitle: "Choose Nova Pink or Resolve Green.", button: "View T-Shirts" },
    ]
};

const facetGroups = {
    Belts: [
        { key: "10mm", title: "10mm", subtitle: "Flexible support for training and first meets." },
        { key: "13mm", title: "13mm", subtitle: "Maximum support for heavier attempts." }
    ],
    "Knee Sleeves": [
        { key: "Knee Sleeves", title: "Knee Sleeves", subtitle: "Comfortable support for regular squat training." },
        { key: "Powerlifting Knee Sleeves", title: "Powerlifting Knee Sleeves", subtitle: "Stiffer compression for serious squat days." }
    ],
    "Wrist Wraps": [
        { key: "Nova Pink", title: "Nova Pink", subtitle: "Bright limited edition wrist wraps." },
        { key: "Resolve Green", title: "Resolve Green", subtitle: "Military green wrist wraps." },
    ],
    "Competition Singlets": [
        { key: "Nova Pink", title: "Nova Pink", subtitle: "Bold meet-day singlet." },
        { key: "Resolve Green", title: "Resolve Green", subtitle: "Composed platform colorway." },
    ],
    "Competition T-Shirts": [
        { key: "Nova Pink", title: "Nova Pink", subtitle: "Warm-up and training shirt." },
        { key: "Resolve Green", title: "Resolve Green", subtitle: "Simple matching team shirt." },
    ],
};

function money(value) {
    return `$${value.toFixed(2)}`;
}

function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem("mn-ecommerce-history") || "[]");
    } catch (error) {
        return [];
    }
}

function saveHistory(history) {
    localStorage.setItem("mn-ecommerce-history", JSON.stringify(history));
}

function EcommerceApp() {
    const [page, setPage] = useState("home");
    const [filters, setFilters] = useState({ category: "All", type: "All", facet: "All" });
    const [selectedCategory, setSelectedCategory] = useState("Equipment");
    const [selectedType, setSelectedType] = useState("Belts");
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [checkoutStep, setCheckoutStep] = useState(0);
    const [personalInfo, setPersonalInfo] = useState({ name: "", email: "", phone: "", address: "" });
    const [paymentInfo, setPaymentInfo] = useState({ cardName: "", cardNumber: "", expiry: "", cvv: "" });
    const [lastOrder, setLastOrder] = useState(null);
    const [history, setHistory] = useState(loadHistory);
    const [survey, setSurvey] = useState({ rating: "", ease: "", comment: "" });
    const [surveySent, setSurveySent] = useState(false);

    useEffect(() => {
        saveHistory(history);
    }, [history]);

    useEffect(() => {
        function handleTopNavigation(event) {
            const target = event.detail;
            if (["home", "cart", "history"].includes(target)) {
                setPage(target);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }

        window.addEventListener("mn-store-nav", handleTopNavigation);
        return () => window.removeEventListener("mn-store-nav", handleTopNavigation);
    }, []);

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const categoryMatch = filters.category === "All" || product.category === filters.category;
            const typeMatch = filters.type === "All" || product.type === filters.type;
            const facetMatch = filters.facet === "All" || product.facet === filters.facet || product.variation === filters.facet;
            return categoryMatch && typeMatch && facetMatch;
        });
    }, [filters]);

    function goTo(nextPage) {
        setPage(nextPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function openShop(nextFilters = { category: "All", type: "All", facet: "All" }) {
        setFilters(nextFilters);
        setPage("shop");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function openCategory(category) {
    setSelectedCategory(category);
    setFilters({ category, type: "All", facet: "All" });
    setPage("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

    function openType(category, type) {
    setSelectedCategory(category);
    setSelectedType(type);
    setFilters({ category, type, facet: "All" });
    setPage("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

    function openFacet(category, type, facet) {
        setSelectedCategory(category);
        setSelectedType(type);
        setFilters({ category, type, facet });
        setPage("shop");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function resetFilters() {
        setFilters({ category: "All", type: "All", facet: "All" });
        setPage("shop");
    }

    function addToCart(product) {
        setCart((current) => {
            const found = current.find((item) => item.id === product.id);
            if (found) {
                return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...current, { ...product, quantity: 1 }];
        });
    }

    function changeQuantity(productId, change) {
        setCart((current) => current
            .map((item) => item.id === productId ? { ...item, quantity: item.quantity + change } : item)
            .filter((item) => item.quantity > 0)
        );
    }

    function removeItem(productId) {
        setCart((current) => current.filter((item) => item.id !== productId));
    }

    function viewProduct(product) {
        setSelectedProduct(product);
        goTo("detail");
    }

    function startCheckout() {
        if (cart.length === 0) return;
        setCheckoutStep(0);
        goTo("checkout");
    }

    function submitPersonal(event) {
        event.preventDefault();
        setCheckoutStep(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function submitPayment(event) {
        event.preventDefault();
        setCheckoutStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function placeOrder() {
        const order = {
            id: `MN-${Date.now().toString().slice(-6)}`,
            date: new Date().toLocaleDateString(),
            items: cart,
            total: cartTotal,
            customer: personalInfo.name || "Guest"
        };
        setLastOrder(order);
        setHistory((current) => [order, ...current]);
        setCart([]);
        setSurvey({ rating: "", ease: "", comment: "" });
        setSurveySent(false);
        goTo("confirmation");
    }

    function submitSurvey(event) {
        event.preventDefault();
        setSurveySent(true);
    }

    return (
        <div className="ecommerce-page">
            {(page === "shop" || page === "category" || page === "type" || page === "detail" || page === "cart" || page === "checkout" || page === "confirmation" || page === "history") && (
                <StoreSubNav
                    filters={filters}
                    openShop={openShop}
                    openCategory={openCategory}
                    openType={openType}
                    goTo={goTo}
                    currentPage={page}
                />
            )}

            {page === "home" && <HomePage openShop={openShop} openCategory={openCategory} goTo={goTo} />}
            
            {page === "shop" && (
                <ShopPage
                    products={filteredProducts}
                    filters={filters}
                    resetFilters={resetFilters}
                    viewProduct={viewProduct}
                    addToCart={addToCart}
                    goTo={goTo}
                    openType={openType}
                    openCategory={openCategory}
                />
            )}
            {page === "detail" && selectedProduct && (
                <ProductDetail product={selectedProduct} addToCart={addToCart} openShop={openShop} goTo={goTo} />
            )}
            {page === "cart" && (
                <CartPage
                    cart={cart}
                    cartTotal={cartTotal}
                    changeQuantity={changeQuantity}
                    removeItem={removeItem}
                    startCheckout={startCheckout}
                    openShop={openShop}
                />
            )}
            {page === "checkout" && (
                <CheckoutPage
                    step={checkoutStep}
                    setStep={setCheckoutStep}
                    cart={cart}
                    cartTotal={cartTotal}
                    personalInfo={personalInfo}
                    setPersonalInfo={setPersonalInfo}
                    paymentInfo={paymentInfo}
                    setPaymentInfo={setPaymentInfo}
                    submitPersonal={submitPersonal}
                    submitPayment={submitPayment}
                    placeOrder={placeOrder}
                    goTo={goTo}
                />
            )}
            {page === "confirmation" && (
                <ConfirmationPage
                    order={lastOrder}
                    survey={survey}
                    setSurvey={setSurvey}
                    surveySent={surveySent}
                    submitSurvey={submitSurvey}
                    openShop={openShop}
                    goTo={goTo}
                />
            )}
            {page === "history" && <HistoryPage history={history} openShop={openShop} />}
        </div>
    );
}

function HomePage({ openShop, openCategory, goTo }) {
    return (
        <>
            <header className="store-hero-section">
                <img src="images/cover-05.jpg" className="store-hero-img" alt="Powerlifting store cover" />
                <div className="store-hero-content">
                    <p className="store-hero-kicker">Equipment and clothing for strength athletes</p>
                    <h1 className="store-hero-title">MN Powerlifting Store</h1>
                    <p className="store-hero-text">
                        Everything you need to train hard, lift strong, and compete with confidence.
                    </p>
                    <button className="store-primary-btn" type="button" onClick={() => openShop()}>
                        Shop Now
                    </button>
                </div>
            </header>

            <section className="store-intro-section">
                <div className="container">
                    <h1 className="store-section-title">Shop by Training Need</h1>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <button className="store-intro-card store-intro-button" type="button" onClick={() => openCategory("Equipment")}>
                                <h3>Equipment</h3>
                                <p>Belts, knee sleeves, and wrist wraps for heavier training days.</p>
                            </button>
                        </div>
                        <div className="col-md-6 mb-4">
                            <button className="store-intro-card store-intro-button" type="button" onClick={() => openCategory("Clothing")}>
                                <h3>Clothing</h3>
                                <p>Competition singlets and t-shirts for the platform.</p>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="store-cta-section">
                <div className="container text-center">
                    <h1 className="store-cta-title">Ready to complete your setup?</h1>
                    <p className="store-cta-text">Use the store filters to explore by product category and variation.</p>
                    <button className="store-primary-btn" type="button" onClick={() => openShop()}>
                        View All Products
                    </button>
                </div>
            </section>
        </>
    );
}

function StoreSubNav({ filters, openShop, openCategory, openType, goTo, currentPage }) {
    return (
        <section className="store-subnav-section">
            <div className="container-fluid">
                <div className="store-subnav" aria-label="Store navigation and faceted product filters">
                    <button
                        className={`store-nav-button ${currentPage === "home" ? "is-active" : ""}`}
                        type="button"
                        onClick={() => goTo("home")}
                    >
                        Home Page
                    </button>

                    <div className="store-dropdown">
                        <button
                            className={`store-drop-button ${currentPage === "shop" || currentPage === "category" || currentPage === "type" || currentPage === "detail" ? "is-active" : ""}`}
                            type="button"
                            onClick={() => openShop()}
                        >
                            All Products <span aria-hidden="true">⌄</span>
                        </button>

                        <div className="store-dropdown-menu">
                            <button
                                type="button"
                                onClick={() => openCategory("Equipment")}
                                className={filters.category === "Equipment" && filters.type === "All" ? "is-active" : ""}
                            >
                                Equipment
                            </button>

                            <button
                                type="button"
                                className="store-dropdown-sub"
                                onClick={() => openType("Equipment", "Belts")}
                            >
                                Belts
                            </button>

                            <button
                                type="button"
                                className="store-dropdown-sub"
                                onClick={() => openType("Equipment", "Knee Sleeves")}
                            >
                                Knee Sleeves
                            </button>

                            <button
                                type="button"
                                className="store-dropdown-sub"
                                onClick={() => openType("Equipment", "Wrist Wraps")}
                            >
                                Wrist Wraps
                            </button>

                            <button
                                type="button"
                                onClick={() => openCategory("Clothing")}
                                className={filters.category === "Clothing" && filters.type === "All" ? "is-active" : ""}
                            >
                                Clothing
                            </button>

                            <button
                                type="button"
                                className="store-dropdown-sub"
                                onClick={() => openType("Clothing", "Competition Singlets")}
                            >
                                Competition Singlets
                            </button>

                            <button
                                type="button"
                                className="store-dropdown-sub"
                                onClick={() => openType("Clothing", "Competition T-Shirts")}
                            >
                                Competition T-Shirts
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ShopPage({ products, filters, resetFilters, viewProduct, addToCart, goTo, openType, openCategory }) {
    const title = filters.type !== "All"
        ? filters.type
        : filters.category !== "All"
            ? filters.category
            : "All Products";

    const categoryTabs = filters.category !== "All"
        ? categoryGroups[filters.category] || []
        : [];

    return (
        <section className="product-section">
            <div className="container">
                <div className="product-header-row">
                    <h1 className="store-section-title">{title}</h1>
                </div>

                {filters.category === "All" ? (
                    <div className="category-filter-tabs">
                        <button
                            className="category-filter-btn"
                            type="button"
                            onClick={() => openCategory("Equipment")}
                        >
                            Equipment
                        </button>

                        <button
                            className="category-filter-btn"
                            type="button"
                            onClick={() => openCategory("Clothing")}
                        >
                            Clothing
                        </button>
                    </div>
                ) : (
                    <div className="category-filter-tabs">
                        <button
                            className={`category-filter-btn ${filters.type === "All" ? "is-active" : ""}`}
                            type="button"
                            onClick={() => openCategory(filters.category)}
                        >
                            All {filters.category}
                        </button>

                        {categoryTabs.map((group) => (
                            <button
                                key={group.key}
                                className={`category-filter-btn ${filters.type === group.key ? "is-active" : ""}`}
                                type="button"
                                onClick={() => openType(filters.category, group.key)}
                            >
                                {group.title}
                            </button>
                        ))}
                    </div>
                )}

                <p className="product-count-text">
                    Showing {products.length} product{products.length === 1 ? "" : "s"}.
                </p>

                {products.length === 0 ? (
                    <div className="no-results-box">
                        <p>No products match this filter combination. Reset filters to view the full store.</p>
                        <button className="store-small-btn" type="button" onClick={resetFilters}>
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="row">
                        {products.map((product) => (
                            <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
                                <ProductCard
                                    product={product}
                                    viewProduct={viewProduct}
                                    addToCart={addToCart}
                                    goTo={goTo}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function ProductCard({ product, viewProduct, addToCart, goTo }) {
    return (
        <div className="product-card h-100">
            <button className="product-cover-button" type="button" onClick={() => viewProduct(product)} aria-label={`View ${product.name}`}>
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-img"
                    />
                ) : (
                    <div className="product-img-placeholder">
                        {product.badge}<br />Cover Image Area
                    </div>
                )}
            </button>

            <div className="product-card-title">
                <h4>{product.name}</h4>
            </div>

            <div className="product-card-body">
                <div>
                    <p>{product.description}</p>
                    <div className="product-meta">Category: {product.category}</div>
                    <div className="product-meta">Type: {product.type}</div>
                    <div className="product-meta">Variation: {product.variation}</div>
                    <div className="product-meta">Focus: {product.focus}</div>
                    <div className="product-price">{money(product.price)}</div>
                </div>

                <div className="product-button-row">
                    <button className="store-small-btn add-cart-btn" type="button" onClick={() => { addToCart(product); goTo("cart"); }}>
                        Add to Cart
                    </button>
                    <button className="product-detail-btn" type="button" onClick={() => viewProduct(product)}>
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}

function ProductDetail({ product, addToCart, openShop, goTo }) {
    return (
        <section className="product-detail-section">
            <div className="container">
                <div className="row align-items-stretch">
                    <div className="col-lg-6 mb-4">
                        {product.image ? (
                            <div className="detail-image-frame">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="detail-product-img"
                                />
                            </div>
                        ) : (
                            <div className="detail-img-placeholder">
                                {product.name}<br />Single Cover Image Area
                            </div>
                        )}
                    </div>
                    <div className="col-lg-6 mb-4">
                        <div className="detail-panel h-100">
                            <h1>{product.name}</h1>
                            <p>{product.description}</p>
                            <p className="detail-price">{money(product.price)}</p>
                            <ul>
                                {product.details.map((detail) => <li key={detail}>{detail}</li>)}
                            </ul>
                            <p><strong>Focus:</strong> {product.focus}</p>
                            <div className="product-button-row">
                                <button className="store-primary-btn add-cart-btn" type="button" onClick={() => { addToCart(product); goTo("cart"); }}>
                                    Add to Cart
                                </button>
                                <button className="secondary-btn" type="button" onClick={() => openShop()}>
                                    Back to Shop
                                </button>
                                <button className="secondary-btn" type="button" onClick={() => goTo("cart")}>
                                    Go to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CartPage({ cart, cartTotal, changeQuantity, removeItem, startCheckout, openShop }) {
    return (
        <section className="cart-section">
            <div className="container">
                <div className="cart-panel">
                    <h1>Cart</h1>
                    {cart.length === 0 ? (
                        <>
                            <p className="empty-text">Your cart is empty. Explore the store and add equipment or clothing to begin checkout.</p>
                            <button className="store-primary-btn mt-4" type="button" onClick={() => openShop()}>
                                Shop Now
                            </button>
                        </>
                    ) : (
                        <>
                            {cart.map((item) => (
                                <div className="cart-row" key={item.id}>
                                    <div>
                                        <h2 className="cart-row-title">{item.name}</h2>
                                        <p className="cart-row-meta">{item.category} / {item.type} / {item.variation}</p>
                                    </div>
                                    <div className="quantity-controls">
                                        <button className="qty-btn" type="button" onClick={() => changeQuantity(item.id, -1)}>-</button>
                                        <p className="cart-row-meta">{item.quantity}</p>
                                        <button className="qty-btn" type="button" onClick={() => changeQuantity(item.id, 1)}>+</button>
                                    </div>
                                    <p className="cart-row-meta">{money(item.price * item.quantity)}</p>
                                    <button className="remove-btn" type="button" onClick={() => removeItem(item.id)}>Remove</button>
                                </div>
                            ))}
                            <div className="cart-total-box">
                                <p className="cart-total-text">Total: {money(cartTotal)}</p>
                                <button className="store-primary-btn" type="button" onClick={startCheckout}>
                                    Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

function CheckoutPage({ step, setStep, cart, cartTotal, personalInfo, setPersonalInfo, paymentInfo, setPaymentInfo, submitPersonal, submitPayment, placeOrder, goTo }) {
    function onlyDigits(value, maxLength) {
        return value.replace(/\D/g, "").slice(0, maxLength);
    }

    function formatExpiry(value) {
        const digits = value.replace(/\D/g, "").slice(0, 4);

        if (digits.length <= 2) {
            return digits;
        }

        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    if (cart.length === 0 && step !== 2) {
        return (
            <section className="checkout-section">
                <div className="container">
                    <div className="checkout-panel">
                        <h1>Checkout</h1>
                        <p className="empty-text">Your cart is empty. Add products before starting checkout.</p>
                        <button className="store-primary-btn mt-4" type="button" onClick={() => goTo("shop")}>
                            Back to Shop
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="checkout-section">
            <div className="container">
                <div className="checkout-panel">
                    <h1>Checkout</h1>
                    <Stepper step={step} />

                    {step === 0 && (
                        <form onSubmit={submitPersonal}>
                            <div className="checkout-form-grid">
                                <div>
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        id="name"
                                        required
                                        value={personalInfo.name}
                                        onChange={(event) => setPersonalInfo({
                                            ...personalInfo,
                                            name: event.target.value
                                        })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={personalInfo.email}
                                        onChange={(event) => setPersonalInfo({
                                            ...personalInfo,
                                            email: event.target.value
                                        })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        id="phone"
                                        required
                                        type="tel"
                                        inputMode="numeric"
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        placeholder="10 digits"
                                        title="Phone number must be exactly 10 digits."
                                        value={personalInfo.phone}
                                        onChange={(event) => setPersonalInfo({
                                            ...personalInfo,
                                            phone: onlyDigits(event.target.value, 10)
                                        })}
                                    />
                                </div>

                                <div className="form-group-full">
                                    <label htmlFor="address">Shipping Address</label>
                                    <textarea
                                        id="address"
                                        required
                                        rows="3"
                                        value={personalInfo.address}
                                        onChange={(event) => setPersonalInfo({
                                            ...personalInfo,
                                            address: event.target.value
                                        })}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button className="secondary-btn" type="button" onClick={() => goTo("cart")}>
                                    Back to Cart
                                </button>
                                <button className="store-primary-btn" type="submit">
                                    Continue to Payment
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 1 && (
                        <form onSubmit={submitPayment}>
                            <div className="checkout-form-grid">
                                <div>
                                    <label htmlFor="cardName">Name on Card</label>
                                    <input
                                        id="cardName"
                                        required
                                        value={paymentInfo.cardName}
                                        onChange={(event) => setPaymentInfo({
                                            ...paymentInfo,
                                            cardName: event.target.value
                                        })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="cardNumber">Card Number</label>
                                    <input
                                        id="cardNumber"
                                        required
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]{16}"
                                        maxLength="16"
                                        placeholder="16 digits"
                                        title="Card number must be exactly 16 digits."
                                        value={paymentInfo.cardNumber}
                                        onChange={(event) => setPaymentInfo({
                                            ...paymentInfo,
                                            cardNumber: onlyDigits(event.target.value, 16)
                                        })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="expiry">Expiry</label>
                                    <input
                                        id="expiry"
                                        required
                                        type="text"
                                        inputMode="numeric"
                                        pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                                        maxLength="5"
                                        placeholder="MM/YY"
                                        title="Expiry must be in MM/YY format, for example 08/28."
                                        value={paymentInfo.expiry}
                                        onChange={(event) => setPaymentInfo({
                                            ...paymentInfo,
                                            expiry: formatExpiry(event.target.value)
                                        })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="cvv">CVV</label>
                                    <input
                                        id="cvv"
                                        required
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]{3}"
                                        maxLength="3"
                                        placeholder="123"
                                        title="CVV must be exactly 3 digits."
                                        value={paymentInfo.cvv}
                                        onChange={(event) => setPaymentInfo({
                                            ...paymentInfo,
                                            cvv: onlyDigits(event.target.value, 3)
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button className="secondary-btn" type="button" onClick={() => setStep(0)}>
                                    Back to Personal Info
                                </button>
                                <button className="store-primary-btn" type="submit">
                                    Review Order
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <div>
                            <div className="order-summary-box">
                                <h2>Confirm Your Order</h2>
                                <p><strong>Customer:</strong> {personalInfo.name}</p>
                                <p><strong>Email:</strong> {personalInfo.email}</p>
                                <p><strong>Shipping:</strong> {personalInfo.address}</p>
                                <ul>
                                    {cart.map((item) => (
                                        <li key={item.id}>
                                            {item.quantity} × {item.name} — {money(item.price * item.quantity)}
                                        </li>
                                    ))}
                                </ul>
                                <p><strong>Total:</strong> {money(cartTotal)}</p>
                            </div>

                            <div className="form-actions">
                                <button className="secondary-btn" type="button" onClick={() => setStep(1)}>
                                    Back to Payment
                                </button>
                                <button className="store-primary-btn" type="button" onClick={placeOrder}>
                                    Place Order
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

function Stepper({ step }) {
    const labels = ["Cart", "Personal Info", "Payment", "Confirmation"];
    return (
        <div className="stepper" aria-label="Checkout progress">
            {labels.map((label, index) => (
                <div key={label} className={`step-item ${index < step + 1 ? "is-complete" : ""} ${index === step + 1 ? "is-current" : ""}`}>
                    {index + 1}. {label}
                </div>
            ))}
        </div>
    );
}

function ConfirmationPage({ order, survey, setSurvey, surveySent, submitSurvey, openShop, goTo }) {
    return (
        <section className="confirmation-section">
            <div className="container">
                <div className="confirmation-panel">
                    <h1>Order Confirmation</h1>
                    {order ? (
                        <div className="order-summary-box">
                            <h2>Thank you, {order.customer}!</h2>
                            <p>Your order <strong>{order.id}</strong> was confirmed on {order.date}.</p>
                            <ul>
                                {order.items.map((item) => <li key={item.id}>{item.quantity} × {item.name}</li>)}
                            </ul>
                            <p><strong>Total:</strong> {money(order.total)}</p>
                        </div>
                    ) : (
                        <p className="empty-text">No recent order is available yet.</p>
                    )}

                    <div className="survey-box">
                        <h2>Quick Experience Survey</h2>
                        <p>Help us improve the store. This short survey appears after confirmation so it does not interrupt shopping.</p>
                        <form className="survey-form" onSubmit={submitSurvey}>
                            <div className="checkout-form-grid">
                                <div>
                                    <label htmlFor="rating">Overall experience</label>
                                    <select id="rating" required value={survey.rating} onChange={(event) => setSurvey({ ...survey, rating: event.target.value })}>
                                        <option value="">Choose one</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Okay">Okay</option>
                                        <option value="Needs improvement">Needs improvement</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="ease">Was it easy to find products?</label>
                                    <select id="ease" required value={survey.ease} onChange={(event) => setSurvey({ ...survey, ease: event.target.value })}>
                                        <option value="">Choose one</option>
                                        <option value="Very easy">Very easy</option>
                                        <option value="Easy">Easy</option>
                                        <option value="Not sure">Not sure</option>
                                        <option value="Difficult">Difficult</option>
                                    </select>
                                </div>
                                <div className="form-group-full">
                                    <label htmlFor="comment">Comment</label>
                                    <textarea id="comment" rows="3" value={survey.comment} onChange={(event) => setSurvey({ ...survey, comment: event.target.value })} placeholder="What should we improve next?"></textarea>
                                </div>
                            </div>
                            <div className="form-actions">
                                <button className="store-primary-btn" type="submit">Submit Survey</button>
                                <button className="secondary-btn" type="button" onClick={() => goTo("history")}>View Purchase History</button>
                            </div>
                        </form>
                        {surveySent && <div className="survey-thank-you">Thank you for your feedback. Your response helps improve the shopping experience.</div>}
                    </div>

                    <div className="form-actions">
                        <button className="secondary-btn" type="button" onClick={() => openShop()}>Continue Shopping</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HistoryPage({ history, openShop }) {
    return (
        <section className="history-section">
            <div className="container">
                <div className="history-panel">
                    <h1>Purchase History</h1>
                    {history.length === 0 ? (
                        <>
                            <p className="history-text">No orders yet. Complete checkout to see confirmed purchases here.</p>
                            <button className="store-primary-btn mt-4" type="button" onClick={() => openShop()}>Shop Now</button>
                        </>
                    ) : (
                        history.map((order) => (
                            <div className="history-card" key={order.id}>
                                <h2>Order {order.id}</h2>
                                <p><strong>Date:</strong> {order.date}</p>
                                <p><strong>Customer:</strong> {order.customer}</p>
                                <ul>
                                    {order.items.map((item) => <li key={`${order.id}-${item.id}`}>{item.quantity} × {item.name}</li>)}
                                </ul>
                                <p><strong>Total:</strong> {money(order.total)}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

ReactDOM.createRoot(document.getElementById("ecommerce-root")).render(<EcommerceApp />);
