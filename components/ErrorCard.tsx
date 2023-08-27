import React from 'react';

export default function ErrorCard({ children, title, description }: { children: React.ReactNode, title: string, description: string }) {
    return (
        <div className="rounded-md p-4 border flex flex-col gap-3 items-center w-full">
            { children }
            <div className="info flex flex-col items-center text-center">
                <div className="title text-2xl font-medium">{ title }</div>
                <div className="description">{ description }</div>
            </div>
        </div>
    );
}
