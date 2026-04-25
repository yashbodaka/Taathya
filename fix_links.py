import re

with open('finance.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'assets/partner-logos/(?!.*-icon\.svg)([^\/]+?)\.svg', r'assets/partner-logos/\1-icon.svg', content)

with open('finance.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('finance.html updated')
