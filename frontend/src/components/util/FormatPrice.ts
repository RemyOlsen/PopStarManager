// Formats the price of a pop star in thousands or millions
function formatPrice(price: number) {
    if (price === 0) return "Priceless";
    if (price >= 1000) return `$${(price / 1000).toLocaleString("en-US")}M`; 
    return `$${price.toLocaleString("en-US")}K`;
};

export default formatPrice;