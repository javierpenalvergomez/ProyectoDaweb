import React, { useState } from 'react';

const AddProduct = () => {
    // Estado inicial del formulario con los campos básicos requeridos[cite: 4]
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        precio: '',
        estado: 'buen estado', // Valor por defecto
        categoria_id: '1', // Valor por defecto (1 = Electrónica según tu init.sql)
        lugar_recogida: '',
        envio_disponible: false
    });
    const [mensaje, setMensaje] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData) // Importante enviar como JSON
            });
            
            const data = await response.json();
            if (data.success) {
                setMensaje({ tipo: 'success', texto: 'Producto publicado correctamente.' });
                // Aquí podrías reiniciar el formulario si lo deseas
            } else {
                setMensaje({ tipo: 'danger', texto: 'Error al publicar el producto.' });
            }
        } catch (error) {
            setMensaje({ tipo: 'danger', texto: 'Error de conexión con el servidor.' });
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Dar de Alta un Producto</h2>
            
            {mensaje && <div className={`alert alert-${mensaje.tipo}`}>{mensaje.texto}</div>}
            
            <form onSubmit={handleSubmit}>
                {/* Grid Layout de Bootstrap exigido en la rúbrica */}
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Título</label>
                        <input type="text" className="form-control" name="titulo" value={formData.titulo} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Precio (€)</label>
                        <input type="number" step="0.01" className="form-control" name="precio" value={formData.precio} onChange={handleChange} required />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" name="descripcion" rows="3" value={formData.descripcion} onChange={handleChange} required></textarea>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Estado</label>
                        <select className="form-select" name="estado" value={formData.estado} onChange={handleChange}>
                            {/* Opciones restrictivas marcadas por el documento */}
                            <option value="nuevo">Nuevo</option>
                            <option value="como nuevo">Como nuevo</option>
                            <option value="buen estado">Buen estado</option>
                            <option value="aceptable">Aceptable</option>
                            <option value="para piezas o reparar">Para piezas o reparar</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Categoría</label>
                        <select className="form-select" name="categoria_id" value={formData.categoria_id} onChange={handleChange}>
                            {/* Estas deberían coincidir con los IDs de tu tabla categorias */}
                            <option value="1">Electrónica</option>
                            <option value="2">Hogar</option>
                            <option value="3">Moda</option>
                            <option value="4">Deportes</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Lugar de Recogida</label>
                        <input type="text" className="form-control" name="lugar_recogida" value={formData.lugar_recogida} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3 d-flex align-items-center">
                        <div className="form-check mt-4">
                            <input className="form-check-input" type="checkbox" name="envio_disponible" id="envio" checked={formData.envio_disponible} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="envio">
                                Envío disponible
                            </label>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-3">Publicar Producto</button>
            </form>
        </div>
    );
};

export default AddProduct;