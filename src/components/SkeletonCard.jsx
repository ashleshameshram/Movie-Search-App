import React from 'react'
import './SkeletonCard.css'

export default function SkeletonCard() {
    return (
        <div className='skeleton-container'>
            <div className="skeleton-poster shimmer"></div>
            <div className="skeleton-title shimmer"></div>
            <div className="skeleton-year shimmer"></div>
        </div>
    )
}