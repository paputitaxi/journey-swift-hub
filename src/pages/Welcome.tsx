import React from 'react';

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-foreground">Welcome</h1>
        <p className="text-muted-foreground">Welcome page content.</p>
      </div>
    </div>
  );
};

export default Welcome;