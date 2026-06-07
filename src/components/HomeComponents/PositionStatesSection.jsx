import React from 'react';
import { Card } from '@heroui/react';
import { Briefcase, Factory, Magnifier, Star } from '@gravity-ui/icons';
// Stats data to keep the component clean
const statsData = [
  {
    icon: Briefcase,
    value: '50K',
    label: 'Active Jobs',
  },
  {
    icon: Factory,
    value: '12K',
    label: 'Companies',
  },
  {
    icon: Magnifier,
    value: '2M',
    label: 'Job Seekers',
  },
  {
    icon: Star,
    value: '97%',
    label: 'Satisfaction Rate',
  },
];

export default function PositionStatesSection() {
  return (
    // Main Section with a dark gradient and deep purple top glow
    <section className="min-h-screen text-white relative flex flex-col items-center justify-end overflow-hidden">
      
      {/* Deep purple top glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[100%] opacity-80" />

      {/* Earth image with its own blue glow */}
   

      {/* Foreground Content (Stats and Text) */}
      <div className="relative z-10 w-full max-w-7xl px-6 pb-20 pt-32 text-center flex flex-col items-center gap-16">
        
        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl font-medium leading-tight max-w-3xl">
          Assisting over{' '}
          <span className="font-semibold text-white">15,000 job seekers</span>
          <br />
          find their dream positions.
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 mt-30 xs:grid-cols-2 md:grid-cols-4 gap-6 w-full mt-10">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              // Using Hero UI Card component
              <Card
                key={index}
                className="bg-linear-to-t to-black from-zinc-800 border border-zinc-800/80 rounded-[20px] shadow-lg p-3 hover:border-violet-500/50 transition-all duration-300"
              >
                <div className="p-5 flex flex-col items-start gap-12">
                  {/* Gravity UI Icon */}
                  <Icon className="w-7 h-7 text-white" strokeWidth={1} />
                  
                  <div className="text-left space-y-1">
                    {/* Stat Value */}
                    <p className="text-5xl font-bold text-white tracking-tight">
                      {stat.value}
                    </p>
                    {/* Stat Label */}
                    <p className="text-sm font-light text-zinc-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}