import { useState, useMemo } from "react";
import type { MakerPreviewDTO } from "../types/dtos";

export const useMakerFilters = (makers: MakerPreviewDTO[]) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(
    [],
  );

  
  const availableCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    makers.forEach((maker) => {
      maker.categories?.forEach((category) => {
        categoriesSet.add(category);
      });
    });
    return Array.from(categoriesSet).sort();
  }, [makers]);

  
  const filteredMakers = useMemo(() => {
    return makers.filter((maker) => {
      
      const matchesSearch =
        searchText.trim() === "" ||
        maker.name.toLowerCase().includes(searchText.toLowerCase()) ||
        maker.description.toLowerCase().includes(searchText.toLowerCase());

      
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) =>
          maker.categories?.includes(category),
        );

      
      const matchesServiceType =
        selectedServiceTypes.length === 0 ||
        selectedServiceTypes.includes(maker.service);

      return matchesSearch && matchesCategory && matchesServiceType;
    });
  }, [makers, searchText, selectedCategories, selectedServiceTypes]);

  
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategories.length > 0) count += selectedCategories.length;
    if (selectedServiceTypes.length > 0) count += selectedServiceTypes.length;
    return count;
  }, [selectedCategories, selectedServiceTypes]);

  return {
    setSearchText,
    selectedCategories,
    setSelectedCategories,
    selectedServiceTypes,
    setSelectedServiceTypes,
    availableCategories,
    filteredMakers,
    activeFilterCount,
  };
};
