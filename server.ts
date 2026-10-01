import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI client (User-Agent header set for telemetry as required)
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint for generating tailored Sparks EC PoI & Location Strategy
app.post('/api/generate-strategy', async (req, res) => {
  try {
    const {
      location = 'BSD City, Tangerang',
      categoryIds = [],
      objective = 'New Outlet Grand Opening & Trial Acquisition',
      targetAge = 'Toddlers & Early Elementary (Ages 1.5 - 8)',
      budgetLevel = 'Medium (Rp 15M - 30M / month)',
      customNotes = '',
    } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please check the Secrets panel.',
      });
    }

    const systemPrompt = `You are the Senior Retail Expansion & Offline Growth Director for Sparks EC (Early Childhood & Enrichment Center), part of Seven Retail Group in Indonesia.
Sparks EC is a premium, playful, sensory-motor and cognitive early learning & enrichment center for young children (ages 1 to 9).
You specialize in hyper-local offline Point of Interest (PoI) strategy, B2B2C community partnerships, catchment radius dominance, and conversion funnels to drive trial bookings and recurring student enrolments.

The user wants a customized, actionable, realistic marketing and expansion strategy for Sparks EC in a specific location, targeting chosen PoI categories.
Always return structured JSON matching this exact format:
{
  "summary": "2-3 sentences executive summary of the localized strategy",
  "locationAnalysis": "Key demographic highlights, family density, and local competition dynamics for the requested area",
  "primaryPoiTactics": [
    {
      "categoryName": "string",
      "targetVenues": ["specific local venue 1", "specific local venue 2"],
      "activationMechanism": "Step-by-step mechanism",
      "expectedReachWeekly": "number / string",
      "pitchAngle": "Winning pitch hook to the partner management",
      "deliverables": ["flyer/standee/event"]
    }
  ],
  "roadmap4Weeks": [
    { "week": "Week 1", "title": "Phase title", "actions": ["action 1", "action 2", "action 3"] },
    { "week": "Week 2", "title": "Phase title", "actions": ["action 1", "action 2", "action 3"] },
    { "week": "Week 3", "title": "Phase title", "actions": ["action 1", "action 2", "action 3"] },
    { "week": "Week 4", "title": "Phase title", "actions": ["action 1", "action 2", "action 3"] }
  ],
  "kpiProjections": {
    "projectedLeads": "e.g. 250 - 350 leads",
    "trialBookings": "e.g. 120 - 160 trials",
    "projectedEnrolments": "e.g. 45 - 65 members",
    "estimatedCAC": "e.g. Rp 85.000 / lead"
  },
  "budgetBreakdown": [
    { "item": "e.g. B2B Printing & Standees", "percentage": 30, "costEst": "Rp 6.000.000" },
    { "item": "e.g. Event Pop-Up & Goodie Bags", "percentage": 40, "costEst": "Rp 8.000.000" },
    { "item": "e.g. Partner Commission / Staff Incentives", "percentage": 20, "costEst": "Rp 4.000.000" },
    { "item": "e.g. Digital Retargeting & Local Ads", "percentage": 10, "costEst": "Rp 2.000.000" }
  ],
  "secretWeaponTip": "An innovative, high-impact growth hack specific to this location and audience"
}`;

    const prompt = `Develop a comprehensive Sparks EC Offline PoI Strategy for:
- Location: ${location}
- Selected PoI Categories: ${JSON.stringify(categoryIds)}
- Primary Objective: ${objective}
- Target Age Group: ${targetAge}
- Budget Tier: ${budgetLevel}
- Specific Notes / Requests: ${customNotes || 'Focus on rapid trial booking conversion and high-trust mom community engagement.'}

Ensure the venues mentioned are authentic, localized landmarks and relevant hubs for this district in Indonesia. Return strict valid JSON only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const outputText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(outputText);
    } catch {
      // If parsing fails, wrap in json
      parsedData = { rawResponse: outputText };
    }

    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error generating Sparks EC strategy:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate strategy with Gemini.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Sparks EC Strategy Server running on http://localhost:${PORT}`);
  });
}

startServer();
