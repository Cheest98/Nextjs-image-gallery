import { UnsplashImage } from "@/models/unsplash-image"
import styles from "./TopicPage.module.css"
import Image from "next/image"
import {Alert} from "@/components/bootstrap"
import { Metadata } from "next"

interface PageProps{
    params: {topic: string}
    
}

export function generateMetadata ({params: {topic}}: PageProps): Metadata{
    return {
        title: topic
    }
}

export function generateStaticParams() {
    return ["health", "fitness", "coding"]. map( topic =>({ topic }))
}

export default async function Page({params: {topic}}: PageProps) {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
    const images: UnsplashImage[] = await response.json()

    return (
        <div>
            <Alert>
                This page uses <strong>generateStaticParams</strong> to render andcache static pages at build time,
                even though the URL has a dynamic parameter. Pages that are not included in  generateStaticParams will be fatched & rendered
                on first access and then cached for subsequent requests(this can be disabled)
            </Alert>
            <h1>{topic}</h1>
            {
                images.map(image => (
                    <Image
                    src={image.urls.raw}
                    height ={250}
                    width={250}
                    alt={image.description}
                    key={image.urls.raw}
                    className={styles.image}
                    />
                ))
            }
        </div>
    )
}
