import React from 'react';

export default function Tags({ children }: { children: React.ReactNode }) {
    return (
        <div className="tags flex flex-wrap justify-center gap-1">
            { children }
        </div>
    );
}
