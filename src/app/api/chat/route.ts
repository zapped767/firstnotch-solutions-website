import { GoogleGenAI } from '@google/genai';
import { NextRequest } from 'next/server';

import {
  FIRSTNOTCH_KNOWLEDGE,
} from '@/lib/ai/firstnotchKnowledge';

// ======================================================
// MESSAGE TYPE
// ======================================================

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

// ======================================================
// FIRSTNOTCH AI SYSTEM PROMPT
// ======================================================

const SYSTEM_PROMPT = `
You are the official AI website assistant for
FirstNotch Solutions (Pvt) Ltd.

Your purpose is to help website visitors quickly,
accurately, and professionally.

YOU CAN HELP WITH:

- FirstNotch company information
- Services
- Customer support outsourcing
- BPO and back-office services
- IT services
- Web development
- IT support
- Careers
- Confirmed vacancies
- Hiring process
- Contact information
- Booking a discovery call
- Website navigation

RESPONSE STYLE:

- Be professional and friendly.
- Keep answers concise.
- Give the direct answer first.
- Use simple and natural English.
- Do not give unnecessarily long responses.
- You are an AI assistant, not a human employee.

ACCURACY RULES:

- Only use confirmed FirstNotch information.
- Never invent company information.
- Never invent job vacancies.
- Never invent salaries.
- Never invent pricing.
- Never invent company policies.
- Never invent client names.
- Never invent statistics.
- Never claim a vacancy is available unless it appears
  under CURRENT VACANCIES.

If confirmed information is unavailable, clearly say
that you do not have confirmed information.

When useful, direct the visitor to the appropriate
FirstNotch website page.

FIRSTNOTCH KNOWLEDGE:

${FIRSTNOTCH_KNOWLEDGE}
`;

// ======================================================
// POST /api/chat
// ======================================================

export async function POST(
  request: NextRequest
) {
  try {
    // --------------------------------------------------
    // CHECK GEMINI API KEY
    // --------------------------------------------------

    const apiKey =
      process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error(
        'GEMINI_API_KEY is missing.'
      );

      return Response.json(
        {
          error:
            'AI assistant is not configured.',
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------------------------
    // READ REQUEST BODY
    // --------------------------------------------------

    const body = await request.json();

    const messages =
      body?.messages as ChatMessage[];

    if (
      !Array.isArray(messages) ||
      messages.length === 0
    ) {
      return Response.json(
        {
          error:
            'A message is required.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // VALIDATE + LIMIT CHAT HISTORY
    // --------------------------------------------------

    const safeMessages = messages
      .filter(
        (message) =>
          message &&
          (message.role === 'user' ||
            message.role === 'assistant') &&
          typeof message.content ===
            'string'
      )
      .slice(-10)
      .map((message) => ({
        role: message.role,
        content: message.content
          .trim()
          .slice(0, 2000),
      }))
      .filter(
        (message) =>
          message.content.length > 0
      );

    if (safeMessages.length === 0) {
      return Response.json(
        {
          error:
            'A valid message is required.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // CREATE GEMINI CLIENT
    // --------------------------------------------------

    const ai = new GoogleGenAI({
      apiKey,
    });

    // --------------------------------------------------
    // CONVERT CHAT HISTORY
    // --------------------------------------------------

    const conversation = safeMessages
      .map((message) => {
        const speaker =
          message.role === 'user'
            ? 'Visitor'
            : 'FirstNotch Assistant';

        return `${speaker}: ${message.content}`;
      })
      .join('\n\n');

    // --------------------------------------------------
    // SEND REQUEST TO GEMINI
    // --------------------------------------------------

    const response =
      await ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
        contents: `
${SYSTEM_PROMPT}

CURRENT CONVERSATION:

${conversation}

Respond to the visitor's latest message as the
FirstNotch AI Assistant.
        `.trim(),
      });

    // --------------------------------------------------
    // GET AI RESPONSE
    // --------------------------------------------------

    const answer =
      response.text?.trim();

    if (!answer) {
      console.error(
        'Gemini returned an empty response.'
      );

      return Response.json(
        {
          error:
            'The assistant could not generate a response.',
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------------------------
    // RETURN RESPONSE
    // --------------------------------------------------

    return Response.json({
      message: answer,
    });
  } catch (error) {
    console.error(
      'FirstNotch Gemini AI error:',
      error
    );

    return Response.json(
      {
        error:
          'The FirstNotch assistant is temporarily unavailable. Please try again.',
      },
      {
        status: 500,
      }
    );
  }
}