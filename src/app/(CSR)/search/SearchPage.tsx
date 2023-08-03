"use client"

import { UnsplashImage } from "@/models/unsplash-image";
import {FormEvent, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap"
import Image from "next/image"
import styles from './SearchPage.module.css'


export default function SearchPage (){
    const [searchResults, setSearchResults] = useState<UnsplashImage[] | null >(null)
    const [searchResultsLoading, setSearchResultsLoading] = useState(false)
    const [searchResultsLoadingIsError, setsearchResultsLoadingIsError] = useState(false)

    async function handleSubmit(e: FormEvent <HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement)
        const query = formData.get("query")?.toString().trim();

        if(query) {
            try {
                setSearchResults(null);
                setsearchResultsLoadingIsError(false);
                setSearchResultsLoading(true);
                const response = await fetch("/api/search?query=" + query)
                const images: UnsplashImage[]=  await response.json();
                setSearchResults(images);
            } catch (error) {
                console.log(error);
                setsearchResultsLoadingIsError(true);
            } finally {
                setSearchResultsLoading(false);
            }

        }
    }

    return ( 
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="search-imput"></Form.Group>
            <Form.Label> Search query </Form.Label>
            <Form.Control
            name="query"
            placeholder="E.g. cats, hotdogs"></Form.Control>
            <Button type="submit" className="mb-3"> Search</Button>
        </Form>
        <div className="d-flex felx-column align-items-center">
            {searchResultsLoading && <Spinner animation="border"/>}
            {searchResultsLoadingIsError && <p> Something went wrong. Please try again</p>}
            {searchResults?.length === 0  && <p> Nothing found. Try a diffrent query</p>}
        </div>
        {searchResults &&
        <>
            {
                searchResults.map(image => (
                    <Image 
                    src={image.urls.raw}
                    width={250}
                    height={250}
                    alt={image.description}
                    key={image.urls.raw}
                    className={styles.image}
                    />
                ))
            }
        </>

        }
    </div>)
    
}
