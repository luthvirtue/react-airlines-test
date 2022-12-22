import React, { useEffect, useState } from 'react'
import "./style.css"

// Render data from URL
const renderData = (data) => {
    return(
        <table className='table'>
        <tbody>
            <tr>
                <th>Airlines Name</th>
                <th>Country</th>
                <th>Established Year</th>
            </tr>
            {data.map((item, index)=>(
                <tr key ={index}>
                    <td>{item.name}</td>
                    <td>{item.country}</td>
                    <td>{item.established}</td>
                </tr>
            ))}
        </tbody>
    </table>
    )
}

function Pagination() {
    const [data, setData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const [pageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

    // Select page
    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    }

    // Display items in pages
    const pages = []
    for (let i = 1; i <= Math.ceil(data.length/itemsPerPage); i++){
        pages.push(i);
    }

    // Items per page modifiers
    const indexOfLastItem = currentPage*itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = data.slice(indexOfFirstItem,indexOfLastItem)

    // Display Page Navigation Bar
    const renderPageNumbers = pages.map(number => {
        if (number < maxPageNumberLimit+1 && number > minPageNumberLimit) {
            return (
                <li key={number} 
                id={number} 
                onClick={handleClick}
                className={currentPage === number ? "active" : null}
                >
                    {number}
                </li>
            )
        } else {
            return null
        }
    })

    // Fecth REST API from URL
    useEffect(() => {
        fetch('https://api.instantwebtools.net/v1/airlines')
        .then(response => response.json())
        .then(json => setData(json))
    }, [])

    // Next Button
    const handleNextButton = () => {
        setCurrentPage(currentPage + 1)

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    // Prev Button
    const handlePrevButton = () => {
        setCurrentPage(currentPage - 1)

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }
    
    // [...] Button before Next
    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextButton}> &hellip; </li>
    }

    // [...] Button after Prev
    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevButton}> &hellip; </li>
    }

    // Load More button
    const handleLoadMore = () => {
        setItemsPerPage(itemsPerPage+5)
    }
    
    // Display Content
    return (
        <>
        {renderData(currentItems)}
        
        <button onClick={handleLoadMore} className="loadMore">
            Load More
        </button>
        
        <ul className='pageNumbers'>
            <li>
                <button onClick={handlePrevButton}
                disabled={currentPage === pages[0]?true:false}
                >
                    Prev
                </button> 
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
                <button onClick={handleNextButton}
                disabled={currentPage === pages[pages.length-1]?true:false}                
                >
                    Next
                </button> 
            </li>
        </ul>
        </>
    )
}

export default Pagination