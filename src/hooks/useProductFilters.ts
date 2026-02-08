import { useState, useMemo } from "react";
import type { ProductPreviewDTO } from "../types/dtos";

export const useProductFilters = (products: ProductPreviewDTO[]) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isPersonalizableFilter, setIsPersonalizableFilter] = useState<
    boolean | null
  >(null);

  
  const availableCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    products.forEach((product) => {
      product.categories?.forEach((category) => {
        categoriesSet.add(category);
      });
    });
    return Array.from(categoriesSet).sort();
  }, [products]);

  
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      
      const matchesSearch =
        searchText.trim() === "" ||
        product.name.toLowerCase().includes(searchText.toLowerCase());

      
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) =>
          product.categories?.includes(category),
        );

      
      const matchesPersonalizable =
        isPersonalizableFilter === null ||
        product.isPersonalizable === isPersonalizableFilter;

      return matchesSearch && matchesCategory && matchesPersonalizable;
    });
  }, [products, searchText, selectedCategories, isPersonalizableFilter]);

  
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategories.length > 0) count += selectedCategories.length;
    if (isPersonalizableFilter !== null) count += 1;
    return count;
  }, [selectedCategories, isPersonalizableFilter]);

  return {
    setSearchText,
    selectedCategories,
    setSelectedCategories,
    isPersonalizableFilter,
    setIsPersonalizableFilter,
    availableCategories,
    filteredProducts,
    activeFilterCount,
  };
};
