import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Estado para los filtros exigidos en el enunciado
    const [filters, setFilters] = useState({
        busqueda: '',
        categoria: '',
        estado: '',
        precioMax: ''
    });

    // Función para obtener productos (se llama al cargar y al filtrar)
    const fetchProductos = async () => {
        setLoading(true);
        try {
            // Convertimos el objeto de filtros en parámetros de URL (Query Strings)
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`http://localhost:3000/api/productos?${queryParams}`);
            const data = await response.json();
            
            if (data.success) {
                setProductos(data.data);
            } else {
                setError('Error al cargar los productos');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    // Carga inicial
    useEffect(() => {
        fetchProductos();
    }, []);

    // Manejador de cambios en los inputs
    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    // Manejador del botón de búsqueda
    const handleSearch = (e) => {
        e.preventDefault();
        fetchProductos();
    };

    if (loading && productos.length === 0) return <div className="container mt-5"><p>Cargando catálogo...</p></div>;

    return (
        <div className="container my-5">
            <h2 className="mb-4">Catálogo de Productos</h2>

            {/* 2. Sección de Filtros usando Grid Layout de Bootstrap */}
            <form className="card p-3 mb-5 shadow-sm bg-light" onSubmit={handleSearch}>
                <div className="row g-3">
                    <div className="col-md-4">
                        <input 
                            type="text" 
                            name="busqueda"
                            className="form-control" 
                            placeholder="Buscar por título o descripción..." 
                            value={filters.busqueda}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <select name="categoria" className="form-select" value={filters.categoria} onChange={handleFilterChange}>
                            <option value="">Categorías</option>
                            <option value="1">Electrónica</option>
                            <option value="2">Hogar</option>
                            <option value="3">Moda</option>
                            <option value="4">Deportes</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select name="estado" className="form-select" value={filters.estado} onChange={handleFilterChange}>
                            <option value="">Estado</option>
                            <option value="nuevo">Nuevo</option>
                            <option value="como nuevo">Como nuevo</option>
                            <option value="buen estado">Buen estado</option>
                            <option value="aceptable">Aceptable</option>
                            <option value="para piezas o reparar">Para piezas o reparar</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <input 
                            type="number" 
                            name="precioMax"
                            className="form-control" 
                            placeholder="Precio máx €" 
                            value={filters.precioMax}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary w-100">Buscar</button>
                    </div>
                </div>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            {/* 3. Listado de Productos con Bootstrap Grid */}
            <div className="row">
                {productos.map(producto => (
                    <div className="col-12 col-md-6 col-lg-4 mb-4" key={producto.id}>
                        {/* Se mantiene la clase para aplicar CSS Grid en los estilos */}
                        <div className="card h-100 shadow-sm producto-grid-card">
                            <div className="card-body">
                                <h5 className="card-title text-primary">{producto.titulo}</h5>
                                <h6 className="card-subtitle mb-2 text-dark fw-bold">{producto.precio} €</h6>
                                <p className="card-text text-muted small">{producto.descripcion}</p>
                            </div>
                            <div className="card-footer bg-white border-0 pb-3">
                                <span className="badge rounded-pill bg-info text-dark me-2">{producto.categoria_nombre}</span>
                                <span className="badge rounded-pill bg-secondary">{producto.estado}</span>
                                <div className="mt-2 text-end">
                                    <small className="text-muted">Vendedor: {producto.vendedor_nombre}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {productos.length === 0 && !loading && (
                <div className="text-center my-5">
                    <p className="lead text-muted">No se encontraron productos con esos filtros.</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;