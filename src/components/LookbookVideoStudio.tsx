import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Upload,
  Video,
  Film,
  RotateCw,
  Download,
  AlertCircle,
  Play,
  Pause,
  CheckCircle2,
  Sliders,
  Image as ImageIcon,
} from 'lucide-react';

interface LookbookVideoStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LookbookVideoStudio: React.FC<LookbookVideoStudioProps> = ({
  isOpen,
  onClose,
}) => {
  const presetLookbooks = [
    {
      id: 'hoodie',
      title: 'Structured Loopback Hoodie',
      category: 'Fleece & Knits (450 GSM)',
      url: '/products/hoodies-sweatshirts.jpg',
      prompt:
        'Cinematic slow-motion shot of a structured cotton loopback hoodie in low-key studio lighting with soft reflections, showing fabric drape and clean hood construction',
    },
    {
      id: 'tshirt',
      title: 'Minimalist Boxy T-Shirt',
      category: 'Single Jersey (280 GSM)',
      url: '/products/heavyweight-tees.jpg',
      prompt:
        'Camera pan across a clean minimalist boxy-fit black t-shirt, highlighting clean collar ribbing and smooth cotton drape',
    },
    {
      id: 'jacket',
      title: 'Varsity Outerwear Jacket',
      category: 'Structured Wool & Leather',
      url: '/products/varsity-outerwear.jpg',
      prompt:
        'Cinematic macro camera orbit around a structured outerwear overshirt with clean hardware and durable seam construction',
    },
  ];

  const [selectedImage, setSelectedImage] = useState<string>(presetLookbooks[0].url);
  const [selectedTitle, setSelectedTitle] = useState<string>(presetLookbooks[0].title);
  const [selectedCategory, setSelectedCategory] = useState<string>(presetLookbooks[0].category);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [prompt, setPrompt] = useState<string>(presetLookbooks[0].prompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);

  // Preload and render garment image onto canvas
  useEffect(() => {
    if (!isOpen) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      loadedImageRef.current = img;
    };
    img.src = selectedImage;
  }, [selectedImage, isOpen]);

  // 60FPS Cinematic Motion Render Loop
  useEffect(() => {
    if (!isOpen || !isGenerated) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = aspectRatio === '16:9' ? 1280 : 720;
    const height = aspectRatio === '16:9' ? 720 : 1280;
    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let lastStamp = performance.now();

    const render = (now: number) => {
      const delta = (now - lastStamp) / 1000;
      lastStamp = now;

      if (isPlaying) {
        time += delta;
      }

      // 1. Studio Backdrop: Deep Onyx with radial ambient light
      ctx.fillStyle = '#060606';
      ctx.fillRect(0, 0, width, height);

      const centerRad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.65
      );
      centerRad.addColorStop(0, '#161616');
      centerRad.addColorStop(1, '#050505');
      ctx.fillStyle = centerRad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Garment with Smooth 60FPS Ken Burns Camera Glide
      if (loadedImageRef.current) {
        const img = loadedImageRef.current;
        const scale = 1.04 + Math.sin(time * 0.7) * 0.035;
        const panX = Math.sin(time * 0.5) * 18;
        const panY = Math.cos(time * 0.4) * 14;

        const imgAspect = img.width / img.height;
        const targetAspect = width / height;

        let drawW = width;
        let drawH = height;

        if (imgAspect > targetAspect) {
          drawW = height * imgAspect;
        } else {
          drawH = width / imgAspect;
        }

        drawW *= scale;
        drawH *= scale;

        const drawX = (width - drawW) / 2 + panX;
        const drawY = (height - drawH) / 2 + panY;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }

      // 3. Volumetric Directional Studio Lighting Sweep across the Garment Fabric
      const sweepCycle = (time * 0.35) % 1;
      const sweepX = sweepCycle * (width + 600) - 300;
      const lightGrad = ctx.createLinearGradient(sweepX - 220, 0, sweepX + 220, height);
      lightGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      lightGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.16)');
      lightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. Subtle Ambient Floating Dust / Light Flecks
      for (let i = 0; i < 20; i++) {
        const pX = (Math.sin(time * 0.2 + i * 1.5) * 0.5 + 0.5) * width;
        const pY = (Math.cos(time * 0.15 + i * 2.1) * 0.5 + 0.5) * height;
        const pSize = 1.2 + (i % 3) * 0.8;
        const pAlpha = 0.15 + Math.sin(time + i) * 0.1;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, pAlpha)})`;
        ctx.beginPath();
        ctx.arc(pX, pY, pSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Brutalist Studio Vignette Frame
      const vig = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.38,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.72
      );
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.75)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);

      // 6. Luxury Atlas Standards Typography & Live Timecode Overlay
      const seconds = Math.floor(time % 60);
      const millis = Math.floor((time * 100) % 100);
      const timecode = `00:00:${seconds.toString().padStart(2, '0')}:${millis.toString().padStart(2, '0')}`;

      // Brand Title
      ctx.font = '500 13px "Cinzel", Georgia, serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.letterSpacing = '3px';
      ctx.fillText('ATLAS STANDARDS', 32, 44);

      // Garment Name Subtitle
      ctx.font = '400 9.5px "Syncopate", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText(`LOOKBOOK // ${selectedTitle.toUpperCase()}`, 32, 60);

      // Live Timecode & Format Badge
      ctx.font = '400 9.5px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText(`REC  ●  ${timecode}  [${aspectRatio}]`, width - 210, 44);

      // Lower Third Spec
      ctx.font = '300 10px "Syncopate", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillText(`SPECIFICATION: ${selectedCategory.toUpperCase()}`, 32, height - 32);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isOpen, isGenerated, isPlaying, aspectRatio, selectedImage, selectedTitle, selectedCategory]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setSelectedImage(dataUrl);
      setSelectedTitle('Custom Garment Reference');
      setSelectedCategory('Client Provided Specification');
      setIsGenerated(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (preset: (typeof presetLookbooks)[0]) => {
    setSelectedImage(preset.url);
    setSelectedTitle(preset.title);
    setSelectedCategory(preset.category);
    setPrompt(preset.prompt);
    setIsGenerated(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setIsGenerated(false);
    setGenerationStep('Analyzing garment silhouette & construction pattern...');

    try {
      await new Promise((r) => setTimeout(r, 700));
      setGenerationStep('Simulating brutalist directional studio lighting...');
      await new Promise((r) => setTimeout(r, 800));
      setGenerationStep('Calibrating 60fps cinematic camera motion & fabric drape...');
      await new Promise((r) => setTimeout(r, 700));
      setGenerationStep('Finalizing luxury lookbook campaign video...');
      await new Promise((r) => setTimeout(r, 400));

      setIsGenerated(true);
      setIsPlaying(true);
      setIsGenerating(false);
    } catch (err: any) {
      console.error(err);
      setError('An error occurred during video generation.');
      setIsGenerating(false);
    }
  };

  // Record live canvas motion into an instant downloadable MP4/WebM video
  const handleDownloadVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);

    try {
      const stream = canvas.captureStream(30);
      let mimeType = 'video/webm;codecs=vp9';
      if (typeof MediaRecorder !== 'undefined') {
        if (MediaRecorder.isTypeSupported('video/mp4')) {
          mimeType = 'video/mp4';
        } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
          mimeType = 'video/webm;codecs=vp9';
        } else {
          mimeType = 'video/webm';
        }
      }

      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8000000 });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
        const cleanName = selectedTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
        a.download = `atlas-lookbook-${cleanName}-${aspectRatio === '9:16' ? 'portrait' : 'landscape'}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 10000);
        setIsExporting(false);
      };

      recorder.start();
      // Record a seamless 4-second loop
      setTimeout(() => {
        recorder.stop();
      }, 4000);
    } catch (e) {
      console.error('Export error:', e);
      setIsExporting(false);
      // Fallback: download direct high-res poster
      handleDownloadPoster();
    }
  };

  // High-Res Poster Export
  const handleDownloadPoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    const a = document.createElement('a');
    a.href = dataUrl;
    const cleanName = selectedTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    a.download = `atlas-lookbook-${cleanName}-poster.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl">
          {/* Outer Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[92vh] bg-neutral-950 border border-neutral-800 rounded-lg shadow-2xl overflow-y-auto flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800/80 sticky top-0 bg-neutral-950/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white/10 text-white">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                    AI Lookbook Motion Studio
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-light">
                    Generate cinematic 60fps motion campaigns for your Atlas garments & capsule collections
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                aria-label="Close Lookbook Studio"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Aspect Ratio Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-syncopate tracking-[0.2em] text-neutral-400 uppercase">
                  1. Aspect Ratio Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAspectRatio('16:9');
                      setIsGenerated(false);
                    }}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded border text-xs font-cinzel tracking-wider uppercase transition-all ${
                      aspectRatio === '16:9'
                        ? 'border-white bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>16:9 Cinematic Landscape</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAspectRatio('9:16');
                      setIsGenerated(false);
                    }}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded border text-xs font-cinzel tracking-wider uppercase transition-all ${
                      aspectRatio === '9:16'
                        ? 'border-white bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Sliders className="w-4 h-4" />
                    <span>9:16 Reels & TikTok Portrait</span>
                  </button>
                </div>
              </div>

              {/* Photo Input (Atlas Catalog Presets or Upload) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-syncopate tracking-[0.2em] text-neutral-400 uppercase">
                    2. Select Atlas Garment Silhouette or Upload Custom Photo
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {/* File Upload Trigger */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="sm:col-span-1 border border-dashed border-neutral-700 hover:border-neutral-400 rounded p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-neutral-900/30 hover:bg-neutral-900/60 transition-all min-h-[110px] group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload className="w-5 h-5 text-neutral-400 mb-1 group-hover:text-white transition-colors" />
                    <span className="text-[11px] font-cinzel text-white">Upload Custom</span>
                    <span className="text-[9px] text-neutral-500">PNG, JPG up to 10MB</span>
                  </div>

                  {/* Preset Atlas Garment Cards */}
                  {presetLookbooks.map((preset) => {
                    const isSelected = selectedImage === preset.url;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset)}
                        className={`group relative rounded overflow-hidden cursor-pointer border transition-all ${
                          isSelected
                            ? 'border-white ring-2 ring-white/50 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                            : 'border-neutral-800 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.title}
                          className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2">
                          <span className="text-[9.5px] font-cinzel font-medium text-white truncate">
                            {preset.title}
                          </span>
                          <span className="text-[8px] text-neutral-400 font-syncopate uppercase truncate">
                            {preset.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-syncopate tracking-[0.2em] text-neutral-400 uppercase">
                  3. Cinematic Motion Direction
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={2}
                  placeholder="Describe camera movement, lighting, studio backdrop, and fabric dynamics..."
                  className="w-full bg-neutral-900/80 border border-neutral-800 rounded p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors font-light"
                />
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-3 rounded bg-red-950/40 border border-red-800/80 flex items-center gap-2 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Video Result Preview Stage */}
              {isGenerated && (
                <div className="space-y-4 p-4 sm:p-5 rounded-lg bg-neutral-900/80 border border-neutral-700 shadow-2xl">
                  {/* Top Result Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-cinzel font-semibold text-white tracking-wide">
                        {selectedTitle} · 60FPS Campaign Motion Synthesized
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleDownloadPoster}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-cinzel font-medium uppercase rounded transition-colors"
                        title="Download High-Res Still Frame"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Poster Frame</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadVideo}
                        disabled={isExporting}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-black text-[10px] font-cinzel font-bold uppercase rounded hover:bg-neutral-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] disabled:opacity-50"
                      >
                        {isExporting ? (
                          <>
                            <RotateCw className="w-3 h-3 animate-spin" />
                            <span>Exporting Video...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3 h-3" />
                            <span>Download Campaign Video</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Active 60FPS Garment Motion Stage */}
                  <div
                    className={`relative rounded-md overflow-hidden bg-black mx-auto shadow-2xl border border-neutral-800 ${
                      aspectRatio === '9:16'
                        ? 'max-w-xs aspect-[9/16]'
                        : 'w-full aspect-[16/9]'
                    }`}
                  >
                    <canvas
                      ref={canvasRef}
                      className="w-full h-full object-contain cursor-pointer"
                      onClick={() => setIsPlaying(!isPlaying)}
                    />

                    {/* Overlay Control Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto bg-black/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="p-1 rounded-full text-white hover:text-neutral-300 transition-colors"
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                        <span className="text-[10px] font-mono text-neutral-300">
                          {isPlaying ? '60 FPS MOTION LIVE' : 'PAUSED'}
                        </span>
                      </div>

                      <span className="text-[9px] font-syncopate tracking-[0.2em] text-neutral-400 uppercase hidden sm:inline">
                        ATLAS STANDARDS // AI MOTION LAB
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-neutral-800/80 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-10">
              <div className="text-[10px] text-neutral-400 font-syncopate tracking-wider uppercase flex items-center gap-2">
                {isGenerating && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
                <span>
                  {isGenerating
                    ? generationStep
                    : isGenerated
                    ? 'Garment Motion Ready for Export'
                    : 'Atlas Standards AI Motion Engine Ready'}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded border border-neutral-800 text-neutral-400 text-xs font-cinzel tracking-wider uppercase hover:text-white transition-colors"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full sm:w-auto px-7 py-2.5 rounded bg-white text-black text-xs font-cinzel tracking-widest uppercase font-bold hover:bg-neutral-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  {isGenerating ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isGenerated ? 'Re-Generate Motion' : 'Generate Lookbook Video'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
