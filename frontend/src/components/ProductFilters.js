// frontend/src/components/ProductFilters.js
import React from 'react';

const ProductFilters = ({ filters, setFilters, onSearch }) => {
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="card p-4 mb-4 shadow-sm">
            <div className="row g-3"> {/* Bootstrap Grid Layout[cite: 4] */}
                <div className="col-md-4">
                    <input 
                        type="text" 
                        name="busqueda"
                        className="form-control" 
                        placeholder="Buscar por nombre o descripción..." 
                        value={filters.busqueda}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-2">
                    <select name="categoria" className="form-select" onChange={handleChange}>
                        <option value="">Todas las Categorías</option>
                        <option value="1">Electrónica</option>
                        <option value="2">Hogar</option>
                        <option value="3">Moda</option>
                        <option value="4">Deportes</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <select name="estado" className="form-select" onChange={handleChange}>
                        <option value="">Cualquier Estado</option>
                        <option value="nuevo">Nuevo</option>
                        <option value="como nuevo">Como nuevo</option>
                        <option value="buen estado">Buen estado</option>
                        {/* ... resto de estados obligatorios[cite: 4] ... */}
                    </select>
                </div>
                <div className="col-md-2">
                    <input 
                        type="number" 
                        name="precioMax"
                        className="form-control" 
                        placeholder="Precio máx €" 
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={onSearch}>Filtrar</button>
                </div>
            </div>
        </div>
    );
};

export default ProductFilters;