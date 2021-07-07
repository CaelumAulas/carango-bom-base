import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import BrandService from '../../services/BrandService';

import Table from '../../components/Table/Table';

const columns = [{ field: 'name', headerName: 'Marca', width: 200 }];

function BrandList() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState();
  const history = useHistory();

  function create() {
    history.push('/cadastro-Brand');
  }

  function update() {
    history.push('/alteracao-Brand/' + selectedBrand.id);
  }

  function deleteBrand() {
    BrandService.delete(selectedBrand).then(() => {
      setSelectedBrand(null);
      fetchBrands();
    });
  }

  useEffect(() => fetchBrands(), []);

  function fetchBrands() {
    BrandService.getAll().then((data) => setBrands(data));
  }

  return (
    <div style={{ height: 300, width: '100%' }}>
      <Table
        rows={brands}
        columns={columns}
        addItem={create}
        updateItem={update}
        deleteItem={deleteBrand}
        selectedItem={selectedBrand}
        rowSelectedFunction={setSelectedBrand}
      />
    </div>
  );
}

export default BrandList;
