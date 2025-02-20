import {Plot} from "./Homepage";
import PrimaryAppBar from "./PrimaryAppBar";
import {Box} from "@mui/material";
import React from "react";

const plots: Plot[] = [
  {
    filename: '/plots/demoPlot1.png',
    title: 'First Plot',
    description: 'Description of first plot'
  },
  {
    filename: '/plots/demoPlot2.png',
    title: 'Second Plot',
    description: 'Description of second plot'
  },
  {
    filename: '/plots/demoPlot3.png',
    title: 'Second Plot',
    description: 'Description of second plot'
  }
];

export default function ActualViz() {
    return (
        <Box>
            <PrimaryAppBar/>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plots.map((plot, index) => (
                        <div
                            key={index}
                            className="border rounded-lg p-4 shadow-md"
                        >
                            <h2 className="text-xl font-semibold mb-2">{plot.title}</h2>
                            <img
                                src={plot.filename}
                                alt={plot.title}
                                className="w-full h-auto rounded-md"
                            />
                            {plot.description && (
                                <p className="mt-2 text-gray-600">{plot.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Box>
    )
}