import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Camera, TrendingUp, Leaf, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-agriculture.jpg';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    farmersHelped: 50000,
    diseasesDetected: 125000,
    accuracyRate: 94,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Smart Farming
            <span className="block text-accent">AI Assistant</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Detect crop diseases instantly with AI, get real-time market prices, 
            and receive expert recommendations to maximize your harvest
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <Button
              onClick={() => navigate('/voice')}
              variant="voice"
              size="hero"
              className="w-full md:w-auto"
            >
              <Mic className="h-8 w-8" />
              Voice Assistant
            </Button>
            
            <Button
              onClick={() => navigate('/camera')}
              variant="camera"
              size="hero"
              className="w-full md:w-auto"
            >
              <Camera className="h-8 w-8" />
              Scan Crop
            </Button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg opacity-90">
              🌾 Available in Hindi, English, and regional languages
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Tools for Modern Farmers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combine the power of AI, voice recognition, and real-time data 
              to make informed decisions about your crops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-gradient-card border-none shadow-soft hover:shadow-medium transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mic className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Voice Recognition</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ask questions in your native language. Get instant answers about 
                crop diseases, market trends, and farming best practices.
              </p>
            </Card>

            <Card className="p-8 text-center bg-gradient-card border-none shadow-soft hover:shadow-medium transition-all">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Disease Detection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload photos of your crops and get instant AI-powered disease 
                identification with treatment recommendations.
              </p>
            </Card>

            <Card className="p-8 text-center bg-gradient-card border-none shadow-soft hover:shadow-medium transition-all">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Market Prices</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get real-time prices from local mandis, MSP rates, and 
                recommendations for the best time to sell your produce.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary">
                {stats.farmersHelped.toLocaleString()}+
              </div>
              <p className="text-muted-foreground text-lg">Farmers Helped</p>
            </div>

            <div className="space-y-4">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Leaf className="h-10 w-10 text-success" />
              </div>
              <div className="text-4xl font-bold text-success">
                {stats.diseasesDetected.toLocaleString()}+
              </div>
              <p className="text-muted-foreground text-lg">Diseases Detected</p>
            </div>

            <div className="space-y-4">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-10 w-10 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent">
                {stats.accuracyRate}%
              </div>
              <p className="text-muted-foreground text-lg">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers who are already using AI to improve their harvests
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/voice')}
              variant="secondary"
              size="xl"
              className="min-w-48"
            >
              Start with Voice
            </Button>
            <Button
              onClick={() => navigate('/camera')}
              variant="outline"
              size="xl"
              className="min-w-48 border-white text-white hover:bg-white hover:text-primary"
            >
              Scan Your Crops
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;