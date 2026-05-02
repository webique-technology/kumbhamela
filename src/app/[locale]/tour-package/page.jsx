import React, { Suspense } from "react";
import "../../../styles/blog.scss";
import TourDetailPage from "./TourPackageList";



export default function TourPage() {
    return (
        <main>
            <Suspense fallback={<div className="text-center section-padding">Loading Tours...</div>}>
                <TourDetailPage />
            </Suspense>
        </main>
    );
}