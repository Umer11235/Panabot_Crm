"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import UniversalCard from '../UniversalCard/UniversalCard';
import { earningsData } from '@/utils/data/earnings.data';

export default function EarningsCard() {
  return (
    <UniversalCard
      title="Earnings"
      actionType="select"
      actionOptions={[
        { label: 'Select period', value: '0' },
        { label: 'Last 12 Months', value: '12' }
      ]}
    >
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <AreaChart data={earningsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--md-sys-color-primary)" stopOpacity={0.1} />
                <stop offset="95%" stopColor="var(--md-sys-color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--md-sys-color-outline-variant)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--md-sys-color-on-surface-variant)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--md-sys-color-on-surface-variant)', fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface-container)',
                color: 'var(--md-sys-color-on-surface)',
                boxShadow: 'var(--md-sys-elevation-2)'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--md-sys-color-primary)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </UniversalCard>
  );
}
