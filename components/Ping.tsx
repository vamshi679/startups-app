import React from "react";

const Ping = () => {
    return (
        <div className="fixed bottom-8 right-6 z-50">
            <div className="relative flex items-center justify-center">
        <span className="flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-blue-700"></span>
        </span>
            </div>
        </div>
    );
};
export default Ping;