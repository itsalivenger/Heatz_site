import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';

interface NewsletterFormProps {
  subject: string;
  content: string;
  sending: boolean;
  onSubjectChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function NewsletterForm({
  subject,
  content,
  sending,
  onSubjectChange,
  onContentChange,
  onSubmit,
}: NewsletterFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">
          Sujet
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="w-full px-3 py-2 bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.1)] 
            rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(0,228,137)]"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-white mb-1">
          Contenu
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          rows={8}
          className="w-full px-3 py-2 bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.1)] 
            rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(0,228,137)]"
          required
        />
      </div>

      <Button type="submit" disabled={sending}>
        <Send className="h-4 w-4 mr-2" />
        {sending ? 'Envoi en cours...' : 'Envoyer la newsletter'}
      </Button>
    </form>
  );
}