import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // API Routes First
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Atlas Standards Backend', timestamp: new Date().toISOString() });
  });

  // POST /api/generate-video: Start Veo Video Generation
  app.post('/api/generate-video', async (req, res) => {
    try {
      const { prompt, imageBytes, mimeType = 'image/png', aspectRatio = '16:9' } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Provide mock operation name when API key is pending configuration
        return res.json({
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
      res.json({ operationName: operation.name });
    } catch (error: any) {
      console.error('Error starting video generation:', error);
      res.status(500).json({ error: error.message || 'Failed to start video generation' });
    }
  });

  // POST /api/video-status: Poll Veo Operation Status
  app.post('/api/video-status', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: 'operationName is required' });
      }

      if (operationName.startsWith('mock-op-')) {
        return res.json({ done: true, isMock: true });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({ done: true, isMock: true });
      }

      const ai = getAi();
      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      res.json({ done: updated.done, error: updated.error });
    } catch (error: any) {
      console.error('Error polling video operation:', error);
      res.status(500).json({ error: error.message || 'Failed to poll video operation' });
    }
  });

  // POST /api/video-download: Stream or Proxy Resulting Video
  app.post('/api/video-download', async (req, res) => {
    try {
      const { operationName } = req.body;
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
      if (videoRes.body) {
        videoRes.body.pipeTo(
          new WritableStream({
            write(chunk) {
              res.write(chunk);
            },
            close() {
              res.end();
            },
          })
        );
      } else {
        res.end();
      }
    } catch (error: any) {
      console.error('Error downloading video:', error);
      res.status(500).json({ error: error.message || 'Failed to stream video' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Atlas Standards Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
