"use client";
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { tourPackages } from '@/lib/data'
import { TourPackageCard } from '../ui/card'
import { slugify } from "@/lib/utils";
import { PrimeryBtn } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import "../../styles/tourPackage.scss"

const TourPackage = () => {
    return (
        <div className='tour-package-sec bg-none'>
            {/* <Container> */}
            {/* <TitleComponent
                    title="Tour Packages"
                    description="Travel in comfort with our range of vehicles and experienced drivers"
                /> */}
            <Row className='g-4'>
                {tourPackages.map((value, index) => (
                    <Col key={index} lg={3} md={6} sm={12} xs={12}>
                        <TourPackageCard
                            tour={value}
                            tourLink={`/tour-package/${slugify(value.name || "")}`}
                        />
                    </Col>
                ))}
            </Row>

            <PrimeryBtn
                title="View All Tour"
                btnLink="/tour-package"
                className="primery-btn-style-2 mt-4"
                iconRight={<ArrowRight size={18} />}
            />
            {/* </Container> */}
        </div>
    )
}

export default TourPackage