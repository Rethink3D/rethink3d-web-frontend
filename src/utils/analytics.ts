import { logEvent } from "firebase/analytics";
import { analytics } from "../auth/firebaseConfig";

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, params);
    } catch (error) {
      console.error("Erro ao rastrear evento:", error);
    }
  }
};

export const trackHomeView = () => {
  trackEvent("page_view_home");
};

export const trackContactView = () => {
  trackEvent("page_view_contact");
};

export const trackProductCatalogView = () => {
  trackEvent("page_view_products_catalog");
};

export const trackMakerCatalogView = () => {
  trackEvent("page_view_makers_catalog");
};

export const trackProductClick = (
  productId: string,
  productName: string,
  source: string,
) => {
  trackEvent("product_click", {
    product_id: productId,
    product_name: productName,
    source: source,
  });
};

export const trackProductView = (
  productId: string,
  productName: string,
  price?: number,
) => {
  trackEvent("product_view", {
    product_id: productId,
    product_name: productName,
    price: price,
    currency: "BRL",
  });
};

export const trackMakerClick = (
  makerId: string,
  makerName: string,
  source: string,
) => {
  trackEvent("maker_click", {
    maker_id: makerId,
    maker_name: makerName,
    source: source,
  });
};

export const trackMakerView = (makerId: string, makerName: string) => {
  trackEvent("maker_profile_view", {
    maker_id: makerId,
    maker_name: makerName,
  });
};

export const trackAppStoreClick = (source: string) => {
  trackEvent("app_download_click_ios", {
    source: source,
  });
};

export const trackGooglePlayClick = (source: string) => {
  trackEvent("app_download_click_android", {
    source: source,
  });
};

export const trackDownloadCTA = (ctaType: string, source: string) => {
  trackEvent("app_download_cta", {
    cta_type: ctaType,
    source: source,
  });
};

export const trackExploreCatalogClick = () => {
  trackEvent("home_explore_catalog_click");
};

export const trackFindMakersClick = () => {
  trackEvent("home_find_makers_click");
};

export const trackContactEmailClick = () => {
  trackEvent("contact_email_click");
};

export const trackContactInstagramClick = () => {
  trackEvent("contact_instagram_click");
};

export const trackContactSupportClick = () => {
  trackEvent("contact_support_click");
};

export const trackContactCTAClick = () => {
  trackEvent("home_contact_cta_click");
};
