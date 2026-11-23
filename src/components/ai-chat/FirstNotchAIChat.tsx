'use client';

import {
  ArrowUp,
  Bot,
  BriefcaseBusiness,
  Headphones,
  MessageCircle,
  Minus,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const QUICK_ACTIONS = [
  {
    label: 'Our Services',
    prompt: 'What services does FirstNotch provide?',
    icon: Headphones,
  },
  {
    label: 'Careers',
    prompt: 'Tell me about careers and current vacancies at FirstNotch.',
    icon: BriefcaseBusiness,
  },
  {
    label: 'About FirstNotch',
    prompt: 'Tell me about FirstNotch Solutions.',
    icon: Sparkles,
  },
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm the FirstNotch AI Assistant. I can help you with our services, careers, hiring process, IT solutions and company information. How can I help you today?",
};

export default function FirstNotchAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    INITIAL_MESSAGE,
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages, isLoading]);

  const sendMessage = async (messageText?: string) => {
    const text = (messageText ?? input).trim();

    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || 'Unable to get a response.'
        );
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          data?.message ||
          'Sorry, I could not generate a response.',
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    } catch (error) {
      console.error('FirstNotch chat error:', error);

      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  const resetConversation = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput('');
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-0 right-0 z-[9999] font-sans">
      {/* ==================================================
          CHAT WINDOW
      ================================================== */}
      <div
        className={[
          'fixed overflow-hidden bg-white transition-all duration-300 ease-out',
         'bottom-[88px] right-3 h-[min(570px,calc(100dvh-110px))] w-[calc(100vw-24px)] rounded-[24px]',
'sm:bottom-[100px] sm:right-6 sm:h-[600px] sm:w-[390px] sm:rounded-[28px]',
'lg:right-8 lg:h-[620px] lg:w-[410px]',
          'border border-black/[0.07]',
          'shadow-[0_24px_80px_rgba(23,25,28,0.22)]',
          isOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-5 scale-[0.96] opacity-0',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="FirstNotch AI Assistant"
      >
        <div className="flex h-full flex-col">
          {/* HEADER */}
          <div className="relative overflow-hidden bg-[#B12025] px-4 pb-4 pt-4 text-white sm:px-5 sm:pb-5 sm:pt-5">
            <div
              aria-hidden="true"
              className="absolute -right-14 -top-16 h-[180px] w-[180px] rounded-full border border-white/15"
            />
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-6 h-[110px] w-[110px] rounded-full border border-white/10"
            />

          <div className="relative flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_8px_25px_rgba(0,0,0,0.16)]">
                  <Bot
                    className="h-6 w-6 text-[#B12025]"
                    strokeWidth={2.2}
                  />

                  <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-[#B12025] bg-[#4ADE80]" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-[16px] font-semibold tracking-[-0.02em]">
                      FirstNotch AI
                    </h2>

                    <Sparkles className="h-4 w-4 text-white/80" />
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5CF28B]" />
                    AI Assistant • Online
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetConversation}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white"
                  aria-label="Reset conversation"
                  title="New conversation"
                >
                  <RotateCcw className="h-[17px] w-[17px]" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white"
                  aria-label="Minimize chat"
                >
                  <Minus className="hidden h-[19px] w-[19px] sm:block" />
                  <X className="h-[20px] w-[20px] sm:hidden" />
                </button>
              </div>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#F7F7F7] px-3.5 py-4 sm:px-5 sm:py-5">
            <div className="mx-auto flex w-full max-w-[430px] flex-col gap-4">
              {messages.map((message) => {
                const isUser = message.role === 'user';

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isUser
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    {!isUser && (
                      <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B12025]">
                        <Bot className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}

                    <div
                      className={[
                        'max-w-[82%] px-4 py-3 text-[13px] leading-[1.65]',
                        isUser
                          ? 'rounded-[20px] rounded-br-[6px] bg-[#17191C] text-white'
                          : 'rounded-[20px] rounded-bl-[6px] border border-black/[0.05] bg-white text-[#303238] shadow-[0_5px_20px_rgba(0,0,0,0.04)]',
                      ].join(' ')}
                    >
                      {message.content}
                    </div>
                  </div>
                );
              })}

              {/* QUICK ACTIONS */}
              {messages.length === 1 && !isLoading && (
                <div className="ml-9 pt-1">
                  <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#777B82]">
                    Quick questions
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {QUICK_ACTIONS.map((action) => {
                      const Icon = action.icon;

                      return (
                        <button
                          key={action.label}
                          type="button"
                          onClick={() =>
                            void sendMessage(action.prompt)
                          }
                          className="group flex items-center gap-1.5 rounded-full border border-[#B12025]/15 bg-white px-3 py-2 text-[11px] font-medium text-[#5B1A1D] shadow-sm transition hover:border-[#B12025] hover:bg-[#B12025] hover:text-white"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* AI TYPING */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B12025]">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>

                  <div className="flex items-center gap-1 rounded-[18px] rounded-bl-[6px] border border-black/[0.05] bg-white px-4 py-4 shadow-sm">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#B12025]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#B12025] [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#B12025] [animation-delay:240ms]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* INPUT AREA */}
         <div className="shrink-0 border-t border-black/[0.06] bg-white px-3.5 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 sm:px-5 sm:pb-4 sm:pt-3">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-[18px] border border-black/[0.09] bg-[#F8F8F8] p-1.5 transition focus-within:border-[#B12025]/35 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(177,32,37,0.06)]"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                placeholder="Ask FirstNotch AI..."
                disabled={isLoading}
                maxLength={2000}
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[13px] text-[#17191C] outline-none placeholder:text-[#989A9E] disabled:cursor-not-allowed"
                aria-label="Message FirstNotch AI"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#B12025] text-white shadow-[0_6px_16px_rgba(177,32,37,0.24)] transition hover:bg-[#961B20] disabled:cursor-not-allowed disabled:bg-[#D7D7D7] disabled:shadow-none"
                aria-label="Send message"
              >
                <ArrowUp
                  className="h-[18px] w-[18px]"
                  strokeWidth={2.4}
                />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-center gap-1 text-[9px] font-medium text-[#9A9CA1]">
              <Sparkles className="h-2.5 w-2.5 text-[#B12025]" />
              Powered by FirstNotch AI
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          FLOATING LAUNCHER
      ================================================== */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={[
          'fixed z-[10000] flex items-center justify-center',
          'bottom-4 right-4 h-[54px] w-[54px]',
'sm:bottom-6 sm:right-6 sm:h-[64px] sm:w-[64px]',
          'lg:bottom-8 lg:right-8',
          'rounded-full bg-[#B12025] text-white',
          'shadow-[0_12px_35px_rgba(177,32,37,0.38)]',
          'transition-all duration-300',
          'hover:-translate-y-1 hover:scale-[1.04] hover:bg-[#981B20]',
          'focus:outline-none focus:ring-4 focus:ring-[#B12025]/20',
          isOpen
            ? 'max-sm:pointer-events-none max-sm:scale-75 max-sm:opacity-0'
            : '',
        ].join(' ')}
        aria-label={
          isOpen
            ? 'Close FirstNotch AI Assistant'
            : 'Open FirstNotch AI Assistant'
        }
      >
        {/* pulse */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#B12025]/25" />
            <span className="absolute right-0 top-0 h-4 w-4 rounded-full border-[3px] border-white bg-[#52D273]" />
          </>
        )}

        <div
          className={`absolute transition-all duration-300 ${
            isOpen
              ? 'rotate-90 scale-50 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        >
          <MessageCircle
            className="h-[27px] w-[27px]"
            strokeWidth={2.1}
          />
        </div>

        <div
          className={`absolute transition-all duration-300 ${
            isOpen
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-50 opacity-0'
          }`}
        >
          <X
            className="h-[25px] w-[25px]"
            strokeWidth={2}
          />
        </div>
      </button>
    </div>
  );
}