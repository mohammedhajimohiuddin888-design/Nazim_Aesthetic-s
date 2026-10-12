export const BUSINESS_CONFIG = {
  name: 'NAZIM',
  tagline: 'Fine Jewellery from Charminar · Hyderabad',
  phoneDisplay: '+91 81216 04194',
  phoneNumber: '918121604194',
  whatsappUrl: 'https://wa.me/918121604194',
  getWhatsAppProductUrl: (productName: string, productCode: string, price: number) => {
    const text = encodeURIComponent(
      `Salam/Hello NAZIM, I am interested in "${productName}" (Code: ${productCode}, ₹${price.toLocaleString('en-IN')}) from your Charminar stall.`
    );
    return `https://wa.me/918121604194?text=${text}`;
  },
  getWhatsAppGeneralUrl: (context?: string) => {
    const text = encodeURIComponent(
      context
        ? `Salam/Hello NAZIM, ${context}`
        : `Salam/Hello NAZIM, I would like to enquire about your jewellery collection at your Charminar stall.`
    );
    return `https://wa.me/918121604194?text=${text}`;
  },
  location: 'Stall No. 10, Charminar Heritage Walkway, Hyderabad, Telangana 500002',
  landmark: 'Steps from Mecca Masjid Gate & Laad Bazaar, Old City, Hyderabad',
  hours: 'Open Daily: 11:30 AM – 10:30 PM IST',
  instagramHandle: '@nazimz10jewellery',
  instagramUrl: 'https://instagram.com/nazimz10jewellery',
};
