"use client";

import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Circle, Info } from "lucide-react";
import { HighlightsModal } from "@/components/ui/common";

export default function HighlightsSection({ features }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="section-block m-0">
            
            

            <HighlightsModal open={open} handleClose={() => setOpen(false)}>
                <div className="p-4">
                    <h3 className="fw-bold mb-3">Experience Highlights</h3>
                    <ul className="list-unstyled">
                        {features.map((f, idx) => (
                            <li key={idx} className="mb-2">✅ {f}</li>
                        ))}
                    </ul>
                    <p className="text-muted small">These highlights are curated for the 2026 Nashik Kumbh Mela experience.</p>
                </div>
            </HighlightsModal>
        </div>
    );
}