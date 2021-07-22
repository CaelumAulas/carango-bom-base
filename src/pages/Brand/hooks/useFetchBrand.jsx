import React, { useEffect, useState } from "react";
import BrandService from "services/BrandService";

export function useFetchBrand(id) {
  const [brand, setBrand] = useState({});
  useEffect(() => {

    const fetchBrand = async () => {
      const resp = await BrandService.consultar(id)
      if (resp.id) {
        return setBrand(resp);
      }
      return setBrand("");
    };

    !!id && fetchBrand();

  }, [id]);
  return brand;
}