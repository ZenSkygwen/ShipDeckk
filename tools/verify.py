import os
import re
import glob

workspace = r"c:\Users\juanf\Downloads\Portofolio-main\Portofolio-main"
files = glob.glob(os.path.join(workspace, "*.html")) + glob.glob(os.path.join(workspace, "*.css"))

missing = []
total_checked = 0

for f in files:
    with open(f, "r", encoding="utf-8") as fp:
        content = fp.read()
    
    # Matches src, srcset, href, or url(...)
    matches = re.findall(r'(?:src|srcset|href)=["\']([^"\']+\.(?:webp|png|jpg|jpeg))["\']', content)
    matches += re.findall(r'url\(["\']?([^"\'\)]+\.(?:webp|png|jpg|jpeg))["\']?\)', content)
    
    for u in matches:
        if u.startswith("http"):
            continue
        total_checked += 1
        full_p = os.path.join(workspace, u.replace("/", os.sep))
        if not os.path.exists(full_p):
            missing.append((os.path.basename(f), u))

print(f"Total asset references checked: {total_checked}")
if missing:
    print(f"MISSING ({len(missing)}):")
    for m in missing:
        print(f"  In {m[0]}: {m[1]}")
else:
    print("ALL assets successfully verified on disk! Zero missing files.")
