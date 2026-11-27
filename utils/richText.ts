// Editable text is stored as plain text that may contain a little HTML. Only the
// tags below are ever rendered; their attributes are dropped and everything else
// is escaped, so stored content can't inject scripts or markup.
const ALLOWED_TAG = /(<\/?(?:p|br|ul|ol|li)(?=[\s/>])[^<>]*>)/gi;
const BLOCK_TAG = /<(?:p|ul|ol|li)(?=[\s/>])/i;

export const escapeHtml = (text: string) =>
  text
    .replace(/&(?!(?:[a-z]+|#\d+|#x[\da-f]+);)/gi, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// For showing the source itself (edit mode): every character stays literal.
export const escapeSource = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const hasBlockHtml = (text: string) => BLOCK_TAG.test(text);

export const renderRichText = (text: string) =>
  text
    // split() with a capture group puts the matched tags at the odd indexes
    .split(ALLOWED_TAG)
    .map((part, i) => {
      if (i % 2 === 0) return escapeHtml(part);
      const [, slash, name] = part.match(/^<(\/?)([a-z]+)/i)!;
      return `<${slash}${name!.toLowerCase()}>`;
    })
    .join('')
    // line breaks between block tags are source formatting, not content
    .replace(/\s*(<\/?(?:p|ul|ol|li)>)\s*/g, '$1');
