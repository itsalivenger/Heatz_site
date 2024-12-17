import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Card } from './ui/Card';
import { SubscriberCount } from './subscribers/SubscriberCount';
import { SubscriberList } from './subscribers/SubscriberList';
import { NewsletterForm } from './newsletter/NewsletterForm';
import type { Subscriber } from '../types';

// Mock subscriber data (in a real app, this would come from a database)
const mockSubscribers: Subscriber[] = [
  { id: 1, email: 'john@example.com', name: 'John Doe' },
  { id: 2, email: 'jane@example.com', name: 'Jane Smith' },
  { id: 3, email: 'bob@example.com', name: 'Bob Johnson' },
];

export default function NewsletterDashboard() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Newsletter sent successfully!');
    setSubject('');
    setContent('');
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Mail className="h-8 w-8 text-[rgb(0,228,137)]" />
            Promouvoir vos produits
          </h1>
          <p className="text-[rgba(255,255,255,0.7)] mt-2">
            Gérez et envoyez des newsletters à vos abonnés
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SubscriberCount count={mockSubscribers.length} />
        </div>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Composer Newsletter
            </h2>
            <NewsletterForm
              subject={subject}
              content={content}
              sending={sending}
              onSubjectChange={setSubject}
              onContentChange={setContent}
              onSubmit={handleSend}
            />
          </div>

          <div className="border-t border-[rgba(255,255,255,0.1)] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Liste des abonnés
            </h3>
            <SubscriberList subscribers={mockSubscribers} />
          </div>
        </Card>
      </div>
    </div>
  );
}