import React from 'react';
import { Users } from 'lucide-react';
import { Card } from '../ui/Card';

interface SubscriberCountProps {
  count: number;
}

export function SubscriberCount({ count }: SubscriberCountProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3">
        <Users className="h-5 w-5 text-[rgb(0,228,137)]" />
        <h2 className="text-lg font-semibold text-white">Abonnés</h2>
      </div>
      <p className="text-3xl font-bold text-white mt-2">{count}</p>
    </Card>
  );
}