// src/utils/formatPrice.js
export const formatRupee = (amount) => `₹${Number(amount).toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
