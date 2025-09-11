import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import MarketPrices from '@/components/MarketPrices';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock market data
const mockPriceData = [
  {
    crop: "Wheat",
    variety: "PBW 343",
    market: "Ludhiana Mandi",
    currentPrice: 2150,
    msp: 2125,
    previousPrice: 2100,
    unit: "quintal",
    lastUpdated: "2 hours ago",
    trend: 'up' as const,
  },
  {
    crop: "Rice",
    variety: "Basmati 1121",
    market: "Karnal Mandi",
    currentPrice: 4200,
    msp: 2040,
    previousPrice: 4300,
    unit: "quintal",
    lastUpdated: "1 hour ago",
    trend: 'down' as const,
  },
  {
    crop: "Tomato",
    variety: "Hybrid",
    market: "Delhi Azadpur",
    currentPrice: 3500,
    msp: 0,
    previousPrice: 3200,
    unit: "quintal",
    lastUpdated: "30 minutes ago",
    trend: 'up' as const,
  },
  {
    crop: "Onion",
    variety: "Red",
    market: "Nashik Mandi",
    currentPrice: 2800,
    msp: 0,
    previousPrice: 2800,
    unit: "quintal",
    lastUpdated: "45 minutes ago",
    trend: 'stable' as const,
  },
  {
    crop: "Cotton",
    variety: "Medium Staple",
    market: "Rajkot Mandi",
    currentPrice: 6500,
    msp: 6080,
    previousPrice: 6200,
    unit: "quintal",
    lastUpdated: "3 hours ago",
    trend: 'up' as const,
  }
];

const MarketsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState<string>("");

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            size="sm"
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Market Prices</h1>
            <p className="text-muted-foreground">Real-time prices from mandis across India</p>
          </div>
        </div>

        <MarketPrices 
          priceData={mockPriceData} 
          selectedCrop={selectedCrop}
        />

        <div className="text-center mt-8">
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate('/voice')} 
              variant="voice" 
              size="lg"
            >
              🎙️ Voice Assistant
            </Button>
            <Button 
              onClick={() => navigate('/camera')} 
              variant="camera" 
              size="lg"
            >
              📷 Disease Detection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketsPage;