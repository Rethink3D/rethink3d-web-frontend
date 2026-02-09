import { useState, useMemo } from "react";
import type { MakerProductDTO } from "../types/dtos";

export const useMakerProductFilters = (products: MakerProductDTO[]) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isPersonalizableFilter, setIsPersonalizableFilter] = useState<
    boolean | null
  >(null);
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | null>(null);

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

      const matchesActive =
        isActiveFilter === null || product.isActive === isActiveFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPersonalizable &&
        matchesActive
      );
    });
  }, [
    products,
    searchText,
    selectedCategories,
    isPersonalizableFilter,
    isActiveFilter,
  ]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategories.length > 0) count += 1;
    if (isPersonalizableFilter !== null) count += 1;
    if (isActiveFilter !== null) count += 1;
    return count;
  }, [selectedCategories, isPersonalizableFilter, isActiveFilter]);

  return {
    searchText,
    setSearchText,
    selectedCategories,
    setSelectedCategories,
    isPersonalizableFilter,
    setIsPersonalizableFilter,
    isActiveFilter,
    setIsActiveFilter,
    availableCategories,
    filteredProducts,
    activeFilterCount,
  };
};
