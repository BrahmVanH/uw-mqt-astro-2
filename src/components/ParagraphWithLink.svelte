<script lang="ts">
  import type { ParagraphWithLink as ParagraphWithLinkType } from '../types';

  // Props
  export let paragraphWithLink: ParagraphWithLinkType;
  export let className = '';
  
  // Extract values from paragraphWithLink
  const { link, linkText, text } = paragraphWithLink;
  
  // Split text at the linkText
  const [textA, textB] = text.split(linkText);
</script>

<p class={className}>
  {textA}
  <span>
    <a 
      class="underline" 
      rel="noreferrer noopener" 
      target="_blank" 
      href={link}
    >
      {linkText}
    </a>
  </span>
  {textB}
</p>