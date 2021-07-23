import React from "react";

import VehicleService from "services/VehicleService";

const useVehicle = ({ size = 10 }) => {
  const [vehiclesTotal, setVehiclesTotal] = React.useState(0);
  const [vehicles, setVehicles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchVehicles = React.useCallback(
    async page => {
      setLoading(true);
      try {
        const { content = [], totalElements = 0 } =
          await VehicleService.getVehicles(page, size);
        setVehiclesTotal(totalElements);
        setVehicles(content);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [size],
  );

  const deleteVehicleById = async id => {
    setLoading(true);
    try {
      await VehicleService.deleteVehicleById(id);
      await fetchVehicles(0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    vehicles,
    fetchVehicles,
    loading,
    vehiclesTotal,
    deleteVehicleById,
  };
};

export default useVehicle;