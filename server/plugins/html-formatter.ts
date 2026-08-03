export default defineNitroPlugin((nitroApp) => {
  // Check if HTML formatting is disabled via environment variable
  return;
  const config = useRuntimeConfig()

  if (config.public.disableHtmlFormatting === 'true') {
    return;
  }

  nitroApp.hooks.hook('render:html', (html) => {
    // Only format in development
    if (process.env.NODE_ENV === 'development') {
      // Safely format the HTML body - it's an array of strings in Nuxt 3
      if (html.body && Array.isArray(html.body)) {
        // Create a new array to avoid mutating the original
        const formattedBody = html.body.map(part => {
          if (typeof part === 'string' && part.trim()) {
            return formatHTML(part);
          }
          return part;
        });
        
        // Only update if we actually made changes
        if (JSON.stringify(formattedBody) !== JSON.stringify(html.body)) {
          html.body = formattedBody;
        }
      }
    }
  });
});

function formatHTML(html: string): string {
  // Add line breaks and controlled indentation
  const lines = html
    .replace(/>/g, '>\n')
    .replace(/</g, '\n<')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');
  
  let indent = 4;
  const indentSize = 2;
  const formatted = [];
  
  // List of self-closing tags that don't need closing tags
  const selfClosingTags = [
    'img', 'br', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col', 
    'embed', 'source', 'track', 'wbr', 'param', 'keygen', 'command'
  ];
  
  for (const line of lines) {
    const isClosingTag = line.startsWith('</');
    const isDoctype = line.startsWith('<!');
    const isSpecialTag = isDoctype || 
                        line === '<html>' || line === '</html>' || 
                        line === '<head>' || line === '</head>' || 
                        line === '<body>' || line === '</body>';
    
    // Check if it's a self-closing tag
    const isSelfClosing = line.endsWith('/>') || 
                         selfClosingTags.some(tag => 
                           line.match(new RegExp(`<${tag}[^>]*/?>`, 'i'))
                         );
    
    // Reduce indent before closing tags
    if (isClosingTag) {
      indent = Math.max(0, indent - 2);
    }
    
    // Add indentation (but not for special tags)
    if (!isSpecialTag && indent > 0) {
      formatted.push(' '.repeat(indent * indentSize) + line);
    } else {
      formatted.push(line);
    }
    
    // Increase indent after opening tags (but not self-closing or special)
    if (!isClosingTag && !isSelfClosing && !isDoctype && !isSpecialTag) {
      indent++;
    }
  }
  
  return formatted.join('\n');
} 