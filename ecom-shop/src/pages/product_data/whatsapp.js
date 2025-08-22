import React, { useEffect, useState } from 'react';

const WhatsAppButton = ({ product }) => {
  const [shortUrl, setShortUrl] = useState(null);

  useEffect(() => {
    if (!product) return;

    const phone = product.phone_number;
    const productName = product.name;
    const productUrl = `https://localhost:8000/products/${product.id}`; // Change to actual site URL

    const message = `Hi, I'm interested in your product: ${productName}. Here is the product link: ${productUrl}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    // Shorten with TinyURL
    const shortenWithTinyURL = async (longUrl) => {
      const res = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
      );
      const shortLink = await res.text();
      setShortUrl(shortLink);
    };

    shortenWithTinyURL(whatsappUrl);
  }, [product]);

  if (!shortUrl) {
    return null; // or a loading spinner
  }

  return (
    <a
      href={shortUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all"
    >
      WhatsApp
    </a>
  );
};

export default WhatsAppButton;
