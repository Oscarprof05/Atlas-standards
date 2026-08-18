import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.url || '';

  // 1. Health check
  if (url.includes('/api/health')) {
    return res.status(200).json({
      status: 'ok',
      service: 'Atlas Standards Serverless Backend',
      timestamp: new Date().toISOString(),
    });
  }

  // 2. POST /api/generate-video
  if (url.includes('/api/generate-video')) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
      const { prompt, imageBytes, mimeType = 'image/png', aspectRatio = '16:9' } = req.body || {};
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(200).json({
          operationName: `mock-op-${Date.now()}`,
          isMock: true,
          message: 'Video generation scheduled in preview mode.',
        });
      }

      const ai = getAi();
      const model = 'veo-3.1-fast-generate-preview';

      const payload: any = {
        model,
        prompt: prompt || 'Cinematic slow-motion fabric drape and motion in a luxury studio, high detail',
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio === '9:16' ? '9:16' : '16:9',
        },
      };

      if (imageBytes) {
        payload.image = {
          imageBytes,
          mimeType,
        };
      }

      const operation = await ai.models.generateVideos(payload);
      return res.status(200).json({ operationName: operation.name });
    } catch (error: any) {
      console.error('Error starting video generation:', error);
      return res.status(500).json({ error: error.message || 'Failed to start video generation' });
    }
  }

  // 3. POST /api/video-status
  if (url.includes('/api/video-status')) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
      const { operationName } = req.body || {};
      if (!operationName) {
        return res.status(400).json({ error: 'operationName is required' });
      }

      if (operationName.startsWith('mock-op-')) {
        return res.status(200).json({ done: true, isMock: true });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(200).json({ done: true, isMock: true });
      }

      const ai = getAi();
      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      return res.status(200).json({ done: updated.done, error: updated.error });
    } catch (error: any) {
      console.error('Error polling video operation:', error);
      return res.status(500).json({ error: error.message || 'Failed to poll video operation' });
    }
  }

  // 4. GET / POST /api/video-download
  if (url.includes('/api/video-download')) {
    try {
      const operationName = (req.body?.operationName || req.query?.operationName) as string;
      if (!operationName) {
        return res.status(400).json({ error: 'operationName is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || operationName.startsWith('mock-op-')) {
        return res.status(404).json({ error: 'Video stream unavailable in preview environment' });
      }

      const ai = getAi();
      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

      if (!uri) {
        return res.status(404).json({ error: 'Generated video URI not found' });
      }

      const videoRes = await fetch(uri, {
        headers: { 'x-goog-api-key': apiKey },
      });

      res.setHeader('Content-Type', 'video/mp4');
      const arrayBuffer = await videoRes.arrayBuffer();
      return res.status(200).send(Buffer.from(arrayBuffer));
    } catch (error: any) {
      console.error('Error downloading video:', error);
      return res.status(500).json({ error: error.message || 'Failed to stream video' });
    }
  }

  return res.status(404).json({ error: 'Endpoint not found' });
}
