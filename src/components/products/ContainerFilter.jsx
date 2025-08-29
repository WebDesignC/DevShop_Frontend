import React, { useState } from 'react'
import { Separator } from '../shared/Separator'
import '../../styles/ContainerFilter.css'
import { useCategories } from '../../hooks/products/useCategories' 

export const ContainerFilter = ({ onCategoryChange }) => {
    const { data: categories, isLoading, error } = useCategories()
    const [selectedCategories, setSelectedCategories] = useState([])

    const handleCategoryChange = (category) => {
        const newSelectedCategories = selectedCategories.includes(category) 
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category]
        
        setSelectedCategories(newSelectedCategories)
        onCategoryChange(newSelectedCategories)
    }

    return (
        <div className='container-filter'>
            <h3 className='filter-title'>Filtros</h3>

            <Separator />

            <div className='filter-section'>
                <h3 className='section-title'>Categorías</h3>

                {isLoading ? (
                    <div className='loading-categories'>
                        <div className='loading-spinner'></div>
                        <p>Cargando categorías...</p>
                    </div>
                ) : error ? (
                    <div className='error-message'>
                        <p>Error al cargar categorías</p>
                    </div>
                ) : (
                    <div className='categories-list'>
                        {categories.map(category => (
                            <label key={category} className='category-item'>
                                <input
                                    type='checkbox'
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                    className='category-checkbox'
                                />
                                <span className='category-label'>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}