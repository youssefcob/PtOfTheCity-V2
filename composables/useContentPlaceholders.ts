export const CONTENT_TEXT_PLACEHOLDER = 'Add text…';

export const placeholderImage = (width = 800, height = 600, label = 'Image') => {
  return `https://placehold.co/${width}x${height}?text=${encodeURIComponent(label)}`;
};
