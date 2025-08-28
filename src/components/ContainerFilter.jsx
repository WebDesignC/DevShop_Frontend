import React, { useState, useEffect } from 'react'
import { Separator } from '../components/Separator'
import '../styles/ContainerFilter.css'

export const ContainerFilter = ({ onCategoryChange, categories, initialSelected = [] }) => {
    const [selectedCategories, setSelectedCategories] = useState(initialSelected)

    useEffect(() => {
        if (initialSelected.length > 0) {
            setSelectedCategories(initialSelected);
            onCategoryChange(initialSelected);
        }
    }, [initialSelected, onCategoryChange]); 

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
            </div>
        </div>
    )
}