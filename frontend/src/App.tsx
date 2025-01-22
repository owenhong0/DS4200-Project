import React from 'react';

interface Plot {
  filename: string;
  title: string;
  description?: string;
}

const plots: Plot[] = [
  {
    filename: 'plots/plot1.png',
    title: 'First Plot',
    description: 'Description of first plot'
  },
  {
    filename: 'plots/plot2.png',
    title: 'Second Plot',
    description: 'Description of second plot'
  }
];

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Data Visualization Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        helloworld
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
  );
};

export default App;