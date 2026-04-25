import os, glob, re

for file in glob.glob('assets/partner-logos/*.svg'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Change svg tag
    content = re.sub(r'<svg width="260" height="80" viewBox="0 0 260 80"', r'<svg width="48" height="48" viewBox="16 16 48 48"', content)

    # Step 2: Remove the first rect (background pill)
    content = re.sub(r'<rect width="260" height="80"[^>]*>', '', content)

    # Step 3: Remove all text tags
    content = re.sub(r'<text[^>]*>.*?</text>', '', content, flags=re.DOTALL)

    # Trim empty lines
    content = "\n".join([line for line in content.split('\n') if line.strip() != ""])

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Processed {file}')
