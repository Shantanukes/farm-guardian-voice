import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, MapPin, Calendar } from 'lucide-react';

interface PriceData {
  crop: string;
  variety: string;
  market: string;
  currentPrice: number;
  msp: number;
  previousPrice: number;
  unit: string;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

interface MarketPricesProps {
  priceData: PriceData[];
  selectedCrop?: string;
}

const MarketPrices: React.FC<MarketPricesProps> = ({ priceData, selectedCrop }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <div className="h-4 w-4 bg-muted rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'success';
      case 'down':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Market Prices</h2>
          <p className="text-muted-foreground">Live prices from local mandis and MSP rates</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Updated Today
        </Badge>
      </div>

      <div className="grid gap-4">
        {priceData.map((item, index) => (
          <Card 
            key={index} 
            className={`p-6 ${selectedCrop === item.crop ? 'ring-2 ring-primary' : ''}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{item.crop}</h3>
                <p className="text-sm text-muted-foreground">{item.variety}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {item.market}
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Market Price</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      {formatPrice(item.currentPrice)}
                    </span>
                    <span className="text-sm text-muted-foreground">/{item.unit}</span>
                    {getTrendIcon(item.trend)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">MSP Rate</p>
                  <span className="text-xl font-semibold text-warning">
                    {formatPrice(item.msp)}
                  </span>
                  <span className="text-sm text-muted-foreground">/{item.unit}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Price Change</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={getTrendColor(item.trend) as any}>
                      {item.trend === 'up' ? '+' : item.trend === 'down' ? '-' : ''}
                      {formatPrice(Math.abs(item.currentPrice - item.previousPrice))}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">vs. last week</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  Last updated: {item.lastUpdated}
                </span>
                <div className="flex gap-4">
                  {item.currentPrice > item.msp ? (
                    <Badge variant="success">Above MSP</Badge>
                  ) : (
                    <Badge variant="warning">Below MSP</Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-muted/50">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-accent/20">
            💡
          </div>
          <div>
            <h4 className="font-semibold mb-2">Market Insights</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Prices are updated daily from verified mandi sources</li>
              <li>• MSP (Minimum Support Price) is set by government</li>
              <li>• Consider transport costs when planning sales</li>
              <li>• Best selling time is typically between 10 AM - 2 PM</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MarketPrices;