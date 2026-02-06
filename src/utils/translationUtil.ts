export const translateService = (service: string): string => {
  if (!service) return "";
  const normalized = service.toLowerCase().trim();
  const map: Record<string, string> = {
    printing: "Impressão 3D",
    printing_modeling: "Modelagem & Impressão",
    modeling: "Modelagem 3D",
    scanning: "Escaneamento 3D",
    prototyping: "Prototipagem",
  };
  return map[normalized] || service;
};

export const translateCategory = (category: string): string => {
  if (!category) return "";

  return category;
};
