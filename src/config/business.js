/**
 * Business Configuration for Pirah
 *
 * Dedicated WhatsApp commerce line:
 * +234 705 512 5187 (07055125187)
 */

export const PIRAH_CONFIG = {
  businessName: 'Pirah Store',

  // WhatsApp Contact Configuration
  whatsapp: {
    number: '2347055125187',
    displayNumber: '+234 705 512 5187',
    isConfigured: true,
    defaultMessage:
      "Hello Pirah! I'm interested in the products shown on your website. Could you please share more details?",
  },

  knownCategories: ['Clothes', 'Shoes', 'Palm Slippers'],
};

/**
 * Helper to generate prefilled WhatsApp enquiry URLs.
 * Returns null if the WhatsApp number has not yet been configured.
 *
 * @param {string} [productName] - Specific product name to inquire about
 * @returns {string | null}
 */
export function getWhatsAppInquiryUrl(productName) {
  if (!PIRAH_CONFIG.whatsapp.isConfigured || !PIRAH_CONFIG.whatsapp.number) {
    return null;
  }

  const text = productName
    ? `Hello Pirah! I'm interested in ${productName} shown on your website. Could you please tell me more about it?`
    : PIRAH_CONFIG.whatsapp.defaultMessage;

  return `https://wa.me/${PIRAH_CONFIG.whatsapp.number}?text=${encodeURIComponent(text)}`;
}
