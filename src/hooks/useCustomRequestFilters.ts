import { useState, useMemo } from "react";
import type { CustomRequestDTO, ServiceTypeEnum } from "../types/dtos";

export const useCustomRequestFilters = (requests: CustomRequestDTO[]) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<
    ServiceTypeEnum | "all"
  >("all");

  const availableCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    requests.forEach((request) => {
      request.categories?.forEach((category) => {
        categoriesSet.add(category.name);
      });
    });
    return Array.from(categoriesSet).sort();
  }, [requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      
      const matchesSearch =
        searchText.trim() === "" ||
        (request.title?.toLowerCase() || "").includes(
          searchText.toLowerCase(),
        ) ||
        (request.description?.toLowerCase() || "").includes(
          searchText.toLowerCase(),
        );

      
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((catName) =>
          request.categories?.some((cat) => cat.name === catName),
        );

      
      const matchesService =
        selectedService === "all" || request.service === selectedService;

      return matchesSearch && matchesCategory && matchesService;
    });
  }, [requests, searchText, selectedCategories, selectedService]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategories.length > 0) count += selectedCategories.length;
    if (selectedService !== "all") count += 1;
    return count;
  }, [selectedCategories, selectedService]);

  return {
    searchText,
    setSearchText,
    selectedCategories,
    setSelectedCategories,
    selectedService,
    setSelectedService,
    availableCategories,
    filteredRequests,
    activeFilterCount,
  };
};
