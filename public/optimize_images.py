#!/usr/bin/env python3
"""
Image Optimization Script for Studio Images

This script optimizes PNG images by:
1. Converting to WebP format (smaller file size, same quality)
2. Creating optimized PNG versions
3. Optionally creating thumbnail versions

Requirements:
    pip install Pillow

Usage:
    python optimize_images.py /path/to/studio/folder
    python optimize_images.py /path/to/studio/folder --format webp
    python optimize_images.py /path/to/studio/folder --format png --thumbnails
"""

import os
import sys
import argparse
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow is not installed.")
    print("Install it with: pip install Pillow")
    sys.exit(1)


def optimize_image(input_path, output_path, format='webp', max_size=2000, quality=85):
    """Optimize a single image."""
    try:
        img = Image.open(input_path)
        
        # Convert RGBA to RGB if saving as JPEG
        if format.lower() == 'jpg' and img.mode == 'RGBA':
            # Create white background
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
            img = rgb_img
        
        # Resize if larger than max_size
        if max(img.size) > max_size:
            img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
        
        # Save optimized image
        save_kwargs = {'quality': quality, 'optimize': True}
        
        if format.lower() == 'webp':
            img.save(output_path, 'WEBP', **save_kwargs)
        elif format.lower() == 'jpg' or format.lower() == 'jpeg':
            img.save(output_path, 'JPEG', **save_kwargs)
        else:
            # PNG
            img.save(output_path, 'PNG', optimize=True, compress_level=9)
        
        # Get file sizes
        original_size = os.path.getsize(input_path) / (1024 * 1024)  # MB
        new_size = os.path.getsize(output_path) / (1024 * 1024)  # MB
        reduction = ((original_size - new_size) / original_size) * 100
        
        return {
            'success': True,
            'original_size': original_size,
            'new_size': new_size,
            'reduction': reduction
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }


def create_thumbnail(input_path, output_path, size=600, quality=85):
    """Create a thumbnail version of an image."""
    try:
        img = Image.open(input_path)
        img.thumbnail((size, size), Image.Resampling.LANCZOS)
        
        # Convert RGBA to RGB if saving as JPEG
        if output_path.suffix.lower() == '.jpg' and img.mode == 'RGBA':
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
            img = rgb_img
        
        format_map = {
            '.webp': 'WEBP',
            '.jpg': 'JPEG',
            '.jpeg': 'JPEG',
            '.png': 'PNG'
        }
        
        save_format = format_map.get(output_path.suffix.lower(), 'WEBP')
        save_kwargs = {'quality': quality, 'optimize': True} if save_format != 'PNG' else {'optimize': True}
        
        img.save(output_path, save_format, **save_kwargs)
        return True
    except Exception as e:
        print(f"  Error creating thumbnail: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description='Optimize images for web use')
    parser.add_argument('directory', help='Directory containing images to optimize')
    parser.add_argument('--format', choices=['webp', 'png', 'jpg'], default='webp',
                       help='Output format (default: webp)')
    parser.add_argument('--max-size', type=int, default=2000,
                       help='Maximum dimension in pixels (default: 2000)')
    parser.add_argument('--quality', type=int, default=85,
                       help='Image quality 1-100 (default: 85)')
    parser.add_argument('--thumbnails', action='store_true',
                       help='Create thumbnail versions (600px)')
    parser.add_argument('--output-dir', help='Output directory (default: same as input)')
    parser.add_argument('--suffix', default='optimized',
                       help='Suffix for output files (default: optimized)')
    
    args = parser.parse_args()
    
    # Validate directory
    input_dir = Path(args.directory)
    if not input_dir.exists() or not input_dir.is_dir():
        print(f"Error: Directory '{input_dir}' does not exist or is not a directory.")
        sys.exit(1)
    
    # Set output directory
    output_dir = Path(args.output_dir) if args.output_dir else input_dir
    
    # Find all PNG images
    image_files = list(input_dir.glob('*.png')) + list(input_dir.glob('*.PNG'))
    
    if not image_files:
        print(f"No PNG images found in '{input_dir}'")
        sys.exit(1)
    
    print(f"Found {len(image_files)} image(s) to optimize\n")
    
    total_original = 0
    total_new = 0
    
    for img_path in image_files:
        print(f"Processing: {img_path.name}")
        
        # Create output filename
        stem = img_path.stem
        ext = f".{args.format}"
        output_path = output_dir / f"{stem}_{args.suffix}{ext}"
        
        # Optimize image
        result = optimize_image(
            img_path,
            output_path,
            format=args.format,
            max_size=args.max_size,
            quality=args.quality
        )
        
        if result['success']:
            total_original += result['original_size']
            total_new += result['new_size']
            print(f"  ✓ Created: {output_path.name}")
            print(f"    Size: {result['original_size']:.2f}MB → {result['new_size']:.2f}MB")
            print(f"    Reduction: {result['reduction']:.1f}%\n")
            
            # Create thumbnail if requested
            if args.thumbnails:
                thumb_path = output_dir / f"{stem}_thumb{ext}"
                if create_thumbnail(output_path, thumb_path):
                    thumb_size = os.path.getsize(thumb_path) / 1024  # KB
                    print(f"  ✓ Thumbnail: {thumb_path.name} ({thumb_size:.1f}KB)\n")
        else:
            print(f"  ✗ Error: {result['error']}\n")
    
    # Summary
    print("=" * 50)
    print(f"Total original size: {total_original:.2f}MB")
    print(f"Total optimized size: {total_new:.2f}MB")
    if total_original > 0:
        total_reduction = ((total_original - total_new) / total_original) * 100
        print(f"Total reduction: {total_reduction:.1f}%")
        print(f"Space saved: {total_original - total_new:.2f}MB")
    print("=" * 50)
    print("\nDone! Update your studio-data.js with the new filenames.")


if __name__ == '__main__':
    main()

