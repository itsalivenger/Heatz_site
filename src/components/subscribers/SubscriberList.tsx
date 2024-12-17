import React from 'react';
import { Subscriber } from '../../types';

interface SubscriberListProps {
  subscribers: Subscriber[];
}

export function SubscriberList({ subscribers }: SubscriberListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[rgba(255,255,255,0.1)]">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(0,228,137)] uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(0,228,137)] uppercase tracking-wider">
              Email
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(255,255,255,0.1)]">
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {subscriber.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {subscriber.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}