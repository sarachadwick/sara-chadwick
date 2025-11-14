# Image Optimization Guide

Your PNG files are quite large (1.16MB - 17.57MB), which is causing slow load times. Here are several solutions to optimize them:

## Quick Answer: Yes, those sizes are problematic!

For web use, you generally want:
- **Thumbnails**: 50-200KB
- **Full-size images**: 200KB - 1MB (max 2MB for very high quality)
- **17.57MB is way too large** for web use

## Solution Options

### Option 1: Use ImageMagick (Recommended - Command Line)

If you have ImageMagick installed (or can install it via Homebrew on Mac):

```bash
# Install ImageMagick (if not installed)
brew install imagemagick

# Navigate to your studio folder
cd /path/to/your/studio/folder

# Convert and optimize all PNGs to WebP (much smaller, same quality)
for file in *.png; do
  magick "$file" -quality 85 -resize 2000x2000\> "${file%.png}.webp"
done

# Or create optimized PNGs (smaller file size)
for file in *.png; do
  magick "$file" -strip -quality 85 -resize 2000x2000\> "optimized_${file}"
done
```

### Option 2: Use Online Tools

1. **Squoosh** (Google): https://squoosh.app/
   - Drag and drop your images
   - Compare before/after
   - Download optimized versions
   - Supports WebP, AVIF, and optimized PNG

2. **TinyPNG**: https://tinypng.com/
   - Free, simple PNG compression
   - Usually reduces file size by 50-70%

### Option 3: Use Python Script (If you have Python)

I can create a Python script that:
- Converts PNGs to WebP
- Creates thumbnail versions
- Optimizes file sizes

Would you like me to create this?

### Option 4: Export from Procreate with Better Settings

When exporting from Procreate:
1. Use **JPEG** format instead of PNG (unless you need transparency)
2. Set quality to **80-90%** (usually looks identical but much smaller)
3. Resize to **2000-3000px** on the longest side (unless you need full resolution)
4. If you need PNG, use **PNG-8** instead of PNG-24 when possible

## Recommended Workflow

1. **Create two versions of each image:**
   - **Thumbnail**: 600-800px wide, ~100-200KB (for grid view)
   - **Full-size**: 2000-3000px wide, ~500KB-1MB (for lightbox)

2. **Use WebP format** (supported by all modern browsers):
   - 30-50% smaller than PNG
   - Same visual quality
   - Better compression

3. **Update your studio-data.js** to use optimized images:
   ```javascript
   {
     src: "/studio/blessings-optimized.webp",  // or .jpg
     title: "blessings",
     date: "2025",
   }
   ```

## What I've Already Implemented

✅ **Browser-side caching** - Images are now cached in IndexedDB for 7 days
✅ **Service Worker** - Additional caching layer for faster subsequent loads
✅ **Lazy loading** - Images load as you scroll
✅ **Progressive loading** - Visual feedback while images load

## Next Steps

1. Optimize your images using one of the methods above
2. Upload the optimized versions to your `/studio/` folder
3. Update `studio-data.js` with the new filenames
4. Test the page - it should load much faster!

## Quick Test

After optimizing, you can test file sizes:
```bash
# Check file sizes
ls -lh /path/to/studio/*.png
ls -lh /path/to/studio/*.webp
```

Your goal: Get each image under 1MB, ideally 200-500KB for full-size images.

