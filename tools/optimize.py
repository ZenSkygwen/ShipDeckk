import os
import re
import glob
from PIL import Image

workspace = r"c:\Users\juanf\Downloads\Portofolio-main\Portofolio-main"
img_folder = os.path.join(workspace, "Refensi gambar AOL HCI")
out_folder = os.path.join(workspace, "assets", "img")
os.makedirs(out_folder, exist_ok=True)

# Map clean filenames
files = os.listdir(img_folder)
print(f"Total files in source: {len(files)}")

total_orig_bytes = 0
total_new_bytes = 0
results = []

for filename in files:
    src_path = os.path.join(img_folder, filename)
    if not os.path.isfile(src_path):
        continue
    
    orig_size = os.path.getsize(src_path)
    total_orig_bytes += orig_size
    
    # Clean output name: remove apostrophes, replace spaces with hyphens, lowercase
    clean_name = filename.strip().replace("'", "").replace(" ", "-").replace("(", "").replace(")", "").lower()
    base, ext = os.path.splitext(clean_name)
    
    # Decide target format: webp for photos, keep png for small transparent icons if needed or webp with alpha
    target_ext = ".webp"
    dest_filename = base + target_ext
    dest_path = os.path.join(out_folder, dest_filename)
    
    try:
        with Image.open(src_path) as img:
            w, h = img.size
            
            # Decide max dimensions
            if "logo" in clean_name or "icon" in clean_name or "symbol" in clean_name or orig_size < 30000:
                max_dim = 512
            elif "klara" in clean_name or "4223" in clean_name or "header" in clean_name or "kapal" in clean_name:
                max_dim = 1920
            else:
                max_dim = 1000
            
            if w > max_dim or h > max_dim:
                img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
            
            # Handle alpha / mode
            if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                img.save(dest_path, "WEBP", quality=88, method=6)
                # Also save an optimized PNG copy for max compatibility
                dest_png = os.path.join(out_folder, base + ".png")
                img.save(dest_png, "PNG", optimize=True)
            else:
                img = img.convert("RGB")
                img.save(dest_path, "WEBP", quality=85, method=6)
                # Also save an optimized JPG copy
                dest_jpg = os.path.join(out_folder, base + ".jpg")
                img.save(dest_jpg, "JPEG", quality=85, optimize=True)
            
            new_size = os.path.getsize(dest_path)
            total_new_bytes += new_size
            results.append((filename, dest_filename, orig_size, new_size))
    except Exception as e:
        print(f"Error processing {filename}: {e}")

print("-" * 60)
print(f"Original total size: {total_orig_bytes / (1024*1024):.2f} MB")
print(f"Optimized WebP total size: {total_new_bytes / (1024*1024):.2f} MB")
reduction = (1 - total_new_bytes / total_orig_bytes) * 100 if total_orig_bytes else 0
print(f"Total reduction: {reduction:.1f}%")
print("-" * 60)
for orig, dest, o_sz, n_sz in sorted(results, key=lambda x: x[2], reverse=True)[:10]:
    print(f"{orig[:30]:30} -> {dest[:25]:25} | {o_sz/1024:7.1f} KB -> {n_sz/1024:6.1f} KB")
