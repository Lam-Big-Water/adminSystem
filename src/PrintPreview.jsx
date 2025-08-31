// PrintPreview.jsx
import React from 'react';

const PrintPreview = ({ data, onCloseModal }) => {
  const handlePrint = (e) => {
    e.stopPropagation();
    window.print();
  }
  return (
      <div className="">
        <div className="">
          <h2 className="text-xl font-bold">Preview</h2>
          <div className="flex gap-2">
            <button 
              onClick={handlePrint}
              className="bg-white text-black px-6 py-2 outline-0 focus:outline-2 focus:outline-blue-500 hover:bg-white/90 rounded-sm cursor-pointer"
            >
              Print
            </button>
            <button 
              onClick={() => onCloseModal?.()}
              className="px-6 py-2 border-[1.4px] border-[var(--border)] focus:outline-2 focus:outline-blue-500 cursor-pointer hover:bg-gray-500/20 rounded-sm"
            >
              Cancel
            </button>
          </div>
        </div>
        
        <div id="print-content" className="p-6 ">
          <div className="border-b-2 border-black pb-4 mb-6">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-[var(--text-gray)]">Date: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <img 
                src={data.image} 
                alt={data.description} 
                className="w-full h-auto max-h-64 object-contain border"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Name:</h3>
                <p>{data.name}</p>
              </div>
              <div>
                <h3 className="font-semibold">MaxCapacity:</h3>
                <p>{data.maxCapacity}</p>
              </div>
              <div>
                <h3 className="font-semibold">Price:</h3>
                <p>{data.regularPrice}</p>
              </div>
              <div>
                <h3 className="font-semibold">Discount:</h3>
                <p>{data.discount}</p>
              </div>
            </div>
          </div>
          
          {data.description && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="whitespace-pre-line">{data.description}</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default PrintPreview;